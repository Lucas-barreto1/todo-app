import {React} from 'react';
import Head from 'next/head';

import HomePage from '../pages/home/main';


const Home = () => {
  return (
      <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <title>Todo's App</title>
      </Head>
      <HomePage />
    </div>
  )
}

export default Home