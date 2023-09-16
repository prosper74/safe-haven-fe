import React from 'react';

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="https://res.cloudinary.com/prosper-dev/image/upload/v1647127499/eclipse_qljx8s.svg"
        alt="Loader"
        className="m-auto w-52"
      />
    </div>
  );
}
