
import { useState } from "react";
import HTTP from "../https/https";
import _ from 'lodash';

export const useGetVideo = async(movie, type) =>{
    const [isExpanded, setIsExpanded] = useState(false);
    const [trailerId, setTrailerId] = useState('');
    const [isError, setIsError] = useState(false);

      const { results } = (await HTTP.get(`/${movie.media_type|| type}/${movie.id}/${movie.id}/videos`)).data;
      if (results.length === 0) {
        setIsError(true);
        return _.delay(() => setIsError(false), 3000);
      }
      setIsExpanded(!isExpanded);
      setTrailerId(results[0].key);
//         const [isExpanded, setIsExpanded] = useState(false);
//   const [trailerId, setTrailerId] = useState('');
//   const [isError, setIsError] = useState(false);

//   const handleGetVideos = async () => {
//     const { results } = (await HTTP.get(`/${movie.media_type || type}/${movie.id}/videos`)).data;
//     if (results.length === 0) {
//       setIsError(true);
//       return _.delay(() => setIsError(false), 3000);
//     }
//     setIsExpanded(!isExpanded);
//     setTrailerId(results[0].key);
//   }
    return{
        isExpanded,
        trailerId,
        isError,
   
    }
}


