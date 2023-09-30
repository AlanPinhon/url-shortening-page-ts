import { FormEvent,ChangeEvent, useState } from 'react';
import { getShortedLink } from '../../helpers/getShortedLink';

export const LinkInput = () => {

  const [inputValue, setInputValue] = useState('');

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => {
    const newURL = target.value;
    setInputValue(newURL);
  }

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
   try {
    e.preventDefault();
    await getShortedLink(inputValue);
    setInputValue('');
   } catch (error) {
    console.log(error);   
   }
  }

  return (
    <div className="link-input-container">
      <form id='shorten-link-form' className='shorten-link-form' onSubmit={onSubmit}>
        <input onChange={handleInputValue} type="text" value={inputValue} placeholder="Shorten a link here..."/>
        <button type='submit' className="shorten-btn">Shorten it!</button>
      </form>
    </div>
  )

}