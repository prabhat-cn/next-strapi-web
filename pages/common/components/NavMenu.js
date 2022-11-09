import Link from 'next/link';
import React from 'react';

const NavMenu = () => {
  return (
    <>
      <nav className="tm-nav">
        <ul>
          <li className="active">
            <Link href="/">
              <span className="tm-nav-deco"></span>Intro
            </Link>
          </li>
          <li>
            <Link href="/galary">
              <span className="tm-nav-deco"></span>Gallery
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <span className="tm-nav-deco"></span>Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
