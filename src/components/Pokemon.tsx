import { useEffect, useState } from 'react';

import { axiosPokemon } from '../services/pokemon';
import { useAxios } from '../hooks/useAxios';
import './style.scss';

export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  }
}

export function Pokemon() {
  const { response: { data: pokemon } = { data: null }, error, loading, axiosFetch } = useAxios<Pokemon>();
  const [reload, setReload] = useState(1);

  useEffect(() => {
    axiosFetch({
      axiosInstance: axiosPokemon,
      requestConfig: {
        url: `${reload}`
      }
    })
  }, [reload]);

  return (
    <article>
      <h2>Pokemons</h2>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && pokemon && (
        <div className='container-pokemon'>
          <div>
            <p style={{ textTransform: 'capitalize' }}>{pokemon?.name}</p>
            <img src={pokemon.sprites.front_default} />
          </div>
          <div>
            <p>Shiny</p>
            <img src={pokemon.sprites.front_shiny} />
          </div>
        </div>
      )}
      <button onClick={() => setReload(prev => prev + 1)}> Get next </button>
    </article>
  );
}