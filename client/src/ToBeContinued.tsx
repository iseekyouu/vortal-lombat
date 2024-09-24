import React from 'react';
import VLogo from "./vlombat-logo.webp";

const ToBeContunued: React.FC<{
}> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#181922] text-white">
      <img src={VLogo} alt="Vortal Lombat" className="mt-[-300px] w-96 h-96" />

      {/* Title */}
      <h1 className="text-6xl font-bold text-red-600 uppercase mb-8">
        To be continued
      </h1>
      </div>
  );
};

export default ToBeContunued;