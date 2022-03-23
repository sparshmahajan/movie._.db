import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/UI/Main';
import CommonPage from './components/pages/CommonPage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Details_movie from './components/UI/Details_movie';
import ErrorPage from './components/pages/ErrorPage';
import CardHolder from './components/UI/CardHolder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/trending_movies" element={<CommonPage title='trending movies' type='movie' />} />
        <Route path="/trending_tv" element={<CommonPage title='trending tv shows' type='tv' />} />
        <Route path="/latest_movies" element={<CommonPage title='latest movies' type='movie' />} />
        <Route path='/latest_tv' element={<CommonPage title='latest tv shows' type='tv' />} />
        <Route path='/popular_movies' element={<CommonPage title='popular movies' type='movie' />} />
        <Route path='/popular_tv' element={<CommonPage title='popular tv shows' type='tv' />} />
        <Route path='/top_rated_movies' element={<CommonPage title='top rated movies' type='movie' />} />
        <Route path='/top_rated_tv' element={<CommonPage title='top rated tv shows' type='tv' />} />
        <Route path='/upcoming_movies' element={<CommonPage title='upcoming movies' type='movie' />} />
        <Route path='/on_the_air' element={<CommonPage title='on the air tv shows' type='tv' />} />
        <Route path='/search/:name' element={<CommonPage title='search results for ' />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/details_movie/:id' element={<Details_movie />} />
        <Route path='/similar_movie/:id' element={<CardHolder title='Similar Movies' type='movie' />} />
        <Route path='/similar_tv/:id' element={<CardHolder title='Similar Tv Shows' type='tv' />} />
        <Route path='/recommended_movie/:id' element={<CardHolder title='Recommended Movies' type='movie' />} />
        <Route path='/recommended_tv/:id' element={<CardHolder title='Recommended Tv Shows' type='tv' />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
