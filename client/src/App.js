import './App.css';
import { Routes, Route } from 'react-router-dom';
import SentenceWrite from './views/sentenceWrite';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/write' element={<SentenceWrite></SentenceWrite>}></Route>
      </Routes>
    </div>
  );
}

export default App;
