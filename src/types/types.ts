export type LinkResponseData = {
  id: string,
  link: string,
  long_url: string,
}

export type LinkInputProps = {
  shortenedLink: LinkResponseData[];
  setShortenedLink: (value:LinkResponseData[]) => void;
};

export type ShortenedLinkItemProps = {
  link: string,
  long_url: string, 
}