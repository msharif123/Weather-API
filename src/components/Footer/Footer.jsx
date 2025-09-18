import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Weather App</p>
      </footer>
    </>
  );
};

export default Footer;
