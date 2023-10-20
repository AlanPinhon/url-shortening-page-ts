import { rest } from 'msw';
import mockShortedLinkResponse from './mock.shortedLink.json'

export const handlers = [
  rest.post('https://api-ssl.bitly.com/v4/shorten', (_req,res,ctx) => {
    return res( ctx.json(mockShortedLinkResponse) );
  })
]