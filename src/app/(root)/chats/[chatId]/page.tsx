"use client"
import ChatDetails from '@/components/ChatDetails'
import ChatList from '@/components/ChatList'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

import React from 'react'

const ChatPage = () => {
  const { chatId } = useParams()
  const { data: session } = useSession()
  const currentUser = session?.user
  
  return (
    <div className="main-container flex flex-row">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full bg-indigo-50 bg-opacity-50 min-h-screen backdrop-blur-2xl">
      <ChatList currentChatId={chatId}/>
      </div>
      
      <div className="w-2/3 max-lg:w-1/2 max-md:hidden ">
        <ChatDetails chatId={chatId}/>
      </div>
    </div>
  )
}

export default ChatPage
