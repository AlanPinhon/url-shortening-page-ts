import { FormEvent,ChangeEvent, useState } from 'react';

type LinkInputProps = {
  errorMsg: string;
  onAddShortLink: (url: string) => Promise<void>;
};

export const LinkInput = ({errorMsg, onAddShortLink}:LinkInputProps) => {
  
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const onSubmit = (e:FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   onAddShortLink(inputValue);
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