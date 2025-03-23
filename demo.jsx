import React, { useEffect, useState, useRef } from 'react';
import PokemonCard from './PokemonCard';
import './PokemonCard.css';
import LoadingBar from 'react-top-loading-bar'; // Import the package

const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=649";
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const loadingBarRef = useRef(null); // Ref for the loading bar

    const fetchPokemonData = async () => {
        try {
            loadingBarRef.current.continuousStart(); // Start loading bar
            const res = await fetch(API);
            const data = await res.json();

            const pokemonData = await Promise.all(
                data.results.map(async (item) => {
                    const res = await fetch(item.url);
                    return res.json();
                })
            );

            setPokemonList(pokemonData);
            setLoading(false);
            loadingBarRef.current.complete(); // Complete loading bar
        } catch (error) {
            setError(error);
            setLoading(false);
            loadingBarRef.current.complete(); // Complete loading bar in case of error
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);

    const filteredPokemon = pokemonList
        .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    if (error) {
        return (
            <div className='error-box'>
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    return (
        <section className='container'>
            {/* React Top Loading Bar */}
           

            <header>
                <h1>Let's Catch Pokémon</h1>
            </header>
            <div className='pokemon-search'>
                <input
                    type="text"
                    placeholder='Search Pokémon...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {loading ? (
                <div className='loader'></div>
            ) : (
                <ul className='cards'>
                    {filteredPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemonData={pokemon} />
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Pokemon;
