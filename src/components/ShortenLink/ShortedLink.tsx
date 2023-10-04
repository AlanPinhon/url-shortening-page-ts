import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { ShortedLinkResult } from '../../types/types';

export const ShortedLink = () => {

  const [shortenedLink, setShortenedLink] = useState<ShortedLinkResult | null>(null);

  return (
    <>
      <LinkInput setShortenedLink= {setShortenedLink}/>
      <ShortenedLinkItem shortenedLink={shortenedLink}/>
    </>
  )
}