interface Props {}

const Footer: React.FC<Props> = () => (
  <footer className="footer mt-auto py-3 bg-light fixed-bottom">
    <div className="container">
      <span className="text-muted">
        SchoolSplitter {process.env.REACT_APP_VERSION} - (C) 2020 by KlausCall &amp; Korki43 - MIT licensed -  
        source hosted on <a href="https://github.com/KlausCall/SchoolSplitter">GitHub</a> 
      </span>
    </div>
  </footer>
);

export default Footer;