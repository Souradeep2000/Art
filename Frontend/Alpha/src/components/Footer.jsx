import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bottom-container">
      <a
        className="footer-link"
        href="https://www.facebook.com/souradeep.gharami.5"
      >
        Facebook
      </a>
      <a
        className="footer-link"
        href="https://www.instagram.com/maniac__souradeep__/"
      >
        Instagram
      </a>
      <a
        className="footer-link"
        href="https://souradeep2000.github.io/Curriculum-vitae/"
      >
        Website
      </a>
      <p className="copyright">Copyright ⓒ {year}</p>
    </div>
  );
}

export default Footer;
