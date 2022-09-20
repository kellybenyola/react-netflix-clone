
import { useState, useRef, useEffect } from 'react';
import HTTP from '../../../Utils/https/https';
import _ from 'lodash';
import { useURL, useRequest } from '../../../Utils/hooks/use-url';
import { useDate } from '../../../Utils/hooks/use-date';
import './MovieItem.scss';
import {  BsFillPlayFill, BsPlusLg,BsHandThumbsUp, BsHandThumbsDown, BsChevronDown } from "react-icons/bs";
import Video from '../Video/Video'


export default function Movie ({index, movie, type, handleEnter, movieItemRef, styles }) {

  const movieURL = useURL(`w1280${movie.backdrop_path}`);
  const [isExpanded, setIsExpanded] = useState(false);
  const [trailerId, setTrailerId] = useState('');
  const[movieRating, setMovieRating] = useState([])


  const [isError, setIsError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentMovie = useRef()

  const handleGetVideos = async () => {
    const { results } = (await HTTP.get(`/${movie.media_type || type}/${movie.id}/videos`)).data;
    if (results.length === 0) {
      setIsError(true);
      console.log("no video")
      return _.delay(() => setIsError(false), 3000);
    }
    setIsExpanded(!isExpanded);
    setTrailerId(results[0].key);
  }

  useEffect(()=>{
    if(type === 'movie'){
      async function fetchData () {
        const { results } = (await HTTP.get(`/${movie.media_type || type}/${movie.id}/release_dates`)).data;
        results.filter(movie => {
          if(movie.iso_3166_1 === 'US'){
            setMovieRating(movie.release_dates[0].certification)
          }
        } );
      }
      fetchData()
    }
  },[])

  
  const releaseDate = movie.release_date ? movie.release_date : movie.first_air_date
  const movieReleaseDate = useDate(releaseDate)

  const handleGetRating = () =>{
    if(type === 'tv'){
      async function fetchData () {
        const { results } = (await HTTP.get(`/tv/${movie.id}/content_ratings`)).data;
        setMovieRating(results.filter(movie => movie.iso_3166_1 === 'US'));
      }
      fetchData();}
  }


const handleHover = () =>{
  handleGetRating()
  handleGetVideos()
  setIsHovered(true)
}

let description = movie.overview &&  movie.overview.length < 70 ? movie.overview : `${movie.overview.substring(0, 70)}...`


  return (
    <div 
      onMouseEnter={handleHover} 
      onMouseLeave={()=>{setIsHovered(false)}} 
      ref={currentMovie} 
      className='movieItem'
      style={{left: isHovered && (index * 225 - 20 )+ (index * 2.5)}}
      >

     <img src={movieURL} alt={movie.title}/>
      {isHovered && (
        <>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerId}?&autoplay=1&mute=1`}
            allow="autoplay"
            allowFullScreen
            title="video"
            autoPlay={true}
        />
        <section className='movieItemInfoContainer'>
          <div className='iconContainer'>
            <BsFillPlayFill className='icon' />
            <BsPlusLg className='icon'/>
            <BsHandThumbsUp className='icon' />
            <BsChevronDown className='icon'/>
          </div>
          <div className='movieInfo'>
            {movieRating.length > 0 && <span className='rating'>{type === 'tv' ? movieRating.map(movie => movie.rating)
            : movieRating}</span>}
            <span>1 hour</span>
          </div>
          <div className='movieDesc'>
          {/* <p>{movieReleaseDate}</p> */}
            {description} 
          </div>
          <div className='genre'>
            action
          </div>

      </section>
        </>
      )}


    </div>


  );
}

// <Card 
  
// cardRef={movieItemRef}
// index={index} 
// movie={movie} 
// getVideo={handleGetVideos} 
// title={movie.title} 
// video={trailerId} 
// movieURL={movieURL} 
// overview={movie.overview} /> 