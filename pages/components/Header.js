import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <>
      <header className="tm-header text-center">
        <h1 className="tm-title text-uppercase">
          <Link href={'/'}>Verticard</Link>
        </h1>
        <p className="tm-primary-color">
          <i>new bootstrap theme</i>
        </p>
      </header>
    </>
  );
};

export default Header;
