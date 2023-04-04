import Form from '@/components/Form';
import Header from '@/components/Header';
import PostFeed from '@/components/posts/PostFeed';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Header label='Início' />
      <Form placeholder='Poste alguma coisa...' />
      <PostFeed />
    </>
  )
}
