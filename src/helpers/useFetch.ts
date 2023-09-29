export const useFetch = async () => {
  const url = `https://api.shrtco.de/v2/shorten?url='https://www.instagram.com/p/CoIeRqDu8AtRz1UyyXEPhDs21ML-7F1Jy5wvBE0/?img_index=1'`;

  const response = await fetch(url);
  const data = await response.json();

  if(!response.ok) throw data;

  console.log(data); 
}