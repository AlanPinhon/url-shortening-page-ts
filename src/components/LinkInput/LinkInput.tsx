import { ChangeEvent } from 'react';
import { useFetch } from '../../helpers/useFetch';

export const LinkInput = () => {

  useFetch();

  const handleInputValue = ({target}:ChangeEvent<HTMLInputElement>) => {
    console.log(target.value);
  }

  return (
    <>
      <div className="link-input-container">
        <form id='shorten-link-form' className='shorten-link-form'>
          <input onChange={handleInputValue} type="text" placeholder="Shorten a link here..."/>
          <button className="shorten-btn">Shorten it!</button>
        </form>
      </div>
    </>
  )

}