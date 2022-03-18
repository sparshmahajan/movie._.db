import './App.css';
import Navbar from './components/UI/Navbar';
import CardHolder from './components/UI/CardHolder';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CardHolder >MOVIES</CardHolder>
      <CardHolder> TV SHOWS</CardHolder>
    </div>
  );
}

export default App;
