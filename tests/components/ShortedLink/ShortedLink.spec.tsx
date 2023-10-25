import React from 'react';
import { rest } from 'msw';
import { server } from '../../../src/mocks/server';
import { afterEach, vi } from 'vitest';
import { getShortedLink } from '../../../src/helpers/getShortedLink';
import { LinkResponseData } from '../../../src/types/types';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ShortedLink } from '../../../src/components/ShortenLink/ShortedLink';

describe('Tests on <ShortedLink/>', () => {

  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  })

  test('should simulate a failed POST request', async () => { 
    
    const errorDataResponse = {ok: false, message: 'Error processing link'};

    server.use(
      rest.post('https://api-ssl.bitly.com/v4/shorten', (_req,res,ctx) => {
        return res(
          ctx.status(500), ctx.json(errorDataResponse)
        )
      })
    );

    try {
      const validLink = 'https://www.youtube.com/';
      const response = await getShortedLink(validLink);

      expect(response).toBe(false);
    } catch (error) {
      expect(error).toEqual(errorDataResponse);
    }
  });

  test('should simulate a successful POST request to shorten a link', async () => { 
    const validLink = 'https://www.youtube.com/';

    const response = await getShortedLink(validLink);

    expect(response.link).toBe("https://bit.ly/3ZRT7EC");
    expect(response.long_url).toBe(validLink);
  });

  test('should add data to LocalStorage', async () => {
    const shortenedLinks: LinkResponseData[] = [];
    const validLink = 'https://www.youtube.com';

    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

   await act( async () => {
    fireEvent.change(linkInput, {target: {value: validLink}});
    fireEvent.submit(shortenBtn);

    const response = await getShortedLink(validLink);
    shortenedLinks.push(response);

    localStorage.setItem('links', JSON.stringify(shortenedLinks));
   });

    expect(setItemSpy).toHaveBeenCalledWith('links', JSON.stringify(shortenedLinks));
  });

  test('should get data from LocalStorage and show it in the DOM', async() => {
    const shortenedLinks: LinkResponseData[] = [];
    const validLink = 'https://www.youtube.com/';

    render(<ShortedLink/>);

    const linkInput = screen.getByPlaceholderText('Shorten a link here...') as HTMLInputElement;
    const shortenBtn = screen.getByRole('button');

    await act( async () => {
     fireEvent.change(linkInput, {target: {value: validLink}});
     fireEvent.submit(shortenBtn);

     const response = await getShortedLink(validLink);
     shortenedLinks.push(response);

     localStorage.setItem('links', JSON.stringify(shortenedLinks));
    });
    
    const storedData:LinkResponseData[] = JSON.parse(localStorage.getItem('links')!);

    const shortLink = screen.getByText('https://bit.ly/3ZRT7EC');
    const originalLink = screen.getByText(validLink);

    expect(storedData).toStrictEqual(shortenedLinks);
    expect(getItemSpy).toHaveBeenCalledWith('links');

    expect(shortLink).toBeTruthy();
    expect(originalLink).toBeTruthy();
  });

});