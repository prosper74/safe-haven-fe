import React, { FC } from 'react';
// import { timeSince } from '../../dateFunction';
import { userProps } from '../../interfaces';
import UserTab from './userTab';

interface IProps {
  user: userProps;
}

const AccountPortal: FC<IProps> = ({ user }) => {
  return (
    <main className="my-10">
      <div className="sm:container xs:px-4 md:px-6 xl:px-32 mx-auto bg-white">
        <UserTab user={user} />
      </div>
    </main>
  );
};

export default AccountPortal;
