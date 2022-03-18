import './App.css';
import Navbar from './components/UI/Navbar';
import CardHolder from './components/UI/CardHolder';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CardHolder >trending movies</CardHolder>
      <CardHolder>trending tv shows</CardHolder>
      {/* <CardHolder>search results for Anohana</CardHolder> */}
    </div>
  );
}

export default App;
