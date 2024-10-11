'use client';

import React, { useContext, useEffect, useState } from 'react';
import { contextData } from '@/components/context/context';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import PostItem from '@/components/posts/PostItem';
import MyButton from '@/components/ui/MyButton';
import { useRouter } from 'next/navigation';

function Profile() {
  const { userInfo, setAuth, setUserInfo } = useContext(contextData);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [loadedPosts, setLoadedPosts] = useState(false);
  const router = useRouter();

  useEffect(() => {
    !loadedPosts && userInfo.email !== undefined && getAllPosts();
  }, [userInfo]);

  const getAllPosts = async () => {
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().user === userInfo.email) {
        setUserPosts((prev: any) => [...prev, doc.data()]);
      }
    });
    setLoadedPosts(true);
  };

  const exitAccount = () => {
    localStorage.removeItem('user');
    setAuth(false);
    setUserInfo([]);
    router.push('/');
  };

  return (
    <div className="w-full min-h-[600px] flex flex-col items-center">
      <div className="w-[100%] md:w-[80%] flex flex-col md:flex-row gap-2 items-center pt-4">
        <div className="w-[150px] h-[150px] rounded-[50%] bg-white"></div>
        <div className='flex flex-col items-center md:items-start'>
          <h1 className="text-white text-xl">User Email: {userInfo.email}</h1>
          <span className='mt-2' onClick={() => exitAccount()}>
            <MyButton>Exit account</MyButton>
          </span>
        </div>
      </div>
      <h1 className="text-white text-3xl mt-4 md:mt-0">{userInfo.email} posts:</h1>
      <div className="w-[80%] flex flex-col gap-5 my-5">
        {loadedPosts && userInfo.email !== undefined ? (
          userPosts.length !== 0 ? (
            userPosts.map((item: any) => <PostItem key={Math.random() * 99} item={item} />)
          ) : (
            <p className="w-full flex justify-center text-white text-xl p-4">Empty</p>
          )
        ) : (
          <p className="w-full flex justify-center text-white text-xl p-4">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
