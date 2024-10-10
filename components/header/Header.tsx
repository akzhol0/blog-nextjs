import React from 'react';
import Navbar from '../navbar/Navbar';
import Image from 'next/image';

function Header() {
  return (
    <div className="w-full h-[80px] flex justify-center items-center bg-[#61aff8]">
      <Image className='me-3' src="/images/brand.png" width={50} height={50} alt="Brand" />
      <Navbar />
    </div>
  );
}

export default Header;
