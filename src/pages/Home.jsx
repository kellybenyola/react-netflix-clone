import React from 'react';
import _ from 'lodash';
import Body from '../components/Layout/Body/Body';
import Hero from '../components/Layout/Hero/Hero';
import MovieList from '../components/UI/MovieList/MovieList';
import movieRoutes from '../Utils/routes/movie-routes';
import NavBar from '../components/Layout/NavBar/NavBar';

export default function Home() {
    const movieCategories = _.orderBy(movieRoutes, ['order'], ['asc']);
  
    return (
      <>
        
      <Hero />
      <Body>
      {movieCategories.map(({category, type, url}) => {
        return <MovieList key={category} category={category} type={type} url={url} />;
      })}
      </Body>
    </>
    );
  }