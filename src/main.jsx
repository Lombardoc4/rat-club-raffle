import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import RaffleForm from './App';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
// import Drawing from './Drawing';
// import Winners from './Winners';
import Router from './Router';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);
