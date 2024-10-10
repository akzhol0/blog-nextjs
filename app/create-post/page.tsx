import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Post creation',
};

function CreatePost() {
  return <div className="min-h-[600px]">CreatePost</div>;
}

export default CreatePost;
