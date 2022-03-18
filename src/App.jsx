import './App.css';
import Navbar from './components/UI/Navbar';
import CardHolder from './components/UI/CardHolder';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CardHolder >trending movies</CardHolder>
      <CardHolder>trending tv shows</CardHolder>
      <CardHolder>latest movies</CardHolder>
      <CardHolder>latest tv shows</CardHolder>
      <CardHolder>popular movies</CardHolder>
      <CardHolder>popular tv shows</CardHolder>
      <CardHolder>top rated movies</CardHolder>
      <CardHolder>top rated tv shows</CardHolder>
      <CardHolder>upcoming movies</CardHolder>
      <CardHolder>on the air tv shows</CardHolder>
    </div>
  );
}

export default App;
