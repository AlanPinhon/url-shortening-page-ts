import { useState } from 'react';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import { LinkResponseData } from '../../types/types';

export const ShortenedLinkItem = ({link, long_url}:LinkResponseData) => {

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
    <div className="shortened-link-container">
      <p>{long_url}</p>
      <p>{link}</p>
      <button onClick={handleCopyText}>{copyText}</button>
    </div>
  )
}