export const validateLink = ( linkValue:string ) => {
  const isValidURLFormat = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i.test(linkValue);
  let linkErrorMsg = '';

  if(linkValue === '') {
    linkErrorMsg = 'Please add a link'
  } else if (!isValidURLFormat) {
    linkErrorMsg = 'Invalid URL submitted'
  }

  return {linkErrorMsg, isValidURLFormat};
}