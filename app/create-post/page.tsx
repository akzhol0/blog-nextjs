'use client';

import MyButton from '@/components/ui/MyButton';
import { addDoc, collection } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { db } from '../firebase/firebase';
import { contextData } from '@/components/context/context';
import { useRouter } from 'next/navigation';

function CreatePost() {
  const { userInfo, auth } = useContext(contextData);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const router = useRouter();

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth === false) {
      router.push('/login');
    }

    if (title === '' || desc === '') {
      return;
    }

    await addDoc(collection(db, 'posts'), {
      user: userInfo.email,
      title: title,
      desc: desc,
    });

    setTitle('');
    setDesc('');

    router.push('/');
  };

  return (
    <div className="w-full min-h-[600px] flex justify-center items-center">
      <form onSubmit={addPost} className="w-[600px] flex flex-col gap-2 px-4">
        <input
          placeholder="Post title"
          type="text"
          className="h-[30px] border-0 bg-[#fff] rounded-lg ps-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Post description"
          type="text"
          className="h-[100px] border-0 bg-[#fff] rounded-lg ps-4"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <MyButton type="submit">Create</MyButton>
      </form>
    </div>
  );
}

export default CreatePost;
