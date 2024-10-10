'use client';

import React, { useContext } from 'react';
import { contextData } from '@/components/context/context';

function Profile() {
  const { userInfo } = useContext(contextData);

  return <div className="min-h-[600px]">{userInfo.email}</div>;
}

export default Profile;
