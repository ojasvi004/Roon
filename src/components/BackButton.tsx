import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); 
  };

  return (
    <button
      onClick={handleBackClick}
      className="flex items-center text-lg text-gray-300 hover:text-gray-500"
    >
      <IoIosArrowBack className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
