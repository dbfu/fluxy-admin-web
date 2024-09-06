import React from "react";

import './index.css';

const GlobalLoading: React.FC = () => (
  <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
    <div className="loading transform  translate-y-[-12vh]"></div>
  </div>
)

export default GlobalLoading;