import { useState } from 'react';
import { copyToClipboard } from '../../helpers/copyToClipboard';
import { LinkResponseData } from '../../types/types';
import './ShortenedLinkItemStyles.css';

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
    <div className="shortened-link container">
      <p className='original-link'>{long_url}</p>
      <div className="short-link-section">
        <p className='short-link'>{link}</p>
        <button className={`copy-link-btn ${copyText === 'Copied!' ? 'copied-link-btn' : ''}`} onClick={handleCopyText}>{copyText}</button>
        <button className='remove-link-btn' onClick={() => onRemoveLink(id)}>X</button>
      </div>
    </div>
  )
}