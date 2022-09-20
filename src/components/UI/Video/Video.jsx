import './Video.scss'

const Video = ({video}) =>{
    return(
        <iframe
        src={`https://www.youtube-nocookie.com/embed/${video}`}
        // frameBorder="0"
        // width="350px"
        // allow="autoplay; encrypted-media"
        // allowFullScreen
        // title="video"
        autoPlay={true}
        loop
    />
    )
}

export default Video