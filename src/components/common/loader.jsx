import React from 'react';

function Loader() {
  return (
    <div className="flex items-center justify-center  h-screen">
      <img
        src="/eclipse.svg"
        alt="Loader"
        className="m-auto w-52"
      />
    </div>
  );
}

export default Loader;
