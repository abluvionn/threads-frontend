export const Login = () => {
  return (
    <div className='mx-auto mt-[215px] max-w-[343px] flex flex-col items-center justify-center text-center'>
      <img src='/public/logo.png' alt='' />
      <h1 className='mt-4 text-4xl font-semibold leading-11'>
        Welcome to <span className='text-main'>THREADS</span>
      </h1>
      <p className='mt-2 text-sm leading-5 text-platinum-500'>
        Make sure it matches the name on your university ID.
      </p>
      <button
        onClick={() => console.log('hello')}
        className='btn-primary !py-2 w-[207px] text-xl !font-normal mt-12'
      >
        Login
      </button>
    </div>
  );
};
