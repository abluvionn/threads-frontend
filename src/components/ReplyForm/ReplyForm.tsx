import { FC, FormEvent, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { Icon } from '../../iconpack';
import { palette } from '../../utils/palette';
import axiosApi from '../../axiosApi';
import { PostDetailed, Reply } from '../../types/post';

interface Props {
  post: PostDetailed;
  addToReplies: (reply: Reply) => void;
}

export const ReplyForm: FC<Props> = ({ post, addToReplies }) => {
  const user = useAppSelector(selectUser);
  const [input, setInput] = useState('');

  const submitReply = async () => {
    try {
      const replyData = {
        text: input,
        post: post._id,
      };
      const response = await axiosApi.post<Reply>('/replies', replyData);
      addToReplies(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    void submitReply();
    setInput('');
  };

  return (
    <div className='fixed bottom-[90px] px-3 py-3 w-[95%] bg-gray-200 flex items-center sm:max-w-sm left-[50%] -translate-x-[50%] rounded-full gap-2'>
      <div className='flex-none size-[35px] relative bg-light rounded-full'>
        <img
          src={user?.user.avatar || '/icons/no-pfp.png'}
          className='w-full h-full object-cover rounded-full'
        />
      </div>
      <form id='replyForm' className='grow' onSubmit={onFormSubmit}>
        <input
          required
          type='text'
          placeholder={`Reply to ${post.author.name.split(' ')[0]}`}
          className='ps-2 py-1 w-full placeholder:text-platinum-500'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <button
        form='replyForm'
        className='ms-auto bg-secondary rounded-full p-3'
      >
        <Icon
          name='share'
          size='sm'
          color={palette.white}
          width={18}
          height={18}
        />
      </button>
    </div>
  );
};
