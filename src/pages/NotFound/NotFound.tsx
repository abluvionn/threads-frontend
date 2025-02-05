import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <main className='grid min-h-full place-items-center px-6 py-48 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-secondary'>404</p>
        <h1 className='mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl'>
          Page not found
        </h1>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link
            to='/'
            className='rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs 
            hover:bg-[#693bde] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
};
