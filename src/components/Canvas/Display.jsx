import React from 'react';
import { useSelector } from 'react-redux';
import Canvas from './Canvas';
import './bg.css';

const Display = () => {
  // Select the adInfo state from the Redux store
  const adInfo = useSelector((state) => state.ad);

  return (
    // Container with diagonal lines background
    <div className="diagonal-lines">
      <div className="content">
        {/* Container for the Canvas component */}
        <div className='w-screen h-[30rem] sm:h-screen sm:w-3/4 flex justify-center items-center'>
          <Canvas adInfo={adInfo} />
        </div>
      </div>
    </div>
  );
};

export default Display;
