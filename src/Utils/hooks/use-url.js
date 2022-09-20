const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const useURL = (path) =>{
    const url = ('https://image.tmdb.org/t/p/' + path)
    return url
}

export const useRequest = (movieID) =>{
    const url = ('https://api.themoviedb.org/3/movie/'+ movieID +'/release_dates?api_key=' + API_KEY)
    return url
}