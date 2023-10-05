import { ShortedLinkResult } from '../../types/types';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import { useState } from 'react';

type ResultProps = {
  shortenedLink: ShortedLinkResult | null;
}

export const ShortenedLinkItem = ({shortenedLink}:ResultProps) => {

  const [copyText, setCopyText] = useState('Copy');

  const originalLink = shortenedLink?.original_link;
  const shortLink = shortenedLink?.full_short_link;  

  const handleCopyText = () => {
    copyToClipboard(shortLink!);
    setCopyText('Copied!');
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
  }

  return (
    <div className="shortened-link-container">
      <p>{originalLink}</p>
      <p>{shortLink}</p>
      <button onClick={handleCopyText}>{copyText}</button>
    </div>
  )
}