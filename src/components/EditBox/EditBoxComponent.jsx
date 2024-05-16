import CTA from './CTA'
import ImgUpload from './ImgUpload';
import CustomBgColor from './CustomBgColor';
import CustomAddContent from './CustomAddContent';


function EditBoxComponent() {
  return (
    <div className='flex flex-col sm:w-1/2 w-screen '>
      <h1 className='text-center text-lg sm:text-2xl font-bold mt-14'>Ad customization</h1>
      <h2 className='text-center text-sm sm:text-lg mt-2 text-gray-500 text-opacity-70'>Customize your ad and get the templates accordingly</h2>
      <div className='sm:ml-20 ml-10 mt-14'><ImgUpload /></div>
      <div>
        <div className="flex items-center mt-5 mb-4 mx-16 ">
          <hr className="flex-grow border-t border-gray-300 " />
          <span className="text-center text-sm sm:text-lg  text-gray-400 text-opacity-70 mx-2">Edit Your Content</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
      </div>
      <div className='sm:ml-20 ml-10 mt-10'><CustomAddContent /></div>
      <div className='sm:ml-20 ml-10 mt-10'><CTA /></div>
      <div className='sm:ml-20 ml-10 mt-10'> <CustomBgColor /></div>

    </div>
  );
}

export default EditBoxComponent
