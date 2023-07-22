import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { CourseContextProvider } from './context/CourseContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import coursesReducer, { coursesFetch } from "./slices/CourseSlice";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
  }
});

ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
    <AuthProvider>
      <CourseContextProvider>
      <Provider store={store}>
      <Routes>
      
        <Route path='/*' element={<App />} />
        
    </Routes>
    </Provider>
    </CourseContextProvider>
    </AuthProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);