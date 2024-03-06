import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>Don't have an account? <Link to={"/Register"}>Register</Link></div>
      <div>Have an account? <Link to={"/Login"}>Login</Link></div>
    </div>
  );
}

export default App;
