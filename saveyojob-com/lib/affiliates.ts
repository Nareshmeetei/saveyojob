const UTM = {
  source:   'saveyojob',
  medium:   'referral',
};

export function buildAffiliateUrl(
  rawUrl: string,
  platform: string,
  courseName: string,
  occupationSlug?: string
): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set('utm_source',   UTM.source);
    url.searchParams.set('utm_medium',   UTM.medium);
    url.searchParams.set('utm_campaign', platform.toLowerCase().replace(/\s+/g, '-'));
    url.searchParams.set('utm_content',  courseName.slice(0, 50).replace(/\s+/g, '-'));
    if (occupationSlug) {
      url.searchParams.set('utm_term', occupationSlug);
    }
    return url.toString();
  } catch {
    return rawUrl;
  }
}
