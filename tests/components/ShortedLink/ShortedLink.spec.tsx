import React from 'react';
import { waitFor ,fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { rest } from 'msw';
import { expect, vi } from 'vitest';
import { server } from '../../../src/mocks/server';
import { ShortedLink } from '../../../src/components/ShortenLink/ShortedLink';

describe('Tests on <ShortedLink/>', () => {

  afterEach(() => {
    localStorage.clear();
  });

  test('should render initial input', () => {
    render(<ShortedLink/>);
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    
    expect(linkInput).toBeTruthy();
    expect(linkInput.value).toBe('');

  });

  test('should show an error if the input value is empty', async () => {
    const user = userEvent.setup();
    render(<ShortedLink/>);

    const shortenBtn = screen.getByText('Shorten it!');
    await user.click(shortenBtn);
    expect(screen.getByText('Please add a link')).toBeTruthy();
  });

  test('should show an error if the URL format is invalid', async () => {
    const user = userEvent.setup();
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: 'www.youtube.com'}});
    await user.click(shortenBtn);
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
    const user = userEvent.setup();
    const validLink = 'https://www.youtube.com/';
    render(<ShortedLink/>);
  
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: validLink}})
    await user.click(shortenBtn);

    await waitFor(  () => {
      const errorMsg = screen.getByText('Error processing link');
      expect(errorMsg).toBeTruthy();
    })

  });

  test('should show the shorted and original link', async () => {
    const user = userEvent.setup();
    const validLink = 'https://www.youtube.com/';

    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');

    fireEvent.change(linkInput, {target: {value: validLink}})
    await user.click(shortenBtn);

    await waitFor(() => {
      const shortLink = screen.getByText('https://bit.ly/3ZRT7EC');
      const originalLink = screen.getByText(validLink);

      expect(shortLink).toBeTruthy();
      expect(originalLink).toBeTruthy();
    });
  });

  test('should fail copy of shortened link', async () => {
    const user = userEvent.setup();
    const validLink = 'https://www.youtube.com/';

    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue('');
    render(<ShortedLink/>);
    
    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: validLink}})
    await user.click(shortenBtn);
    
    await waitFor( async () => {
      const copyLinkBtn = screen.getByText('Copy');
      await user.click(copyLinkBtn);
      const copyErrorMsgBtn = screen.getByText('Copy error');
      expect(copyErrorMsgBtn).toBeTruthy();
    });
  });

  test('should copy the shortened link', async () => {
    const user = userEvent.setup();

    const validLink = 'https://www.youtube.com/';
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: validLink}})
    await user.click(shortenBtn);

    await waitFor( async () => {
      const copyLinkBtn = screen.getByText('Copy');
      await user.click(copyLinkBtn);
      const copiedLink = await navigator.clipboard.readText();
      expect(copiedLink).toBe('https://bit.ly/3ZRT7EC');
    });
  });

  test('should remove the shortened link from the screen', async () => {
    const user = userEvent.setup();
    const validLink = 'https://www.youtube.com/';
    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByText('Shorten it!');
    
    fireEvent.change(linkInput, {target: {value: validLink}})
    await user.click(shortenBtn);

    const removeShortLink = screen.getByText('X');
    fireEvent.click(removeShortLink);

    const shortedLink = screen.queryByText('https://bit.ly/3ZRT7EC');
    expect(shortedLink).toBeNull();   
  });

});