import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = React.memo(() => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchPokemons();
    }, [currentPage]);

    const fetchPokemons = () => {
        const offset = (currentPage - 1) * 20
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
        axios
            .get(url)
            .then((res) => {
                const pokemonData = res.data.results;
                setTotalPages(Math.ceil(res.data.count / 20))
                fetchSprites(pokemonData);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    const fetchSprites = (pokemonData) => {
        Promise.all(
            pokemonData.map(async (pokemon) => {
                const response = await axios.get(pokemon.url)
                return response.data;
            })
        )
            .then((pokemonWithSprites) => {
                setData(pokemonWithSprites)
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };

    return (
        <>
            <section>
                <nav className="p-20 pt-8">
                    <h1 className="font-mono text-3xl font-semibold tracking-wider">POKEVERSE</h1>
                </nav>
            </section>
            <section>
                <React.Fragment key={currentPage}>
                    <main className="px-20 grid grid-cols-4">
                        {data !== null && data.map((pokemon) => {
                            return (
                                <>
                                    <div className="w-56 h-64 bg-slate-400 p-6 m-3" key={pokemon.id}>
                                        <img className="w-42 h-36 mx-auto" src={pokemon.sprites.front_default} alt={pokemon.name} />
                                        <h3 className="text-center mt-3 mb-4">{pokemon.name}</h3>
                                        <button className="float-right border rounded-lg px-3 py-[2px] text-[12px]">Details</button>
                                    </div>
                                </>
                            )
                        })}
                    </main>
                </React.Fragment>
                <div className="flex justify-between mx-[7.5rem] my-10">
                    <h1 className="font-mono text-lg">Current Page : {currentPage}</h1>
                    <div>
                        <button
                            className="px-4 py-2 rounded-lg mr-2 border disabled:bg-gray-200 hover:bg-slate-400"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="px-7 py-2 rounded-lg border hover:bg-slate-400"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
});

export default Home;
