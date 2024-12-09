'use client';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import Provider from '@/components/Provider';
import SideBar from '@/components/SideBar';
import ChatList from '@/components/ChatList';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

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
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} flex bg-gray-900 text-white overflow-hidden font-sans`}
      >
        <Provider>
          <SideBar />

          <div className="grid grid-cols-12 min-h-screen">
            {!hideChatList && (
              <div className="col-span-4 min-w-96 bg-gray-500 bg-opacity-50 backdrop-blur-2xl">
                <ChatList currentChatId={Array.isArray(chatId) ? chatId[0] : chatId || null} />
              </div>
            )}

            <div
              className={`${hideChatList ? 'flex flex-col justify-center items-center  mr-auto ' : 'col-span-8'} flex-1 overflow-auto`}
            >
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
