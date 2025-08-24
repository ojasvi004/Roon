'use client';

import React from 'react';
import Image from 'next/image';

const PostLoginLoader = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="roon-cat-loader">
            <Image
              src="/assets/logo-cat.png"
              alt="Roon Cat"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Loading your chats...
          </h2>
          <p className="text-zinc-400">
            Please wait while we prepare everything for you :)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostLoginLoader;
