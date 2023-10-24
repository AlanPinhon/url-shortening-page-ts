import { rest } from 'msw';
import { server } from '../../../src/mocks/server';
import { afterEach, vi } from 'vitest';
import { getShortedLink } from '../../../src/helpers/getShortedLink';
import { LinkResponseData } from '../../../src/types/types';

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

  test('should add data to LocalStorage', () => {
    const linkData: LinkResponseData = {
      id: "bit.ly/3PQQKNH",
      link: "https://bit.ly/3PQQKNH",
      long_url: "https://www.google.com/",
    }

    const shortedLinks:LinkResponseData[] = [];
    shortedLinks.push(linkData);

    localStorage.setItem('links', JSON.stringify(shortedLinks));
    expect(setItemSpy).toHaveBeenCalledWith('links', JSON.stringify(shortedLinks));
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  test('should get data from LocalStorage', () => {
    const linkData: LinkResponseData = {
      id : "bit.ly/3ZRT7EC",
      link : "https://bit.ly/3ZRT7EC",
      long_url : "https://www.youtube.com/"
    }

    localStorage.setItem('links', JSON.stringify([linkData]));
    const storedData = JSON.parse(localStorage.getItem('links')!);
    
    expect(storedData).toStrictEqual([linkData])
    expect(getItemSpy).toHaveBeenCalledWith('links');
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });

});