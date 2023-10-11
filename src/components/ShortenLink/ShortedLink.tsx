import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { ShortedLinkResult } from '../../types/types';

export const ShortedLink = () => {

  const [shortenedLink, setShortenedLink] = useState<ShortedLinkResult>();

  return (
    <>
      <LinkInput setShortenedLink= {setShortenedLink}/>
      {shortenedLink && <ShortenedLinkItem shortenedLink={shortenedLink}/>}
    </>
  )
}