import logo from './logo.svg';
import './App.css';
import MemoryCards from "./MemoryCards.jsx"
const App = () =>{

   return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

        <p>
        Игра "Память"
        </p>
        <a
          className="App-link"
          href="https://git.crtweb.ru/creative/frontend-tests/-/tree/master"
          target="_blank"
          rel="noopener noreferrer"
        >
           Репозиторий 
        </a>
      </header>
      <main>
        <MemoryCards />
        </main>
    </div>
  );
}

export default App;
