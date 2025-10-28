import {Link} from "react-router";
import GenresDropDown from "./GenresDropdown.tsx";
import SearchInput from "./SearchInput.tsx";
import FakeUserCircle from "./FakeUserCircle.tsx";

const Header = () => {
    return (
        <header className="bg-cover
        bg-[linear-gradient(90deg,rgba(191,_40,_143,_0.3)_0%,_rgba(15,_39,_191,_0.3)_69%)] items-center justify-center">
            <div>
                <ul className="flex items-center justify-between h-15 p-6">
                    <div className="flex items-center justify-center space-x-8">
                        <Link to="/">
                            <li className="text-2xl font-black tracking-wide">
                                <span className="text-amber-400">Movie</span>
                                <span className="text-blue-400">DB</span>
                                <span className="text-gray-300 ml-2">WebApp</span>
                            </li>
                        </Link>
                        <GenresDropDown/>
                    </div>
                    <div className="flex items-center justify-center space-x-8">
                        <FakeUserCircle/>
                        <SearchInput/>
                    </div>
                </ul>

            </div>
        </header>
    );
};

export default Header;