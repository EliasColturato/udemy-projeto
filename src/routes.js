import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home';
import Filme from './pages/Filmes/filme';
import Header from './components/Header/header';

function RoutesApp() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
