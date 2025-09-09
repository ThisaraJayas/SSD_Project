import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBox() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [localQuery, setLocalQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  var searchQuery: string

  useEffect(() => {
    setLocalQuery(searchQuery); // Sync local query with prop
  }, [searchQuery]);

  const handleSearchFocus = () => {
    setShowRecommendations(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (value.trim() !== '') {
          navigate(`/store?query=${encodeURIComponent(value)}`, { replace: true });
        } else {
          navigate('/store', { replace: true });
        }
      }, 500) // Adjust delay as needed
    );
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowRecommendations(false);
    }, 200);
  };

  return (
        <div className="relative flex-1 sm:flex-initial">
          <form
        className="flex items-center"
        onFocus={handleSearchFocus}
        onBlur={handleSearchBlur}
      >
        <input
          type="text"
          name="search"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          className="h-10 max-w-[600px] cursor-text rounded-md border bg-gray-100 py-2 pl-4 outline-none ring-emerald-200 hover:border hover:border-emerald-300 transition-all duration-200"
          placeholder="Search City, Property.."
        />
        <button
          type="submit"
          className="ml-0 md:flex hidden h-10 items-center justify-center rounded-r-md bg-emerald-500 py-2 px-4 text-center align-middle text-base font-medium normal-case text-white outline-none ring-emerald-200 ring-offset-1 focus:ring"
        >
          Search
        </button>
      </form>
          {/* {showRecommendations && (
            <div className="absolute left-0 right-0 mt-2 divide-y rounded-b-xl border px-4 shadow-lg bg-white">
              <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-emerald-400 hover:text-white">
                <span className="m-0 font-medium">Colombo</span>{" "}
                
              </div>
              <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-emerald-400 hover:text-white">
                <span className="m-0 font-medium">Kandy</span>
              </div>
              <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-emerald-400 hover:text-white">
                <span className="m-0 font-medium">Matara</span>
              </div>
              <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-emerald-400 hover:text-white">
                <span className="m-0 font-medium">Gampaha</span>
              </div>
              <div className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-emerald-400 hover:text-white">
                <span className="m-0 font-medium">Jaffna</span> 
              </div>
            </div>
          )} */}
        </div>
  )
}
