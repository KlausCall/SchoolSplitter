interface Props {}

const Footer: React.FC<Props> = () => (
  <footer className="footer p-2 bg-light fixed-bottom text-center">
    <span className="text-muted" style={{ fontSize: '0.875rem' }}>
      SchoolSplitter {process.env.REACT_APP_VERSION} - (C) 2020 by KlausCall
      &amp; Korki43 - MIT licensed - source hosted on{' '}
      <a href="https://github.com/KlausCall/SchoolSplitter">GitHub</a>
    </span>
  </footer>
);

export default Footer;
