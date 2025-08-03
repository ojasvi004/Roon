import React from 'react';
import Image from 'next/image';

const ChatDemo = () => {
  return (
    <div className="flex justify-center items-center w-full py-12 px-4">
      <div className="relative max-w-9xl w-full">
        <div className="relative w-full h-[600px]  rounded-2xl">
          <Image
            src="/image.png"
            alt="Chat Demo"
            width={1200}
            height={800}
            className="shadow-2xl border-none scale-125 opacity-100"
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'translateY(-10%)',
            }}
            priority
          />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-3xl opacity-30"></div>
      </div>
    </div>
  );
};

export default ChatDemo;
