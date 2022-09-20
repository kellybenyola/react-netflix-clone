import { useEffect, useState } from 'react';
import './NavBar.scss'
import HTTP from '../../../Utils/https/https';
import { Link } from 'react-router-dom';
import { BsFillBellFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import userIcon from '../../../Images/icon.png'
const NavBar = () =>{
    const [companies, setCompanies] = useState([])
    const [scrolled, setScrolled] = useState(false);
    const [userSearchInput, setUserSearchInput] = useState('')
    const [searchClicked, setSearchClicked] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false);

    window.onscroll = () =>{
      setScrolled(window.pageYOffset === 0 ? false : true)
      return () => (window.onscroll = null)
    }

        useEffect(() => {
            async function fetchData () {
              const { results } = (await HTTP.get('/search/company?&query=Netflix')).data;
              setCompanies(results);
            }
            fetchData();
      
          }, []);


    return(
      <div className={scrolled ? 'navBar active' : 'navBar notActive'}>
        <section>
            {companies.filter((company, index) => index === 0).map(filteredCo => (
                <div key={filteredCo.id}>
                <Link to='/'>
                        <img src={`https://image.tmdb.org/t/p/w92${filteredCo.logo_path}`} alt={filteredCo.name}/>
                </Link>
                </div>
            ))}
            <div className="linksContainer">
            
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/tv'>TV Shows</Link></li>
                    <li><Link to=''>Movies</Link></li>
                    <li><Link to=''>New & Popular</Link></li>
                    <li><Link to=''>My List</Link></li>
                    <li><Link to=''>Browse by Languages</Link></li>
                </ul>
            </div>
        </section>
        <section className='rightSide'>
          <div className={searchClicked ? 'searchBar' : 'search'}>
            <span className='icon' onClick={()=>{setSearchClicked(prev=> !prev)}}>
                <FaSearch />
              </span>
              {searchClicked && <input type='text' 
                onChange={(e) =>{setUserSearchInput(e.target.value)}} 
                value={userSearchInput}
                placeholder="Titles, people, genres" />}
            </div>
          <div>
            <Link to=''>DVD</Link>
          </div>
          <div>
            <span><BsFillBellFill /></span>
          </div>
          <div className='dropMenuContainer'>
            <div className='dropMenuBtn'>
                <div onMouseEnter={()=>{setDisplayMenu(true)}} onMouseOut={()=>{setDisplayMenu(false)}} className='userIcon'>
                <img src={userIcon} alt='' />
                </div>
                <div onClick={()=>{setDisplayMenu(prev => !prev)}}>
                  <IoMdArrowDropdown className={displayMenu ? 'rotateUp' : 'rotateDown'}/> 
                </div>
              </div>
         
            {displayMenu && <div className='dropMenu'>
              <div>USER</div>
              <div>USER</div>
            </div>}
            </div>

        </section>

    
      </div>
    )
}

export default NavBar