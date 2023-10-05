export const copyToClipboard = (text:string) => {
  navigator.clipboard.writeText(text)
    .then(() => console.log('Copiado al portapapeles'))
    .catch((error) => console.error('Error al copiar al portapapeles: ', error));
}