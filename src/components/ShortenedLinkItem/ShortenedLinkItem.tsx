import { useState } from 'react';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import { LinkResponseData } from '../../types/types';

type ShortLinkItemProps = {
  shortLink: LinkResponseData;
  onRemoveLink: (id: string) => void;
}

export const ShortenedLinkItem = ({shortLink, onRemoveLink}:ShortLinkItemProps) => {

  const [copyText, setCopyText] = useState('Copy');  
  const {id, link, long_url} = shortLink;

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
    <div className="shortened-link-container">
      <p>{long_url}</p>
      <p>{link}</p>
      <button onClick={handleCopyText}>{copyText}</button>
      <button onClick={() => onRemoveLink(id)}>X</button>
    </div>
  )
}