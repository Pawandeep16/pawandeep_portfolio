// Cross-page anchor navigation.
//
// Section links live on the home page, but the header also renders on
// case-study pages. A plain "/#about" navigation from another route can
// land at the top of the home page instead of the section, because the
// page-transition exit delays the new page mounting. So: scroll directly
// when already home, otherwise navigate and scroll once the new page is
// mounted.

export function navigateToSection(
  hash: string,
  pathname: string,
  push: (url: string) => void,
): void {
  const scroll = () => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };
  if (pathname === "/") {
    scroll();
    return;
  }
  push(`/${hash}`);
  // The route transition takes ~350ms; scroll once the home page is in.
  window.setTimeout(scroll, 500);
}
