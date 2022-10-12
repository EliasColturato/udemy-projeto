import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './styleFilme.css';
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();

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
          navigation('/', { replace: true });
          return;
        });
    }

    loadFilme();
  }, [navigation, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      filmesSalvos => filmesSalvos.id === filme.id
    ); //verifica se dentro da nossa array se já existe algum item com o mesmo id que o usuario está tentando usar

    if (hasFilme) {
      toast.warn('Esse filme já está na sua lista');
      return;
    } //if para caso o filme já exista na lista

    filmesSalvos.push(filme); //caso o filme não exista na lista o push é responsável por adicionar o item a nossa lista
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso');
  }

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
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
            target="_blank"
            rel="noreferrer"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
