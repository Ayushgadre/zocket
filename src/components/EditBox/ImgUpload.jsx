import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adImage } from '../../app/adSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function ImgUpload() {
    const [adimage, setAdImage] = useState(); // Local state to store the ad image URL
    const [imgname, setImgName] = useState(""); // Local state to store the image file name
    const dispatch = useDispatch(); // Redux dispatch function

    // Handler for image file selection
    const imageHandler = (e) => {
        const filename = (e.target.value).split('\\'); // Extract the file name from the file path
        setImgName(filename[2]); // Update the image name state
        const imgurl = URL.createObjectURL(e.target.files[0]); // Create a URL for the selected image file
        setAdImage(imgurl); // Update the ad image URL state
    };

    // Dispatch the ad image URL to the Redux store whenever it changes
    useEffect(() => {
        dispatch(adImage(adimage)); // Dispatch the action to update the ad image in the Redux store
    }, [adimage, dispatch]);

    return (
        <div className='flex items-center h-14 w-5/6 sm:w-4/5 border-2 border-slate-300 rounded-lg'>
            <input type="file" id="image-input" hidden onChange={imageHandler} /> {/* Hidden file input */}
            <FontAwesomeIcon icon={faUpload} className="m-2 cursor-pointer"/> {/* Upload icon */}
            <label className='text-lg text-slate-500'>Change the ad creative image.</label>
            <label htmlFor="image-input" className='ml-1 text-sm text-blue-700 font-semibold cursor-pointer underline underline-offset-1'>
                select file
            </label> {/* Label to trigger file input */}
            <label className='text-xs ml-3 text-slate-500 truncate w-[10rem]'>{imgname}</label> {/* Display selected image name */}
        </div>
    );
}

export default ImgUpload;
