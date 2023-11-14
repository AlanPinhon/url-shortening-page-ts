import { FormEvent,ChangeEvent, useState } from 'react';
import { validateLink } from '../../helpers/validateLink';
import './LinkInput.css';

type LinkInputProps = {
  errorMsg: string;
  setErrorMsg: (msg:string) => void;
  onAddShortLink: (url: string) => Promise<void>;
};

export const LinkInput = ({errorMsg, setErrorMsg, onAddShortLink}:LinkInputProps) => {
  
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    const {isValidURLFormat, linkErrorMsg} = validateLink(inputValue);

    if(isValidURLFormat) {
      onAddShortLink(inputValue);
      setInputValue('');
      setErrorMsg('');
    } else {
     setErrorMsg(linkErrorMsg);
    }
  }

  return (
    <div className="link-input">
      <form id='shorten-link-form' className='shorten-link-form' onSubmit={onSubmit}>
        <input className={errorMsg && 'error-state'} onChange={handleInputValue} type="text" value={inputValue} placeholder="Shorten a link here..."/>
        <button type='submit' className="shorten-btn">Shorten it!</button>
      </form>
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
    </div>
  )
}