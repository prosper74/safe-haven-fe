import React, { FC, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, RootStateOrAny } from 'react-redux';
import { PageLoader } from '@src/components/common/loader';
import AccountPortal from '@src/components/common/properties/agent/accountPortal';

const AccountPage: FC = () => {
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
          <AccountPortal />
        </>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default AccountPage;
