import "./Header.scss";

const Header = ({ children, ...rest }) => (
  <header className="header" {...rest}>
    {children}
  </header>
);

export default Header;
