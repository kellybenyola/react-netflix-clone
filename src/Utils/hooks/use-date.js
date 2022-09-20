
export const useDate = (releaseDate) =>{
    const movieDate = new Date(releaseDate)
    const options = { month: 'long'};
    const movieMonth = new Intl.DateTimeFormat('en-US', options).format(movieDate);
    const movieDay = movieDate.getDate()
    const movieYear  = movieDate.getFullYear()
    const formattedDate = `${movieMonth} ${movieDay}, ${movieYear}`

    return formattedDate
}