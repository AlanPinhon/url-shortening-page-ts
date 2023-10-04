import { LinkResponseBody, ShortedLinkResult } from '../types/types';

export const getShortedLink = async (url:string):Promise<ShortedLinkResult> => {
  const urlFetch = `https://api.shrtco.de/v2/shorten?url=${url}`;

  const response = await fetch(urlFetch);
  const data:LinkResponseBody = await response.json();

  if(!response.ok) throw data.error;

  return {...data.result}
}