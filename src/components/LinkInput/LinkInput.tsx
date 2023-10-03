import { FormEvent,ChangeEvent, useState } from 'react';
import { getShortedLink } from '../../helpers/getShortedLink';
import { errorMsgs } from '../../helpers/errorMsgs';

export const LinkInput = () => {

  const [inputValue, setInputValue] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [errorExists, setErrorExists] = useState(false);

  const handleInputValue = ({ target }:ChangeEvent<HTMLInputElement>) => {
    const newURL = target.value;
    setInputValue(newURL);
  }

  const onSubmit = async (e:FormEvent<HTMLFormElement>) => {
   try {
    e.preventDefault();
    await getShortedLink(inputValue);
    setInputValue('');
    setErrorAlert('');
    setErrorExists(false);
   } catch (error) {
    for (const [i,errorMsg] of errorMsgs.entries()) {
      if(i === error) return errorMsg;
      setErrorAlert(errorMsg);
      setErrorExists(true);
    }
   }
  }

  return (
    <div className="link-input-container">
      <form id='shorten-link-form' className='shorten-link-form' onSubmit={onSubmit}>
        <input onChange={handleInputValue} type="text" value={inputValue} placeholder="Shorten a link here..."/>
        <button type='submit' className="shorten-btn">Shorten it!</button>
        {errorExists && <p>{errorAlert}</p>}
      </form>
    </div>
  )

}