import { Fragment } from 'react';
import MainHeader from './components/Layout/MainHeader';
import Home from './pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Fragment>
      <MainHeader/>
      <main>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
