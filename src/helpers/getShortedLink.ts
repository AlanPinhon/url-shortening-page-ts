import { LinkResponseData } from '../types/types';

export const getShortedLink = async (url:string):Promise<LinkResponseData> => {
  const urlFetch = 'https://api-ssl.bitly.com/v4/shorten';
  const TOKEN = 'a85b332002cff2c70a9e2416014ffd17cecb830c'; 
  const fetchOptions = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "long_url": `${url}`,
      "domain": "bit.ly",
    })
  }

  const response = await fetch(urlFetch,fetchOptions);
  const data:LinkResponseData = await response.json();

  if(!response.ok) throw data;

  return data;
}