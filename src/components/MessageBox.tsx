import { format } from 'date-fns';
import Image from 'next/image';

const MessageBox = ({ message, currentUser }) => {
  return message?.sender?._id !== currentUser._id ? (
    <div className="flex items-start gap-3 mb-4">
      <Image
        src={message?.sender?.profileImage || '/assets/person.jpg'}
        alt="profile photo"
        className="w-10 h-10 rounded-full object-cover"
        height={50}
        width={50}
      />
      <div className="flex flex-col">
        <p className="text-xs text-gray-500 mb-1">
          {message?.createdAt
            ? format(new Date(message.createdAt), 'p')
            : 'invalid date'}
        </p>
        {message?.text ? (
          <p className="bg-gray-100 text-gray-800 py-2 px-4 rounded-full shadow-sm max-w-xs">
            {message?.text}
          </p>
        ) : (
          <img
            src={message?.photo}
            alt="message"
            className="rounded-lg max-w-xs shadow-sm"
          />
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-end gap-3 mb-4">
      <div className="flex flex-col items-end">
        {message?.text ? (
          <p className="bg-indigo-500 text-white py-2 px-4 rounded-full shadow-sm max-w-xs">
            {message?.text}
          </p>
        ) : (
          <img
            src={message?.photo}
            alt="message"
            className="rounded-lg max-w-xs shadow-sm"
          />
        )}
        <p className="text-xs text-gray-500 mb-1">
          {format(new Date(message?.createdAt), 'p')}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
