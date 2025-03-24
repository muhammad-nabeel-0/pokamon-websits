import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import PokemonList from "./PokemonList";
import "./PokemonList.css";

const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=649";
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingBar, setLoadingBar] = useState(0);

    const apiData = async () => {
        try {
            setLoadingBar(30); // Start loading
            const res = await fetch(API);
            const data = await res.json();
            setLoadingBar(60); // Mid progress

            const pokemonData = data.results.map(async (item) => {
                const res = await fetch(item.url);
                return await res.json();
            });

            const finalData = await Promise.all(pokemonData);
            setPokemonList(finalData);
            setLoading(false);
            setLoadingBar(100); // Complete

            setTimeout(() => setLoadingBar(0), 500); // Reset after 0.5s
        } catch (error) {
            setLoading(false);
            setError(error);
            setLoadingBar(100);
            setTimeout(() => setLoadingBar(0), 500); // Reset after error
        }
    };

    useEffect(() => {
        apiData();
    }, []);

    const handlePageChange = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return (
            <>
                <LoadingBar color="#D84040" progress={loadingBar} height={4} onLoaderFinished={() => setLoadingBar(0)} />
                <div className="loader"></div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <LoadingBar color="#D84040" progress={loadingBar} height={4} onLoaderFinished={() => setLoadingBar(0)} />
                <div className="error-box">
                    <h1>Error: {error.message}</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <LoadingBar color="#D84040" progress={loadingBar} height={4} onLoaderFinished={() => setLoadingBar(0)} />
            <PokemonList pokemonList={pokemonList} onPageChange={handlePageChange} />
        </>
    );
};

export default Pokemon;
