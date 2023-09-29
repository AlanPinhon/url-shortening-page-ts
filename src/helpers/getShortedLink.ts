export const getShortedLink = async (url:string) => {
  const urlFetch = `https://api.shrtco.de/v2/shorten?url=${url}`;

  const response = await fetch(urlFetch);
  const data = await response.json();

  if(!response.ok) throw console.log(data);

  console.log(data); 
}