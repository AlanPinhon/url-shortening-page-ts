import { rest } from 'msw';
import { server } from '../../../src/mocks/server';
import { getShortedLink } from '../../../src/helpers/getShortedLink';

describe('Tests on <ShortedLink/>', () => {

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

});