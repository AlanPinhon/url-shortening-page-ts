import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { LinkResponseData } from '../../types/types';
import { getShortedLink } from '../../helpers/getShortedLink';

export const ShortedLink = () => {
  
  const [shortenedLink, setShortenedLink] = useState<LinkResponseData[]>(
    JSON.parse(localStorage.getItem('links')!) || []
  );

  const handleAddShortLink = async (link:string) => {
    try {
      const shortLink:LinkResponseData = await getShortedLink(link);
      setShortenedLink([shortLink, ...shortenedLink]);
      localStorage.setItem('links', JSON.stringify([shortLink, ...shortenedLink]))
    } catch (error) {
      console.error('Error processing link');
    }
  }

  const handleRemoveLink = (id:string) => {
    const updatedShortLinks = shortenedLink.filter(link => link.id !== id);
    setShortenedLink(updatedShortLinks);
    localStorage.setItem('links', JSON.stringify(updatedShortLinks))
  }

  return (
    <>
      <LinkInput onAddShortLink={handleAddShortLink} />
      {shortenedLink && shortenedLink.map((shortLink) => (
        <ShortenedLinkItem
          key={shortLink.id}
          shortLink = {shortLink}
          onRemoveLink={handleRemoveLink}
        />
      ))}
    </>
  )
}