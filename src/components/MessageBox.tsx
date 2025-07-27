import { format } from 'date-fns';
import Image from 'next/image';

const MessageBox = ({ message, currentUser }) => {
  const isOwnMessage = message?.sender?._id === currentUser._id;

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end gap-2 max-w-[70%]`}
      >
        {!isOwnMessage && (
          <div className="flex-shrink-0">
            <Image
              src={message?.sender?.profileImage || '/assets/person.jpg'}
              alt="profile photo"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-600"
              height={32}
              width={32}
            />
          </div>
        )}

        <div
          className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl shadow-sm ${
              isOwnMessage
                ? 'bg-indigo-600 text-white rounded-br-md'
                : 'bg-gray-800 text-gray-100 rounded-bl-md border border-gray-700'
            } max-w-full break-words`}
          >
            {message?.text ? (
              <p className="text-sm leading-relaxed">{message.text}</p>
            ) : (
              <div className="relative">
                <Image
                  src={message?.photo}
                  alt="message"
                  className="max-w-[280px] max-h-[280px] object-cover rounded-xl"
                  height={280}
                  width={280}
                />
              </div>
            )}
          </div>

          <p
            className={`text-xs text-gray-500 mt-1 px-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}
          >
            {message?.createdAt
              ? format(new Date(message.createdAt), 'p')
              : 'invalid date'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
