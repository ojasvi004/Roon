'use client';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import Provider from '@/components/Provider';
import SideBar from '@/components/SideBar';
import ChatList from '@/components/ChatList';
import { usePathname, useParams } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { chatId } = useParams();
  const pathname = usePathname();
  const hideChatList = pathname === '/profile';

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} flex flex-col sm:h-screen sm:overflow-hidden sm:flex-row bg-gray-900 text-white overflow-hidden font-sans`}
      >
        <Provider>
          <SideBar />

          <div className="flex flex-col sm:flex-row flex-grow min-h-screen w-full">
            {!hideChatList && (
              <div className="sm:w-96 bg-gray-800 bg-opacity-50 backdrop-blur-2xl overflow-y-auto sm:overflow-hidden sm:h-screen">
                <ChatList currentChatId={Array.isArray(chatId) ? chatId[0] : chatId || null} />
              </div>
            )}

            <div
              className={`
                flex-grow overflow-auto
                ${hideChatList ? 'flex justify-center items-center h-screen' : ''}
                ${!hideChatList ? 'sm:w-[calc(100%-24rem)]' : ''}
              `}
            >
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

