import "./Header.scss";

const Header = ({ children, ...rest }) => {
  return (
    <header className="header" {...rest}>
      {children}
    </header>
  );
};
export default Header;
