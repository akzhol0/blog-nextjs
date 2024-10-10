'use client';

import Link from 'next/link';
import React, { useContext } from 'react';
import { contextData } from '../context/context';

function Navbar() {
  const { auth } = useContext(contextData);

  const navbarItems = [
    {
      url: '/',
      title: 'Blogs',
    },
    {
      url: 'profile',
      title: 'Profile',
    },
    {
      url: 'create-post',
      title: 'Create',
    },
  ];

  return (
    <div>
      <ul className="flex gap-5">
        {navbarItems.map((item) => (
          <li key={item.title} className="cursor-pointer text-2xl">
            <Link href={item.url === 'profile' && !auth ? 'login' : item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
