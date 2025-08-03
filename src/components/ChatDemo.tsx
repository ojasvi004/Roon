import React from 'react';
import Image from 'next/image';

const ChatDemo = () => {
  return (
    <div className="flex justify-center items-center w-full py-16 px-4">
      <div className="relative max-w-4xl w-full">
        <Image
          src="/image.png"
          alt="Chat Demo"
          width={1200}
          height={800}
          className="rounded-2xl shadow-2xl border-none scale-125 opacity-100 "
          style={{ maxWidth: '100%', height: 'auto' }}
          priority
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-3xl opacity-30"></div>
      </div>
    </div>
  );
};

export default ChatDemo;
