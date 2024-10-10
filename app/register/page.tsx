'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import Link from 'next/link';
import MyButton from '@/components/ui/MyButton';
import { useRouter } from 'next/navigation';

function Register() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }

    createUserWithEmailAndPassword(auth, login, password)
      .then(() => {
        router.push('/login');
      })
      .catch((err) => {
        setError(err.message);
      });
  }
  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form
        className="w-[400px] min-h-[350px] flex flex-col bg-[#1b1b1b] rounded-lg items-center"
        onSubmit={signUp}>
        <h1 className="text-2xl text-white my-4">Sign Up</h1>
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
        <input
          className="w-[300px] h-[30px] border-0 bg-[#fff] rounded-lg mt-2 ps-4"
          placeholder="Repeat password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <p className="mt-4 text-sm text-[#686868]">
          <Link href="login">Have an account? Sign In!</Link>
        </p>
        <MyButton type="submit" className="w-[300px] mt-4">
          Sign Up
        </MyButton>
        <p className="mt-4 text-[#ff5757]">{error}</p>
      </form>
    </div>
  );
}

export default Register;
