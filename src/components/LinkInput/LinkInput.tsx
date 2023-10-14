import { FormEvent,ChangeEvent, useState, useEffect } from 'react';
import { getShortedLink } from '../../helpers/getShortedLink';
import { LinkInputProps, LinkResponseData } from '../../types/types';
import { validateLink } from '../../helpers/validateLink';

export const LinkInput = ({ shortenedLink, setShortenedLink}:LinkInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const storedLinks:LinkResponseData[] = JSON.parse(localStorage.getItem('links')!) || [];
    if(storedLinks) {
      setShortenedLink(storedLinks);
    }
  }, [setShortenedLink])

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
   try {
    e.preventDefault();
    const linkIsValid = validateLink(inputValue, setErrorMsg);
    
    if(linkIsValid){
      const shortLink:LinkResponseData = await getShortedLink(inputValue);
      localStorage.setItem('links', JSON.stringify([ shortLink, ...shortenedLink]));
      setShortenedLink([ shortLink, ...shortenedLink]);
      setInputValue('');
      setErrorMsg('');
    }
   } catch (error) {
      setErrorMsg('Error processing link'); 
   }
  }

  return (
    <div className="link-input-container">
      <form id='shorten-link-form' className='shorten-link-form' onSubmit={onSubmit}>
        <input onChange={handleInputValue} type="text" value={inputValue} placeholder="Shorten a link here..."/>
        <button type='submit' className="shorten-btn">Shorten it!</button>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  )
}