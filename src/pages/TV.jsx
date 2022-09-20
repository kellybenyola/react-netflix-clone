import React, {useState} from 'react';
import _ from 'lodash';
import Body from '../components/Layout/Body/Body';
import Hero from '../components/Layout/Hero/Hero';
import MovieList from '../components/UI/MovieList/MovieList';

import tvRoutes from '../Utils/routes/tv-routes';


export default function TV() {
    const movieCategories = _.orderBy(tvRoutes, ['order'], ['asc']);

    return (
      <>
        
      <Hero pgTitle='TV Shows' genres='true' />
      <Body>
      {movieCategories.map(({category, type, url}) => {
        return <MovieList key={category} category={category} type={type} url={url} />;
      })}
      </Body>
    </>
    );
  }