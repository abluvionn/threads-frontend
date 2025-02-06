import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login } from '../../store/users/usersThunks';
import { FormEvent, useState } from 'react';
import { LoginMutation } from '../../types/user';
import {
  selectLoginError,
  selectLoginLoading,
} from '../../store/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password');

  const handleStepBack = () => {
    setCurrentStepIndex((prev) => prev - 1);
  };

  const togglePasswordVisibility = () => {
    if (passwordInputType === 'password') {
      setPasswordInputType('text');
    } else {
      setPasswordInputType('password');
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const loginData: LoginMutation = {
      alatooID: Number(idInput),
      password: passwordInput,
    };
    void sendLoginData(loginData);
  };

  const sendLoginData = async (loginData: LoginMutation) => {
    await dispatch(login(loginData)).unwrap();
    navigate('/');
  };

  const steps = [
    {
      content: (
        <div className='flex justify-center'>
          <div className='mt-[215px] max-w-[343px] flex flex-col items-center text-center'>
            <img src='/icons/logo.png' alt='' />
            <h1 className='mt-4 text-4xl font-semibold leading-11'>
              Welcome to <br /> <span className='text-main uppercase'>Edu Bridge</span>
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
        </div>
      ),
    },
    {
      content: (
        <div className='mt-[101px] w-full px-6'>
          <nav className='flex items-center'>
            <h1 className='text-lg font-bold leading-6 relative w-full flex items-center justify-center'>
              <button
                onClick={handleStepBack}
                className='absolute left-0 flex justify-center items-center cursor-pointer p-1 -m-1'
              >
                <Icon name='arrowLeft' size='sm' color={palette.dark} />
              </button>
              <span>Login</span>
            </h1>
          </nav>
          <form id='login-form' onSubmit={onFormSubmit}>
            <div className='flex flex-col gap-2 mt-[80px]'>
              {loginError && (
                <span className='inline-flex items-center rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-600/10 ring-inset'>
                  {loginError.error}
                </span>
              )}
              <input
                type='text'
                className='input-primary'
                placeholder='ID'
                required
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
              />
              <div className='relative flex items-center'>
                <input
                  type={passwordInputType}
                  className='input-primary w-full'
                  placeholder='Password'
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <span
                  className='absolute right-4 cursor-pointer'
                  onClick={togglePasswordVisibility}
                >
                  <Icon name='eyeClosed' size='md' color={palette.black} />
                </span>
              </div>
              <p className='text-sm leading-5 text-platinum-500'>
                Make sure it matches the name on your university ID.
              </p>
            </div>
          </form>
          <div className='flex flex-col mt-[200px]'>
            <div className='group grid size-7 grid-cols-1'>
              <input
                type='checkbox'
                name='terms-agree'
                id='terms-agree'
                className='col-start-1 row-start-1 appearance-none rounded-sm border border-secondary bg-white checked:border-secondary checked:bg-secondary indeterminate:border-secondary indeterminate:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto cursor-pointer'
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                checked={isCheckboxChecked}
              />
              <svg
                fill='none'
                viewBox='0 0 14 14'
                className='pointer-events-none col-start-1 row-start-1 size-5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25'
              >
                <path
                  d='M3 8L6 11L11 3.5'
                  strokeWidth={1.5}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='opacity-0 group-has-checked:opacity-100'
                />
                <path
                  d='M3 7H11'
                  strokeWidth={1.5}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='opacity-0 group-has-indeterminate:opacity-100'
                />
              </svg>
            </div>
            <label htmlFor='terms-agree' className='text-sm leading-5 mt-2'>
              By selecting Agree and continue, I agree to Dynamic Layers{' '}
              <a href='#' className='text-secondary underline font-bold'>
                Terms of Service
              </a>
              ,{' '}
              <a href='#' className='text-secondary underline font-bold'>
                Notification Policy
              </a>{' '}
              and acknowledge the{' '}
              <a href='#' className='text-secondary underline font-bold'>
                Privacy Policy
              </a>
              .
            </label>
          </div>
          <button
            className='btn-primary w-full mt-4'
            type='submit'
            form='login-form'
            disabled={!isCheckboxChecked || loginLoading}
          >
            {loginLoading ? 'Loading...' : 'Agree and continue'}
          </button>
        </div>
      ),
    },
  ];
  return steps[currentStepIndex].content;
};
