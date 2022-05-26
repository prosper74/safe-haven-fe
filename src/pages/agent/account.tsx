// index.tsx
import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, RootStateOrAny } from 'react-redux';
import { userProps } from '@src/components/common/interfaces';
import { PageLoader } from '@src/components/common/loader';
import AccountPortal from '@src/components/common/properties/agent/accountPortal';

interface IProps {
  user: userProps;
}

const AccountPage: FC<IProps> = () => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.onboarding && !user.jwt) {
      router.push('/');
    }
  });

  return (
    <>
      {user.jwt && user.onboarding ? (
        <>
          <Head>
            <title>My account | {user.username}</title>
            <link rel="icon" href="/favicon.png" />
            <meta content={`${user.username} account page`} />
          </Head>

          <AccountPortal user={user} />
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default AccountPage;