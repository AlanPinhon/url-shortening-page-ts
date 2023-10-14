import { useState } from 'react';
import { ShortenedLinkItemProps } from '../../types/types';
import { copyToClipboard } from '../../helpers/copyToClipboard';

export const ShortenedLinkItem = ({link, long_url}:ShortenedLinkItemProps) => {

  const [copyText, setCopyText] = useState('Copy');  

  const handleCopyText = async ():Promise<void> => {
    try {
      await copyToClipboard(link!);
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
    </div>
  )
}