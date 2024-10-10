'use client';

import React, { createContext, useEffect, useState } from 'react';

type ContextProps = {
  auth: boolean;
  setAuth: (arg0: boolean) => void;
  userInfo: any;
  setUserInfo: (arg0: any) => void;
};

export const contextData = createContext({} as ContextProps);

type ContextOverAllProps = {
  children: React.ReactNode;
};

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState<any>([]);

  useEffect(() => {
    checkUserLogged();
  }, []);

  // check if user logged
  const checkUserLogged = async () => {
    const res = localStorage.getItem('user');
    const user = res ? JSON.parse(res) : null;
    
    if (user !== null) {
      setAuth(true);
      setUserInfo(user);
    }
  };

  return (
    <contextData.Provider
      value={{
        auth,
        setAuth,
        userInfo,
        setUserInfo,
      }}>
      {children}
    </contextData.Provider>
  );
}
