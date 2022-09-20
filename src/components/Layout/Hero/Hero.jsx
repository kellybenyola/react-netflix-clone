import React, {useState, useEffect} from 'react'
import './Hero.scss'
import HTTP from '../../../Utils/https/https';
import HeroMovie from './HeroMovie';
import { IoGrid } from "react-icons/io5";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { VscTriangleDown } from "react-icons/vsc";
const Hero = ({pgTitle}) =>{
    const [heroMovies, setHeroMovies] = useState([]);
    const [showSlide, setShowSlide] = useState(0);
    const [notHovered, setNotHovered] = useState(true)
    const length = heroMovies.length;


    const handleHoverEnter = () =>{ setNotHovered(false)}
    const handlerHoverOut = () =>{ setNotHovered(true)}
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowSlide(showSlide === length - 1 && notHovered ? 0 : showSlide + 1);
        }, 50000);
        return () => clearTimeout(timer);
      }, [showSlide, length]);
    useEffect(() => {
      async function fetchData () {
        const { results } = (await HTTP.get('/trending/movie/day?with_networks=213?video=true/images?')).data;
        setHeroMovies(results);

      }
      fetchData();

    }, []);

    return(
        <div className='heroContainer'>
       {pgTitle && <section className='pageTitleSection'>
          <div>
            <h1 className='pgTitle'>{pgTitle}</h1>
          </div>
          <div className='genreSelector'>
            <span>Genres</span>
            <VscTriangleDown />
          </div>
          <div className='viewSelector'>
            <div className='optionsBox'>
              <HiOutlineMenuAlt1 />
            </div>
            <div className='optionsBox'>
              <IoGrid />
            </div>
          </div>
        </section> }
            {heroMovies.map((movie, index)=>{
           
                return(
                    <div
                     
                      onMouseEnter={handleHoverEnter} 
                      onMouseOut={handlerHoverOut} 
                      key={movie.id} 
                      className={index === showSlide ? 'slide active' : 'slide'}>
                    {index === showSlide && <HeroMovie 
                            movieKey={movie.id}
                            movie={movie}
                            video={movie.video}
                            type={movie.media_type}
                            />}
                    </div>

                )
            })}
        </div>
    )
}

export default Hero;