import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Searchimg from "../assets/Search.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { user, repos, isLoading, error, fetchUserData, clearUserData, setBodyUser , setBodyRepo} =
    useUser();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (user || error) {
      clearUserData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchUserData(query.trim());
    }
  };

  return (
    <div>
      <div className="bg-searchbarbg max-w-140 mx-auto rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex items-center px-3 py-3 gap-x-3"
        >
          <button type="submit">
            <img className="w-7 cursor-pointer" src={Searchimg} alt="Search" />
          </button>
          <input
            value={query}
            onChange={handleInputChange}
            className="w-full bg-transparent focus:outline-none text-whitetext"
            type="text"
            placeholder="Search GitHub username..."
          />
        </form>
      </div>

      <div className="mt-4 max-w-140 mx-auto">
        {isLoading && (
          <div className="flex justify-center items-center p-3 bg-searchbarbg rounded-lg text-whitetext font-semibold">
            Please wait...
          </div>
        )}

        {error && !isLoading && (
          <div className="flex justify-center items-center p-3 bg-red-900 bg-opacity-50 text-red-300 rounded-lg font-semibold">
            {error}
          </div>
        )}

        {user && !isLoading && !error && (
          <div
            onClick={() => {
              
              clearUserData();
              setBodyUser(user);
              setBodyRepo(repos);
            }}
            className="flex cursor-pointer items-start md:items-center p-3 bg-tabbg rounded-lg"
          >
            <div>
              
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-15 md:w-20 rounded-lg"
                />
              
            </div>
            <div className="flex flex-col gap-1 ml-6 md:ml-4">
              <h1 className="text-md md:text-xl font-[600] text-whitetext">
                <a href={user.html_url} target="_blank">
                  {user.login}
                </a>
              </h1>
              <h1 className="text-sm md:text-md text-graytext">
                {user?.bio || <span className="italic opacity-80">No bio</span>}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
