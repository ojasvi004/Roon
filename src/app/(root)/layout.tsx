'use client';
import '../globals.css';
import SideBar from '@/components/SideBar';
import ChatList from '@/components/ChatList';
import { usePathname, useParams } from 'next/navigation';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { chatId } = useParams();
  const pathname = usePathname();
  const hideChatList = pathname === '/profile';

  return (
    <div className="flex flex-col sm:h-screen sm:overflow-hidden sm:flex-row bg-zinc-900 text-white overflow-hidden font-sans">
      <SideBar />

      <div className="flex flex-col sm:flex-row flex-grow min-h-screen w-full">
        {!hideChatList ? (
          <ResizablePanelGroup direction="horizontal" className="flex-grow">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full bg-zinc-800 bg-opacity-50 backdrop-blur-2xl overflow-y-auto">
                <ChatList
                  currentChatId={
                    Array.isArray(chatId) ? chatId[0] : chatId || null
                  }
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75} minSize={65}>
              <div className="h-full overflow-auto">{children}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="flex-grow flex justify-center items-center h-screen overflow-auto">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
