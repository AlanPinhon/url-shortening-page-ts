import React from 'react';
import { waitFor ,fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { rest } from 'msw';
import { expect } from 'vitest';
import { server } from '../../../src/mocks/server';
import { ShortedLink } from '../../../src/components/ShortenLink/ShortedLink';
import { getShortedLink } from '../../../src/helpers/getShortedLink';

describe('Tests on <ShortedLink/>', () => {

  test('should render initial input', () => {
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;

    expect(linkInput).toBeTruthy();
    expect(linkInput.value).toBe('');
  });

  test('should show an error if the input value is empty', () => {
    render(<ShortedLink/>);

    const shortenBtn = screen.getByText('Shorten it!');
    fireEvent.click(shortenBtn);
    expect(screen.getByText('Please add a link')).toBeTruthy();
  });

  test('should show an error if the URL format is invalid', () => {
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: 'www.youtube.com'}})
    fireEvent.click(shortenBtn);
    
    expect(screen.getByText('Invalid URL submitted')).toBeTruthy();
  });

  test('should simulate a failed POST request', async () => { 
    const errorDataResponse = {ok: false, message: 'Error processing link'};

    server.use(
      rest.post('https://api-ssl.bitly.com/v4/shorten', (_req,res,ctx) => {
        return res(
          ctx.status(500), ctx.json(errorDataResponse)
        )
      })
    );
    const validLink = 'https://www.youtube.com/';
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');

    fireEvent.change(linkInput, {target: {value: validLink}})
    fireEvent.click(shortenBtn);

    try {
      await getShortedLink(validLink);
    } catch (error) {
      expect(error.message).toBe('Error processing link');
      expect(error).toBeTruthy();
    }
  });

  test('should show the shorted and original link', async () => {
    const validLink = 'https://www.youtube.com/';

    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');

    fireEvent.change(linkInput, {target: {value: validLink}})
    fireEvent.submit(shortenBtn);

    await waitFor(() => {
      const shortLink = screen.getByText('https://bit.ly/3ZRT7EC');
      const originalLink = screen.getByText(validLink);

      expect(shortLink).toBeTruthy();
      expect(originalLink).toBeTruthy();
    });
  });

  test('should fail copy of shortened link', async () => {
    render(<ShortedLink/>);
    
    const copyLinkBtn = screen.getByText('Copy');
    fireEvent.click(copyLinkBtn);
    
    await waitFor(() => {
      const copyErrorMsgBtn = screen.getByText('Copy error');
      expect(copyErrorMsgBtn).toBeTruthy();
    })
  });

  test('should copy the shortened link', async () => {
    const user = userEvent.setup();

    render(<ShortedLink/>);
    
    const copyLinkBtn = screen.getByText('Copy');
    await user.click(copyLinkBtn);
    const copiedLink = await navigator.clipboard.readText();
    expect(copiedLink).toBe('https://bit.ly/3ZRT7EC');
  });

  test('should remove the shortened link from the screen', () => {
    render(<ShortedLink/>);

    const removeShortLink = screen.getByText('X');
    fireEvent.click(removeShortLink);
    
    const shortedLink = screen.queryByText('https://bit.ly/3ZRT7EC');
    expect(shortedLink).toBeNull();
  });

});