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
      <div>
        <Census />
      </div>
      </div>
    </div>
  );
}

export default App;
