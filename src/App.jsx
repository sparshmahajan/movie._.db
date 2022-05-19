import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {

  const Main = React.lazy(() => import('./components/UI/Main'));
  const CommonPage = React.lazy(() => import('./components/pages/CommonPage'));
  const SignIn = React.lazy(() => import('./components/pages/SignIn'));
  const SignUp = React.lazy(() => import('./components/pages/SignUp'));
  const Details = React.lazy(() => import('./components/pages/Details'));
  const ErrorPage = React.lazy(() => import('./components/pages/ErrorPage'));
  const WatchList = React.lazy(() => import('./components/pages/WatchList'));

  const loggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/trending_movies" element={<CommonPage title='trending movies' type='movie' />} />
          <Route path="/trending_tv" element={<CommonPage title='trending tv shows' type='tv' />} />
          <Route path='/popular_movies' element={<CommonPage title='popular movies' type='movie' />} />
          <Route path='/popular_tv' element={<CommonPage title='popular tv shows' type='tv' />} />
          <Route path='/top_rated_movies' element={<CommonPage title='top rated movies' type='movie' />} />
          <Route path='/top_rated_tv' element={<CommonPage title='top rated tv shows' type='tv' />} />
          <Route path='/upcoming_movies' element={<CommonPage title='upcoming movies' type='movie' />} />
          <Route path='/on_the_air' element={<CommonPage title='on the air tv shows' type='tv' />} />
          <Route path='/search/:name' element={<CommonPage title='search results for ' />} />
          {!loggedIn && <Route path='/signin' element={<SignIn />} />}
          {!loggedIn && <Route path='/signup' element={<SignUp />} />}
          <Route path='/details_movie/:id' element={<Details />} />
          <Route path='/details_tv/:id' element={<Details />} />
          <Route path='/similar_movies/:id' element={<CommonPage title='Similar Movies' type='movie' />} />
          <Route path='/similar_tv/:id' element={<CommonPage title='Similar Tv Shows' type='tv' />} />
          <Route path='/recommended_movie/:id' element={<CommonPage title='Recommended Movies' type='movie' />} />
          <Route path='/recommended_tv/:id' element={<CommonPage title='Recommended Tv Shows' type='tv' />} />
          {loggedIn && <Route path='/watchlist' element={<WatchList />} />}
          {!loggedIn && <Route path='/watchlist' element={<SignIn />} />}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
