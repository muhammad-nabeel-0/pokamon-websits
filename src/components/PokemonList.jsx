import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import "./PokemonCard.css";
import ReactPaginate from "react-paginate";

const PokemonList = ({ pokemonList }) => {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    // **Search Filter**
    const filteredPokemon = pokemonList.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    // **Pagination Logic**
    const pageCount = Math.ceil(filteredPokemon.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredPokemon.slice(startIndex, endIndex);

    return (
        <section className="container">
            <header>
                <h1>Let's Catch Pokémon</h1>
            </header>
            <div className="pokemon-search">
                <input
                    type="text"
                    placeholder="Search Pokemon..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>

            {/* Pokémon List */}
            <ul className="cards">
                {currentItems.map((item) => (
                    <PokemonCard key={item.id} pokamonData={item} />
                ))}
            </ul>

            {/* Pagination Controls */}
            {pageCount > 1 && (
                <ReactPaginate className="page-list"
                    previousLabel={"← Prev"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={({ selected }) => setCurrentPage(selected)}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            )}
        </section>
    );
};

export default PokemonList;
