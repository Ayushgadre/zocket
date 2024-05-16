import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adBgColor } from '../../app/adSlice.js'; // Action to update the background color in the Redux store
import { SketchPicker } from 'react-color'; // Color picker component
import Queue from '../../utils/lastPick.js'; // Queue utility for managing recent colors
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome icons
import { faEyeDropper, faPlus } from '@fortawesome/free-solid-svg-icons'; // Specific icons used

function CustomBgColor() { // Renamed component for clarity
    const [color, setColor] = useState(); // Local state to store the selected color
    const [recentColor, setRecentColor] = useState(new Queue()); // State to store the recent colors
    const [showPicker, setShowPicker] = useState(false); // State to toggle the color picker visibility
    const [prevColor, setPrevColor] = useState(''); // State to store the previous color

    const dispatch = useDispatch(); // Redux dispatch function

    // Function to handle recent colors queue
    const handleRecentColor = () => {
        let newRecentColor = new Queue(); // Create a new instance of Queue
        newRecentColor = Object.assign(recentColor); // Copy the recent color queue
        if (prevColor === color) {
            return; // No need to update if the color is the same as the previous one
        }
        if (Object.keys(recentColor.array).length >= 5) { // Check if the queue exceeds 5 colors
            newRecentColor.pop(); // Remove the oldest color if the queue exceeds 5 colors
            newRecentColor.push(color); // Add the new color to the queue
        } else {
            newRecentColor.push(color); // Add the new color to the queue
        }
        setRecentColor(newRecentColor); // Update the state
    };

    // Dispatch the selected color to the Redux store whenever it changes
    useEffect(() => {
        dispatch(adBgColor(color)); // Dispatch the action to update the background color in the Redux store
    }, [color, dispatch]);

    // Handler for color change completion
    const handleChangeComplete = (color) => {
        setColor(color.hex); // Update the state with the selected color's hex value
    };

    return (
        <>
            <div>
                <h1 className='text-slate-500 text-sm font-bold'>
                    Choose your color <FontAwesomeIcon icon={faEyeDropper} /> {/* Eye dropper icon */}
                </h1>
                <div className='flex mt-2 '>
                    {/* Render the recent colors */}
                    {Object.values(recentColor.array).map((color, ind) => (
                        <div
                            key={ind}
                            onClick={() => setColor(color)} // Set the clicked color as the current color
                            style={{ backgroundColor: color }}
                            className='w-7 mr-2 h-7 text-lg font-bold rounded-full cursor-pointer text-center'
                        />
                    ))}
                    {/* Button to show the color picker */}
                    <div
                        className='w-7 h-7 text-lg font-bold bg-slate-100 rounded-full cursor-pointer text-center'
                        onClick={() => setShowPicker(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} /> {/* Plus icon */}
                    </div>
                    {/* Render the color picker */}
                    {showPicker && (
                        <div className="relative">
                            <div
                                onClick={() => {
                                    setShowPicker(false); // Hide the color picker
                                    setPrevColor(color); // Update the previous color
                                    handleRecentColor(); // Handle recent colors queue
                                }}
                                className="fixed inset-0 z-10 bg-black opacity-25"
                            />
                            <div className="absolute z-20 top-full left-0 mt-2">
                                <SketchPicker color={color} onChange={handleChangeComplete} /> {/* Color picker component */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CustomBgColor;
