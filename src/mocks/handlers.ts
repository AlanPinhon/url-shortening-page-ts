import { rest } from 'msw';
import { LinkResponseData } from '../types/types';

export const handlers = [
  rest.post('https://api-ssl.bitly.com/v4/shorten', async (req,res,ctx) => {
    
    const requestData = await req.json();
    const TOKEN = 'a85b332002cff2c70a9e2416014ffd17cecb830c'; 
    const authToken = req.headers.get('Authorization');
    
    (authToken !== `Bearer ${TOKEN}`) && res(ctx.status(401), ctx.json({ error: 'Unauthorized' }))

    const response:LinkResponseData = {
      id: "bit.ly/3ZRT7EC",
      link: "https://bit.ly/3ZRT7EC",
      long_url: requestData.long_url
    }

    return res(
      ctx.status(200),
      ctx.json(response));
  })
]