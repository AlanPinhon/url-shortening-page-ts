import { FormEvent,ChangeEvent, useState, useEffect } from 'react';
import { getShortedLink } from '../../helpers/getShortedLink';
import { ShortedLinkResult } from '../../types/types';

type FormProps = {
  setShortenedLink: (arg:ShortedLinkResult) => void;
};

export const LinkInput = ({setShortenedLink}:FormProps) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const storedLinks:ShortedLinkResult = JSON.parse(localStorage.getItem('links')!);
    if(storedLinks) {
      setShortenedLink(storedLinks);
    }
  }, [setShortenedLink]);

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => {
    const newURL = target.value;
    setInputValue(newURL);
  }

  const validateLink = (linkValue:string) => {
    const isLinkValue = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(linkValue);

    if(linkValue === '') {
      setErrorMsg('Please add a link');
    } else if (!isLinkValue) {
      setErrorMsg('Invalid URL submitted');
    } else {
      setErrorMsg('');
    }
    return isLinkValue;
  }

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
   try {
    e.preventDefault();
    const linkIsValid = validateLink(inputValue);
    
    if(linkIsValid){
      const shortenedLink = await getShortedLink(inputValue);
      localStorage.setItem('links', JSON.stringify(shortenedLink));
      setShortenedLink(shortenedLink);
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