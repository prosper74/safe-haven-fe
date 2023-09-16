import { FC, Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setSnackbar } from '@src/store/reducers/feedbackReducer';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setIsLoading: (open: boolean) => void;
  urlRoute: string;
  advertId: string;
}

const DeletePropertyModal: FC<IProps> = ({
  isOpen,
  setIsOpen,
  setIsLoading,
  urlRoute,
  advertId,
}) => {
  const user = useSelector((state: RootStateOrAny) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = () => {
    setIsLoading(true);
    setIsOpen(false);
    axios
      .delete(`${process.env.NEXT_PUBLIC_REST_API}/${urlRoute}/${advertId}`, {
        headers: { Authorization: `Bearer ${user.jwt}` },
      })
      .then(() => {
        setIsLoading(false);
        dispatch(
          setSnackbar({
            status: 'success',
            message: ` Item deleted successfully`,
            open: true,
          })
        );
        router.push('/agent/account');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        dispatch(
          setSnackbar({
            status: 'error',
            message: ` There was an error. Please try again later`,
            open: true,
          })
        );
      });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this item?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-800">
                      ⚠️ This action is irreversible
                    </p>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Sure, delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeletePropertyModal;
