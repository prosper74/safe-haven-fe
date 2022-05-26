import React, { FC } from 'react';
// import { timeSince } from '../../dateFunction';
import { userProps } from '../../interfaces';

interface IProps {
  user: userProps;
}

const AccountPortal: FC<IProps> = ({ user }) => {
  console.log('User', user);
  return (
    <main className="my-24">
      <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-0 sm:gap-4 mt-6">
          Prosper Atu
        </div>
      </div>
    </main>
  );
};

export default AccountPortal;
