import './App.css';
import Header from './components/header/Header';
import Card from './components/header/Card';
import Cards from './components/header/Cards'

function App() {
  return (
    <div className="App">
      <Header/>
      <Cards summary={true}/>
    </div>
  );
}

export default App;
