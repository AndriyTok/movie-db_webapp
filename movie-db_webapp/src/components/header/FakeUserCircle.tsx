import {BsPersonCircle} from "react-icons/bs";

const FakeUserCircle = () => {

    return (
        <div className='flex items-center space-x-2'>
            <BsPersonCircle
                className="text-white text-sm cursor-pointer"
                onClick={() => {}}
            />
            <span className='text-white text-sm cursor-pointer'>
                User
            </span>
        </div>
    );
};

export default FakeUserCircle;