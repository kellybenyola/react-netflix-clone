import {useState, useRef, useEffect} from 'react'
import styles from './Card.module.css'
import Video from '../../UI/Video/Video';
import { useURL } from '../../../Utils/hooks/use-url';
import {  BsFillPlayFill, BsPlusLg,BsHandThumbsUp, BsHandThumbsDown, BsChevronDown } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Card = ({index, movieURL, movie, title, video, overview, getVideo, isHovered, cardRef}) =>{
    
    const [hovered, setHovered] = useState(isHovered);
    const [likeHovered, setLikeHovered] = useState(false);
    const mouseHover = useRef();
    const [windowX, setWindowX] = useState(window.innerWidth)
    const [windowY, setWindowY] = useState(null)
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);


  

    const handleHoverIn =(e) => {
        setWindowX(e)
   
        setHovered(true)


    }

    function handleHoverOut(e){
    
        setHovered(false)
    }

    // const handleModalView = (e) =>{
        
    //     setHovered(true)
    //     getVideo();
    // }
    // useEffect(()=>{
    //     if(seconds > 0.){
    //         handleModalView()
    //     }
    // }, [seconds])

    // let     console.log(e.pageX) dyStyles = mouseHover.current ? hoveredStyles : regStyles;
    // console.log(mouseHover.current)

    return(
    <>
        <div ref={cardRef} index={index} className={styles.card}>
                <div
                index={index}
                ref={mouseHover} 
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
                className={index === 0 ? styles.imgBoxLeft : styles.imgBox} >
                <img src={movieURL} alt={overview}/>
                {hovered && <div className={styles.infoBox}>
                        <section className={styles.linksBox}>
                        <div>
                            <div className={styles.play}> <Link to=''><BsFillPlayFill /></Link> </div>
                            <div className={styles.circle}><Link to=''><BsPlusLg /></Link></div>
                            <div 
                                onMouseEnter={()=>{setLikeHovered(true)}}
                                onMouseLeave={()=>{setLikeHovered(false)}} 
                                className={!likeHovered ? styles.likes : styles.likesBox}>
                                    {likeHovered && 
                                        <div className={styles.hoveringStyle}>
                                            <Link to=''><BsHandThumbsDown /></Link> 
                                        </div>}
                                        <div className={likeHovered ? styles.hoveringStyle : ''}>
                                            <Link to=''><BsHandThumbsUp /></Link>
                                        </div>
                                        {likeHovered && <div className={styles.hoveringStyle}>
                                            <Link to=''><BsHandThumbsUp /></Link>
                                        </div>}
                                    
                            </div>
                        </div>
                         <div>
                         <div className={styles.circle}><Link to=''><BsChevronDown /></Link> </div>
                         </div>   
                        </section>

                        <p>thumbs</p>
                        </div> 
                }
                </div>
     
       </div>
      


    </>
    )}

export default Card



    // const hoveredStyles ={
    //     background: 'blue',
    //     width: '400px',

    // }
    // const regStyles={
    //     background: 'red',
    //     width: '200px',

    // }

    // useEffect(() => {
    //   let interval = null;
    //   if (isActive) {
    //     interval = setInterval(() => {
    //       setSeconds(seconds => seconds + 1);
    //     }, 1000);
    //   } else if (!isActive && seconds !== 0) {
    //     clearInterval(interval);
    //   }
    //   return () => clearInterval(interval);
    // }, [isActive, seconds]);
