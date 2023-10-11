import { useState } from 'react';
import { LinkResponseData } from '../../types/types';
import { copyToClipboard } from '../../helpers/copyToClipboard';

type ResultProps = { shortenedLink: LinkResponseData }

export const ShortenedLinkItem = ({shortenedLink}:ResultProps) => {

  const [copyText, setCopyText] = useState('Copy');

  const originalLink = shortenedLink.long_url;
  const shortLink = shortenedLink.link;  

  const handleCopyText = async ():Promise<void> => {
    try {
      await copyToClipboard(shortLink!);
      setCopyText('Copied!');
      setTimeout(() => {
        setCopyText('Copy');
      }, 2000);
    } catch (error) {
      setCopyText('Copy error');
      setTimeout(() => {
        setCopyText('Copy');
      }, 2000);
    }
  }

  return (
    <div className="shortened-link-container">
      <p>{originalLink}</p>
      <p>{shortLink}</p>
      <button onClick={handleCopyText}>{copyText}</button>
    </div>
  )
}