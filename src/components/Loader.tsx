import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loader;
