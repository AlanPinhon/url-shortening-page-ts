export type LinkResponseBody = {
  result: ShortedLinkResult;
  error_code?: number;
}

export type ShortedLinkResult = {
  full_short_link: string;
  original_link: string;
}