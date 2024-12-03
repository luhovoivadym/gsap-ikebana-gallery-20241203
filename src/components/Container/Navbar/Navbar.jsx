import gsap from "gsap";
import "./Navbar.less";

const Navbar = ({ isSingleColumn, setIsSingleColumn }) => {

  return (
    <nav className="navbar">
      <div className="logo">
        <button className="logo_button"><h2>Hiromi<br />Tomiyasu</h2></button>
      </div>
      <div className="group_button">
        <button className="button1" onClick={isSingleColumn ? () => setIsSingleColumn(false) : undefined}>
          <h3>Gallery</h3>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" width="2" height="2" fill="#4B4B4B" />
            <rect x="8" y="8" width="2" height="2" fill="#4B4B4B" />
            <rect width="2" height="2" fill="#4B4B4B" />
            <rect y="8" width="2" height="2" fill="#4B4B4B" />
            <rect x="12" y="4" width="2" height="2" fill="#4B4B4B" />
            <rect x="4" y="4" width="2" height="2" fill="#4B4B4B" />
            <rect x="16" width="2" height="2" fill="#4B4B4B" />
            <rect x="16" y="8" width="2" height="2" fill="#4B4B4B" />
          </svg>
        </button>
        <button className="button2" onClick={!isSingleColumn ? () => setIsSingleColumn(true) : undefined}>
          <h3>Index</h3>
          <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" width="2" height="2" fill="#4B4B4B" />
            <rect x="7" y="8" width="2" height="2" fill="#4B4B4B" />
            <rect width="2" height="2" fill="#4B4B4B" />
            <rect y="8" width="2" height="2" fill="#4B4B4B" />
            <rect x="14" width="2" height="2" fill="#4B4B4B" />
            <rect x="14" y="8" width="2" height="2" fill="#4B4B4B" />
            <rect x="21" width="2" height="2" fill="#4B4B4B" />
            <rect x="21" y="8" width="2" height="2" fill="#4B4B4B" />
          </svg>
        </button>
        <button className="button3">
          <h3>Contact</h3>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
