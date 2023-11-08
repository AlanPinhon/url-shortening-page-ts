import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { LinkResponseData } from '../../types/types';
import { getShortedLink } from '../../helpers/getShortedLink';
import './ShortedLinkStyles.css';

export const ShortedLink = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [shortenedLink, setShortenedLink] = useState<LinkResponseData[]>(
    JSON.parse(localStorage.getItem('links')!) || []
  );

  const handleAddShortLink = async (link:string) => {
    try {
      const shortLink:LinkResponseData = await getShortedLink(link);
      setShortenedLink([shortLink, ...shortenedLink]);
      localStorage.setItem('links', JSON.stringify([shortLink, ...shortenedLink]));
    } catch (error) {
      setErrorMsg('Error processing link');
    }
  }

  const handleRemoveLink = (id:string) => {
    const updatedShortLinks = shortenedLink.filter(link => link.id !== id);
    setShortenedLink(updatedShortLinks);
    localStorage.setItem('links', JSON.stringify(updatedShortLinks))
  }

  return (
    <section className="shorted-link container">
      <LinkInput errorMsg={errorMsg} setErrorMsg={setErrorMsg} onAddShortLink={handleAddShortLink} />
      {shortenedLink && shortenedLink.map((shortLink) => (
        <ShortenedLinkItem
          key={shortLink.id}
          shortLink = {shortLink}
          onRemoveLink={handleRemoveLink}
        />
      ))}
    </section>
  )
}