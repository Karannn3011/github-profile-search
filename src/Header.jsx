import React from 'react'
import heropc from "./assets/hero-image-github-profile.jpg"
import Searchbar from "./components/SearchBar"
const Header = () => {
  return (
    <div>
      <div 
        className="bg-top bg-no-repeat bg-cover h-58 lg:h-64 px-5 py-7" 
        style={{ backgroundImage: `url(${heropc})` }}
      >
        <Searchbar />
      </div>
    </div>
  )
}

export default Header