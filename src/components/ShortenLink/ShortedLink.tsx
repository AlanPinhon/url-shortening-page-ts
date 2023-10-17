import { useState } from 'react';
import { LinkInput } from '../LinkInput/LinkInput';
import { ShortenedLinkItem } from '../ShortenedLinkItem/ShortenedLinkItem';
import { LinkResponseData } from '../../types/types';
import { validateLink } from '../../helpers/validateLink';
import { getShortedLink } from '../../helpers/getShortedLink';

export const ShortedLink = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [shortenedLink, setShortenedLink] = useState<LinkResponseData[]>(
    JSON.parse(localStorage.getItem('links')!) || []
  );

  const handleAddShortLink = async (link:string) => {
    try {
      const {isValidURLFormat, linkErrorMsg} = validateLink(link);

      if(isValidURLFormat){
        const shortLink:LinkResponseData = await getShortedLink(link);
        setShortenedLink([shortLink, ...shortenedLink]);
        localStorage.setItem('links', JSON.stringify([shortLink, ...shortenedLink]))
        setErrorMsg('');
      } else {
        setErrorMsg(linkErrorMsg);
      }
    } catch (error) {
      setErrorMsg('Error processing link');
    }
  }

  return (
    <>
      <LinkInput onAddShortLink={handleAddShortLink} errorMsg={errorMsg} />
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