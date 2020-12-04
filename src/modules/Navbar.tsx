import React from 'react';
import HelpDialog from './Navbar/HelpDialog';

interface Props {}

const Navbar: React.FC<Props> = () => (
  <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
      <span className="navbar-brand mb-0 h1">Klassenstufen Teiler</span>
      <HelpDialog />
    </div>
  </nav>
);

export default Navbar;
