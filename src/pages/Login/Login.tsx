import { useState } from 'react';

export const Login = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const handleStepBack = () => {
    setCurrentStepIndex((prev) => prev - 1);
  };
  const steps = [
    {
      content: (
        <div className='mt-[215px] max-w-[343px] flex flex-col items-center text-center'>
          <img src='/logo.png' alt='' />
          <h1 className='mt-4 text-4xl font-semibold leading-11'>
            Welcome to <span className='text-main'>THREADS</span>
          </h1>
          <p className='mt-2 text-sm leading-5 text-platinum-500'>
            Make sure it matches the name on your university ID.
          </p>
          <button
            onClick={() => setCurrentStepIndex(1)}
            className='btn-primary !py-2 w-[207px] text-xl !font-normal mt-12'
          >
            Login
          </button>
        </div>
      ),
    },
    {
      content: (
        <div className='mt-[101px] w-full px-6'>
          <nav className='flex items-center'>
            <h1 className='text-lg font-bold leading-6 relative w-full flex items-center justify-center'>
              <button onClick={handleStepBack} className='absolute left-0 flex justify-center items-center'>
                <img src='/arrow-left.svg' alt='' />
              </button>
              <span>Login</span>
            </h1>
          </nav>
          <div className='flex flex-col gap-2 mt-[80px]'>
            <input type='text' className='input-primary' placeholder='ID' />
            <input
              type='text'
              className='input-primary'
              placeholder='Password'
            />
            <p className='text-sm leading-5 text-platinum-500'>
              Make sure it matches the name on your university ID.
            </p>
          </div>
        </div>
      ),
    },
  ];
  return <div className='container'>{steps[currentStepIndex].content}</div>;
};
