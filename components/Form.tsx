import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from './Button';
import Avatar from './Avatar';
import { StringLiteralLike } from 'typescript';
import usePost from '@/hooks/usePost';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);
  const [body, setBody] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';
      await axios.post(url, { body });

      toast.success('Sucesso!');

      setBody('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Algo deu errado');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
      {currentUser ? (
        <div className='flex flex-row gap-4'>
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className='w-full'>
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className='disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none texxt-[20px] placeholder-neutral-500 text-white'
              placeholder={placeholder}
            ></textarea>
            <hr className='opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition' />
            <div className='mt-4 flex flex-row justify-end'>
              <Button
                label='Postar'
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='py-8'>
          <h1 className='text-white text-2xl text-center mb-4 font-bold'>
            Bem vindo ao Plitter
          </h1>
          <div className='flex flex-row items-center justify-center gap-4'>
            <Button label='Entrar' onClick={loginModal.onOpen} />
            <Button label='Registrar' onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
