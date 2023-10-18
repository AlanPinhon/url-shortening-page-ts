import { useState } from 'react';
import { copyToClipboard } from '../../helpers/copyToClipboard';

type ShortLinkItemProps = {
  id: string
  link: string,
  long_url: string,
  onRemoveLink: (id: string) => void;
}

export const ShortenedLinkItem = ({id ,link, long_url, onRemoveLink}:ShortLinkItemProps) => {

  const [copyText, setCopyText] = useState('Copy');  

  const handleCopyText = async () => {
    try {
      await copyToClipboard(link);
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
    <div id={id} className="shortened-link-container">
      <p>{long_url}</p>
      <p>{link}</p>
      <button onClick={handleCopyText}>{copyText}</button>
      <button onClick={() => onRemoveLink(id)}>X</button>
    </div>
  )
}