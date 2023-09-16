import React, { FC } from 'react';
import UserTab from './userTab';

const AccountPortal: FC = () => {
  return (
    <main className="my-10">
      <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
        <UserTab />
      </div>
    </main>
  );
};

export default AccountPortal;
