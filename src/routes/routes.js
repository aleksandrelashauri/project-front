import React from 'react';
import Main from '../components/main/Main';
import { WrongUrl } from './wrongUrl';

const routes = () => [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '*',
    element: <WrongUrl />,
  },
];

export default routes;
