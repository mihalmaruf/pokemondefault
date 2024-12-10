import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link, useLocation } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) return pokemons;
    return pokemons.filter(pkmn => pkmn.name.toLowerCase().includes(searchTerm));
  }, [pokemons, searchTerm]);

  return (
    <div className={classes.root}>
      <input 
        type="text" 
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
        className={classes.input}
      />
      {loading && <div>Loading...</div>}
      <div className={classes.gridContainer}>
        {filteredPokemons.map((pkmn) => (
          <Link key={pkmn.id} to={`/pokemon/${pkmn.id}`} state={{ background: location }} className={classes.link}>
            <div className={`${classes.pokemonItem} ${classes.pokemonItemHover}`} >
              <p className={classes.pokemonName}>{pkmn.name}</p>
              <p className={classes.pokemonNumber}>{pkmn.number}</p>
              <img 
                src={pkmn.image} 
                alt={pkmn.name} 
                className={classes.pokemonImage}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      justifyContent: 'center',
    },
    pokemonItem: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      height: '40vh',
    },
    pokemonItemHover: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      '&:hover': {
        backgroundColor: 'purple',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        transform: 'translateY(-5px)',
      }
    },
    pokemonName: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    pokemonNumber: {
      fontSize: '14px',
      color: '#fff',
      marginBottom: '8px',
    },
    pokemonImage: {
      width: '100%',
      height: 'auto',
    },
    input: {
      width: '97%',
      padding: '10px 15px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
      color: "#000",
      marginBottom: '5vh'
    },
    link: {
      textDecoration: 'none',
    }
  },
  { name: 'PokemonList' }
);
