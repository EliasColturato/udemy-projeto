import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/home';
import Filme from './pages/Filmes/filme';
import Header from './components/Header/header';
import Erro from './pages/Erro/erro';

function RoutesApp() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
