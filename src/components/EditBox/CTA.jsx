import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { adCTA } from '../../app/adSlice.js';

function CTA() {
  const [cta, setCta] = useState(""); // Local state to store the CTA input value
  const dispatch = useDispatch(); // Redux dispatch function

  // Handler for CTA input change
  const ctaHandler = (e) => {
    setCta(e.target.value); // Update the local state with the input value
  }

  // Dispatch the CTA value to the Redux store whenever it changes
  useEffect(() => {
    dispatch(adCTA(cta)); // Dispatch the action to update the CTA in the Redux store
  }, [cta, dispatch]);

  return (
    <>
      <div className='flex flex-col border-2 border-slate-300 w-5/6 sm:w-4/5 h-14 rounded-lg'>
        <label className='mx-3 mt-1 mb-1 text-slate-500 text-xs font-bold'>CTA</label>
        <input
          type="text"
          className='mx-3 mb-1 focus:outline-none'
          onChange={(e) => ctaHandler(e)} // Call the handler on input change
        />
      </div>
    </>
  );
}

export default CTA;
