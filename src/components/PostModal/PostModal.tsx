import { FC, FormEvent, useState } from 'react';
import axiosApi from '../../axiosApi';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

const PostModal: FC<Props> = ({ isOpen, closeModal }) => {
  const [textAreaInput, setTextAreaInput] = useState('');
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTextAreaInput('');
    closeModal();
    sendPostRequest();
  };
  const sendPostRequest = async () => {
    const postData = {
      text: textAreaInput,
    };
    await axiosApi.post('/posts', postData);
    window.location.reload();
  };
  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative p-4 w-full max-w-xl bg-light rounded-lg shadow-sm dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                New Thread
              </h3>
              <button
                onClick={closeModal}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
              </button>
            </div>

            <div className='p-4 md:p-5 space-y-4'>
              <form id='postForm' onSubmit={onSubmit}>
                <textarea
                  placeholder="What's new ?"
                  className='px-2 py-1 w-full'
                  value={textAreaInput}
                  onChange={(e) => setTextAreaInput(e.target.value)}
                  required
                  autoFocus
                ></textarea>
              </form>
            </div>
            <div className='ps-3 mb-1'>
              <span>Anyone can reply & quote</span>
            </div>
            <div className='flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                onClick={closeModal}
                className='py-2.5 px-5 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 cursor-pointer'
              >
                Cancel
              </button>
              <button
                form='postForm'
                type='submit'
                className='btn-primary !py-2.5 !px-5 text-sm !font-medium'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
