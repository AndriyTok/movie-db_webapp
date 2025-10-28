import { useState } from "react";
import { Link } from "react-router";
import GenresDropDown from "./GenresDropdown.tsx";
import SearchInput from "./SearchInput.tsx";
import FakeUserCircle from "./FakeUserCircle.tsx";
import { Menu, X } from "lucide-react"; // іконки (Tailwind-friendly)

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-cover bg-[linear-gradient(90deg,rgba(191,_40,_143,_0.3)_0%,_rgba(15,_39,_191,_0.3)_69%)] p-4">
            <div className="flex items-center justify-between">
                {/*logo*/}
                <Link to="/" className="text-2xl font-black tracking-wide">
                    <span className="text-amber-400">Movie</span>
                    <span className="text-blue-400">DB</span>
                    <span className="text-gray-300 ml-2 hidden sm:inline">WebApp</span>
                </Link>

                {/*desktop menu*/}
                <div className="hidden md:flex items-center space-x-8">
                    <GenresDropDown />
                    <FakeUserCircle />
                    <SearchInput />

                </div>

                {/*mobile button*/}
                <button
                    className="md:hidden text-gray-200 hover:text-amber-400 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/*mobile menu*/}
            {isOpen && (
                <div className="mt-4 flex flex-col space-y-4 md:hidden">
                    <GenresDropDown />
                    <SearchInput />
                    <FakeUserCircle />
                </div>
            )}
        </header>
    );
};

export default Header;