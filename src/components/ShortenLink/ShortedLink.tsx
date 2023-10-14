import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { LinkResponseData } from '../../types/types';

export const ShortedLink = () => {

  const [shortenedLink, setShortenedLink] = useState<LinkResponseData[]>([]);

  return (
    <>
      <LinkInput shortenedLink={shortenedLink} setShortenedLink= {setShortenedLink}/>

      {shortenedLink && shortenedLink.map(({id, link, long_url}) => (
        <ShortenedLinkItem
          key={id}
          link={link}
          long_url={long_url}
        />
      ))}
      
    </>
  )
}