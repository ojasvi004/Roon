import React from 'react';
import Image from 'next/image';

const ChatDemo = () => {
  return (
    <div className="flex justify-center items-center w-full py-5 md:py-12 px-4">
      <div className="relative max-w-7xl w-full">
        <div className="relative w-full h-[300px] md:h-auto rounded-2xl">
          <Image
            src="/image.png"
            alt="Chat Demo"
            width={1200}
            height={800}
            className="shadow-2xl border-none scale-110 md:scale-100 opacity-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] rounded-2xl"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.1))',
            }}
            priority
          />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 blur-3xl opacity-30"></div>
        <div className="absolute inset-0 rounded-2xl bg-white/5 -z-20 blur-xl opacity-25"></div>
      </div>
    </div>
  );
};

export default ChatDemo;
