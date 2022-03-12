// components/layout.js
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './navbar';
import Footer from './footer';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const feedback = useSelector((state) => state.feedback);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSnackbar({ open: false }));
    }, 8000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <body className="flex flex-col min-h-screen ">
        <header>
          <Navbar />
        </header>
        {/* Feedback snackbar */}
        {feedback.open && (
          <div
            className={`transition duration-200 border px-4 py-3 mx-4 rounded-xl fixed top-20 inset-x-0 z-[20000] ${
              feedback.status === 'error'
                ? 'bg-red-100 border-red-400 text-red-700'
                : 'bg-green-100 border-green-400 text-gray-900'
            }`}
            role="alert"
          >
            <strong className="font-bold">
              {feedback.status === 'error' ? 'Error! ' : 'Success! '}
            </strong>
            <span className="block sm:inline">{feedback.message}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => dispatch(setSnackbar({ open: false }))}
            >
              <svg
                className={`fill-current h-6 w-6 ${
                  feedback.status === 'error'
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <main className="flex-grow">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </>
  );
}
