import './App.css';
import { Routes, Route } from 'react-router-dom';
import SentenceWrite from './views/sentenceWrite';
import Main from './views/main';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/write' element={<SentenceWrite></SentenceWrite>}></Route>
      </Routes>
    </div>
  );
}

export default App;
