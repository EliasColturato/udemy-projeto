import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './styleFilme.css';

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const img_url = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: 'f0a686780d5aa806012c02a155077ee7',
            language: 'pt-BR',
          },
        })
        .then(response => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log('Filme não encontrado');
        });
    }

    loadFilme();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO');
    };
  });

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes..</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1 className="filme-title">{filme.title}</h1>
      <img
        src={`${img_url}${filme.backdrop_path}`}
        alt={filme.title}
        srcset=""
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>{filme.vote_average} / 10</strong>
      <div className="area-button">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
