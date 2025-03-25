import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import PokemonList from "./PokemonList";
import git Loader from "./SkeletonLoader";  // Import Skeleton Loader
import "./PokemonList.css";
import toast, { Toaster } from "react-hot-toast";

const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=649";
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingBar, setLoadingBar] = useState(0);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const apiData = async () => {
        try {
            setLoadingBar(30);
            const loadingToast = toast.loading("📡 Data is loading...",{
                className: "big-toast",
            });
            const res = await fetch(API);
            const data = await res.json();
            setLoadingBar(60);

            const pokemonData = data.results.map(async (item) => {
                const res = await fetch(item.url);
                return await res.json();
            });

            const finalData = await Promise.all(pokemonData);
            setPokemonList(finalData);
            setLoading(false);
            setLoadingBar(100);
            toast.dismiss(loadingToast);  // ✅ Remove Loading Toast
            toast.success("✅ Data loaded successfully!",{
                className: "big-toast",
            });

            setTimeout(() => setLoadingBar(0), 500);
        } catch (error) {
            setLoading(false);
            setError(error);
            setLoadingBar(100);
            toast.dismiss();
            toast.error("❌ Failed to load Pokémon!");
            setTimeout(() => setLoadingBar(0), 500);
        }
    };

    useEffect(() => {
        apiData();
    }, []);

    const handlePageChange = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <Toaster position="top-right" reverseOrder={false} className =  "big-toast" />

            <LoadingBar color="#D84040" progress={loadingBar} height={4} onLoaderFinished={() => setLoadingBar(0)} />

            {loading ? <SkeletonLoader /> : <PokemonList pokemonList={pokemonList} onPageChange={handlePageChange} />}
        </>
    );
};

export default Pokemon;