import logo from './logo.svg';
import './App.css';
import SignupPage from './signUp';
import SubmitScore from './submitScore';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <SubmitScore score={100}></SubmitScore>
      </header>
    </div>
  );
}

export default Home;