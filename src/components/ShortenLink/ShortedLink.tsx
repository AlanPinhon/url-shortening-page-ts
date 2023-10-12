import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { LinkResponseData } from '../../types/types';

export const ShortedLink = () => {

  const [shortenedLink, setShortenedLink] = useState<LinkResponseData>();

  return (
    <>
      <LinkInput setShortenedLink= {setShortenedLink}/>
      {shortenedLink && <ShortenedLinkItem shortenedLink={shortenedLink}/>}
    </>
  )
}