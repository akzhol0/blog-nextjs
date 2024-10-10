'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { auth } from '.././firebase/firebase';
import MyButton from '@/components/ui/MyButton';
import Link from 'next/link';
import { contextData } from '@/components/context/context';

function Login() {
  const { setUserInfo, setAuth } = useContext(contextData);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function SignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        setUserInfo(userCredential);
        setAuth(true);

        const obj = userCredential.user;
        localStorage.setItem('user', JSON.stringify(obj));
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form
        className="w-[400px] min-h-[300px] flex flex-col bg-[#1b1b1b] rounded-lg items-center"
        onSubmit={SignIn}>
        <h1 className="text-2xl text-white my-4">Sign In</h1>
        <input
          className="w-[300px] h-[30px] border-0 bg-[#fff] rounded-lg ps-4"
          placeholder="Login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="w-[300px] h-[30px] border-0 bg-[#fff] rounded-lg mt-2 ps-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="mt-4 text-sm text-[#686868]">
          <Link href="register">Dont have an account yet? Sign Up!</Link>
        </p>
        <MyButton type="submit" className="w-[300px] mt-4">
          Sign In
        </MyButton>
        <p className="mt-4 text-[#ff5757]">{error}</p>
      </form>
    </div>
  );
}

export default Login;
