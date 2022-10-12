import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './homeSyle.css';

//https://api.themoviedb.org/3/movie/now_playing?api_key=f0a686780d5aa806012c02a155077ee7&language=pt-BR&page=1

function Home() {
  const [filmes, setFilmes] = useState([]);
  const img_url = 'https://image.tmdb.org/t/p/w500';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'f0a686780d5aa806012c02a155077ee7',
          language: 'pt-BR',
          page: 1,
        },
      });
      //console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 10));
    }
    loadFilmes();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Carregando filmes...</div>;
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map(filme => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`${img_url}${filme.poster_path}`} alt={filme.title} />
              <Link to={`/filme/${filme.id}`}>Acesar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
