'use client';

import PostItem from '@/components/posts/PostItem';
import { db } from '@/app/firebase/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [loaded, setLoaded] = useState(false);

  const getAllPosts = async () => {
    console.log('fetching');
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPosts((prev: any) => [...prev, doc.data()]);
    });
    setLoaded(true);
  };

  const res = useMemo(() => {
    if (!loaded) {
      return getAllPosts();
    }
  }, []);


  return (
    <div>
      <main className="w-full min-h-[500px] flex justify-center">
        <div className="w-full ps-4 sm:ps-0 sm:w-[80%] flex flex-col gap-5 my-5">
          {loaded ? (
            posts.map((item: any) => <PostItem key={item.title} item={item} />)
          ) : (
            <p className="w-full flex justify-center text-white text-xl p-4">Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}
