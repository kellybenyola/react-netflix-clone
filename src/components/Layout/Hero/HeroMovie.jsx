import "./Hero.scss";
import _ from "lodash";
import { useURL } from "../../../Utils/hooks/use-url";
import Button from "../Button/Button";
import { GrPlayFill } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BsVolumeMute, BsVolumeDown } from "react-icons/bs";
import { useState, useEffect } from "react";
import HTTP from "../../../Utils/https/https";

const HeroMovie = ({ movie, type }) => {
  const movieURL = useURL(`w1280${movie.backdrop_path}`);
  const [volumeOn, setVolumeOn] = useState(false);
  const [movieRating, setMovieRating] = useState([]);

  useEffect(() => {
    if (type === "movie") {
      async function fetchData() {
        const { results } = (
          await HTTP.get(
            `/${movie.media_type || type}/${movie.id}/release_dates`
          )
        ).data;
        results.filter((movie) => {
          if (movie.iso_3166_1 === "US") {
            setMovieRating(
              movie.release_dates[0].certification !== ""
                ? movie.release_dates[0].certification
                : movie.release_dates[1].certification
            );
          }
        });
      }
      fetchData();
    }
    if (type === "tv") {
      async function fetchData() {
        const { results } = (await HTTP.get(`/tv/${movie.id}/content_ratings`))
          .data;
        setMovieRating(results.filter((movie) => movie.iso_3166_1 === "US"));
      }
      fetchData();
    }
  }, []);



  return (
    <div
      className="heroMovie"
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0, 0) 0%, rgba(0,0,0,1) 100%), url(${movieURL})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}
      key={movie}
    >
    
      <div  className="infoContainer">
        <section   className="topMovieInfo">
          <div>
            <h1>
              {movie.title
                ? movie.title.toUpperCase()
                : movie.original_title.toUpperCase()}
            </h1>
          </div>
          <div className="overview">
            <p>{movie.overview}</p>
          </div>
        </section>

        <section className="bottomMovieInfo">
          <div className="left btnSection">
            <Button btnStyles="playBtn" isDisabled={false}>
              <GrPlayFill /> <p>Play</p>
            </Button>
            <Button btnStyles="infoBtn" isDisabled={false}>
              <IoIosInformationCircleOutline />
              <p>More Info</p>
            </Button>
          </div>

          <div className="right ratingSection">
            <div
              onClick={() => {
                setVolumeOn((prev) => !prev);
              }}
              className="volume"
            >
              {volumeOn ? <BsVolumeMute /> : <BsVolumeDown />}
            </div>
            {movieRating.length > 0 && (
              <div className="rating">
                <span>
                  {type !== "movie"
                    ? movieRating.map((movie) => movie.rating)
                    : movieRating}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroMovie;
