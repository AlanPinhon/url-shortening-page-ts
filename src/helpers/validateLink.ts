export const validateLink = (linkValue:string, setErrorMsg:(value:string) => void ) => {
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