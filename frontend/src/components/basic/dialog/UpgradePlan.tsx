import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';

// REFACTOR: Move all these modals into one reusable one 
type Props = {
  isOpen?: boolean;
  onClose: ()=>void;
  text: string;
}

const UpgradePlanModal = ({
  isOpen,
  onClose,
  text,
}:Props) => {
  const router = useRouter();

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-150'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50 drop-shadow-xl' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-bunker border border-mineshaft-500 p-6 pt-5 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-medium leading-6 text-primary'
                  >
                    Unleash Infisical&apos;s Full Power
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-bunker-300 mb-1'>
                      {text}
                    </p>
                    <p className='text-sm text-bunker-300'>
                      Upgrade and get access to this, as well as to other powerful enhancements.
                    </p>
                  </div>
                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-primary opacity-80 hover:opacity-100 px-4 py-2 text-sm font-medium text-black hover:text-semibold duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => router.push(`/settings/billing/${localStorage.getItem("projectData.id")}`)}
                    >
                      Upgrade Now
                    </button>
                    <button
                      type='button'
                      className='ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-gray-400 hover:border-red hover:text-red hover:text-semibold duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={onClose}
                    >
                      Maybe Later
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default UpgradePlanModal;
