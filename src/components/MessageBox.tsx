import React, { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { X } from 'lucide-react';

interface MessageBoxProps {
  message: any;
  currentUser: any;
  showTimestamp?: boolean;
  showAvatar?: boolean;
  isGroupChat?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  currentUser,
  showTimestamp = true,
  showAvatar = true,
  isGroupChat = false,
}) => {
  const isOwnMessage = message?.sender?._id === currentUser._id;
  const [expandImage, setExpandImage] = useState(false);
  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} ${showTimestamp ? 'mb-3' : 'mb-0.5'}`}
    >
      <div
        className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[70%]`}
      >
        {!isOwnMessage && (
          <div className="flex-shrink-0">
            {showAvatar ? (
              <Image
                src={message?.sender?.profileImage || '/assets/person.jpg'}
                alt="profile photo"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-zinc-600"
                height={32}
                width={32}
              />
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        )}

        <div
          className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
        >
          {!isOwnMessage && isGroupChat && showAvatar && (
            <p className="text-xs text-zinc-400 mb-1 px-2 font-medium">
              {message?.sender?.username || 'Unknown User'}
            </p>
          )}
          
          <div
            className={`px-2 py-2 rounded-2xl shadow-sm ${
              isOwnMessage
                ? 'bg-indigo-600/75 text-white rounded-br-md'
                : 'bg-zinc-800 text-zinc-100 rounded-bl-md border border-zinc-700'
            } max-w-full break-words`}
          >
            {message?.text ? (
              <p className="text-sm leading-relaxed">{message.text}</p>
            ) : (
              <div className="relative">
                <Image
                  src={message?.photo}
                  alt="message"
                  className="max-w-[280px] p-0.5 max-h-[280px] object-cover rounded-xl cursor-pointer"
                  height={280}
                  width={280}
                  onClick={() => setExpandImage(true)}
                />
                {expandImage && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setExpandImage(false)}
                  >
                    <X
                      className="absolute top-4 right-4 text-white cursor-pointer w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandImage(false);
                      }}
                    />
                    <Image
                      src={message?.photo}
                      alt="expanded message"
                      className="max-w-[90vw] max-h-[90vh] object-contain"
                      height={700}
                      width={700}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {showTimestamp && (
            <p
              className={`text-xs text-zinc-500 mt-1 px-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}
            >
              {message?.createdAt
                ? format(new Date(message.createdAt), 'p')
                : 'invalid date'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
