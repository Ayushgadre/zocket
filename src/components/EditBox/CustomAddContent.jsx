// import { useEffect,useState } from "react"
// import { useDispatch } from "react-redux"
// import { adText } from "../../app/adSlice.js"


// function CustomAddContent() {

//     const [text,setText] = useState()
//     const dispatch = useDispatch()

//     const textHandler = (e) => {
//         setText(e.target.value)
//     }

//     useEffect(() =>{
//         dispatch(adText(text))
//     },[text,dispatch])

//   return (
//     <div className='flex flex-col border-2 border-slate-300 sm:w-4/5 sm:h-14 w-5/6 h-13 rounded-lg  '>
//       <label className=' mx-3 mt-1 mb-1 text-slate-500 text-xs font-bold'>Ad Content</label>
//       <input type="text" className='mx-3 focus:outline-none ' onChange={(e)=>textHandler(e)}/>

//     </div>
//   )
// }

// export default CustomAddContent


import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { adText } from "../../app/adSlice.js";

function CustomAddContent() {
  const [text, setText] = useState(""); // Local state to store the input text
  const dispatch = useDispatch(); // Redux dispatch function

  // Handler for input text change, memoized using useCallback to prevent unnecessary re-renders
  const textHandler = useCallback((e) => {
    setText(e.target.value); // Update the local state with the input value
  }, []);

  // Dispatch the text value to the Redux store whenever it changes
  useEffect(() => {
    dispatch(adText(text)); // Dispatch the action to update the ad text in the Redux store
  }, [text, dispatch]);

  return (
    <div className='flex flex-col border-2 border-slate-300 sm:w-4/5 sm:h-14 w-5/6 h-13 rounded-lg'>
      <label className='mx-3 mt-1 mb-1 text-slate-500 text-xs font-bold'>Ad Content</label>
      <input
        type="text"
        className='mx-3 focus:outline-none'
        value={text} // Bind input value to state
        onChange={textHandler} // Call the handler on input change
      />
    </div>
  );
}

export default CustomAddContent;
