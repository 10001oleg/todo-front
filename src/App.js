  
import React from 'react';
import { Router } from 'react-router-dom';
import { history } from './navigation/history';
import { Routes } from './navigation';

export const App = () => {
  return (
    <Router history = { history }>
        <Routes />
    </Router>
  )
};