import { useEffect, useState, useRef } from 'react'
import Movie from './Movie';
import HTTP from '../../../Utils/https/https';
import './Movie.scss'
import { BsChevronLeft, BsChevronRight, BsList } from "react-icons/bs";
import Button from '../../Layout/Button/Button';
const MovieList = ({category, type, url}) => {
    const [movies, setMovies] = useState([]);
    const movieListRef = useRef();
    const movieItemRef = useRef(); 
    const [scrollIndex, setScrollIndex] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [leftBtn, setLeftBtn] = useState(false)
    const [rightBtn, setRightBtn] = useState(false)
    const [hovered, setHovered] = useState(true)

    useEffect(() => {
      async function fetchData () {
        const { results } = (await HTTP.get(url)).data;
        setMovies(results);
      }
      fetchData();
    }, [url]);

    const handleEnter = (e) =>{
      console.log(e)
      setHovered(true)
    }


  const handleBtnClick = (direction) =>{
    console.log(scrollIndex)
    let distance = Math.floor(movieListRef.current.getBoundingClientRect().x - 50);
    if(direction === 'right'){
      setIsScrolled(true)
    }
    if(direction === 'left' &&  scrollIndex > 0){

      setScrollIndex(scrollIndex - 1);
      movieListRef.current.style.transform = `translateX(${1040 + distance}px)`
   
    }
    if(direction === 'left' &&  scrollIndex === 1)   {
      movieListRef.current.style.transform = `translateX(0px)`
    } 
    if(scrollIndex === 0){
      setIsScrolled(false)
    }
    if(direction === 'right' && scrollIndex <= 4){
        setScrollIndex(scrollIndex + 1);
        movieListRef.current.style.transform = `translateX(${-1040 + distance}px)`
    }
  }

  const handleMouseIn = () =>{
    setRightBtn(true)
    if(scrollIndex > 0 && hovered){
      setLeftBtn(true)
    }else(
      setLeftBtn(false)
    )
    if(scrollIndex < 5 && hovered){
      setRightBtn(false)
    }
  }

  const handleMouseOut =()=>{
    setHovered(false)
    setRightBtn(false)
    setLeftBtn(false)
  }


  return (
    <div onMouseEnter={handleMouseIn} onMouseOut={handleMouseOut} className='container'>
      <h2 className='categoryTitle'>{category}</h2>
      <div onMouseEnter={handleMouseIn} onMouseOut={handleMouseOut} className='wrapper'>
        <Button 
            onClick={()=>handleBtnClick("left")}
            btnStyles='btn left' 
            isDisabled={false} 
            direction='left'
            style={{display: !isScrolled ? "none" : ''}}
            >
            <BsChevronLeft/>
        </Button>
        <div className='rowContainer' ref={movieListRef} movies={movies} type={type} >
          {movies.map((resource, index) => {
            
            return (
              <Movie 
                movieItemRef={movieItemRef}
                key={resource.id} 
                handleEnter={handleEnter} 
                index={index} 
                id={resource.id} 
                type={type} 
                movie={resource}
                />
            );
          })}
        </div>
   <Button 
            onClick={()=>handleBtnClick("right")}
            btnStyles='btn right'
            isDisabled={false} 
            direction='right'
            style={{display: scrollIndex === 4 && 'none' }}>
            <BsChevronRight/>
        </Button>
      </div>
  </div>
  );
};

export default MovieList;
