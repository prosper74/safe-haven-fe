// components/layout.js
import Navbar from './navbar';
import Footer from './footer';
// import { ApolloWrapper } from '@src/apollo/apolloWrapper';

export default function Layout({ children }) {
  return (
    <>
      {/* <ApolloWrapper> */}
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* </ApolloWrapper> */}
    </>
  );
}
