import { Link } from 'react-router-dom';
import './styleErro.css';

function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link to="/" className="botao">
        {' '}
        Home Page
      </Link>
    </div>
  );
}

export default Erro;
