import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/UI/Main';
import CardHolder from './components/UI/CardHolder';

function App() {

  return (
    <Routes>

      <Route path="/" element={<Main />} />
      <Route path="/trending_movies" element={<CardHolder title='trending movies' type='movie' />} />
      <Route path="/trending_tv" element={<CardHolder title='trending tv shows' type='tv' />} />
      <Route path="/latest_movies" element={<CardHolder title='latest movies' type='movie' />} />
      <Route path="/latest_tv" element={<CardHolder title='latest tv shows' type='tv' />} />
      <Route path='/latest_tv' element={<CardHolder title='latest tv shows' type='tv' />} />
      <Route path='/popular_movies' element={<CardHolder title='popular movies' type='movie' />} />
      <Route path='/popular_tv' element={<CardHolder title='popular tv shows' type='tv' />} />
      <Route path='/top_rated_movies' element={<CardHolder title='top rated movies' type='movie' />} />
      <Route path='/top_rated_tv' element={<CardHolder title='top rated tv shows' type='tv' />} />
      <Route path='/upcoming_movies' element={<CardHolder title='upcoming movies' type='movie' />} />
      <Route path='/on_the_air' element={<CardHolder title='on the air tv shows' type='tv' />} />

    </Routes>


  );
}

export default App;
