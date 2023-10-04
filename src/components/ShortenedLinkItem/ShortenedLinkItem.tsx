import { ShortedLinkResult } from '../../types/types';

type ResultProps = {
  shortenedLink: ShortedLinkResult | null;
}

export const ShortenedLinkItem = ({shortenedLink}:ResultProps) => {

  const originalLink = shortenedLink?.original_link;
  const shortLink = shortenedLink?.full_short_link;

  return (
    <div className="shortened-link-container">
      <p>{originalLink}</p>
      <p>{shortLink}</p>
      <button>Copy</button>
    </div>
  )
}