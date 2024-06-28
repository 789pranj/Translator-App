import logo from './logo.svg';
import './App.css';
import Translator from './components/Translator';

function App() {
  return (
    <div className="container w-full bg-white rounded-lg p-10 shadow-md border border-slate-50">
      <Translator></Translator>
    </div>
  );
}

export default App;
