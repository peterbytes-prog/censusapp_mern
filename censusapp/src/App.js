import logo from './logo.svg';
import './App.css';
import Census from './component/Census';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
      <p>
        <Census />
      </p>
      </div>
    </div>
  );
}

export default App;
