import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = React.memo(() => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = () => {
    setLoading(true);
    const offset = (currentPage - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`;
    axios
      .get(url)
      .then((res) => {
        const pokemonData = res.data.results;
        setTotalPages(Math.ceil(res.data.count / 20));
        fetchSprites(pokemonData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSprites = (pokemonData) => {
    Promise.all(
      pokemonData.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        return response.data;
      })
    )
      .then((pokemonWithSprites) => {
        setData(pokemonWithSprites);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <section>
        <React.Fragment key={currentPage}>
          <main className="px-4 mr-6 md:px-10 lg:px-20 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              <div className="animate-spin w-full h-full flex items-center justify-center"></div>
            ) : (
              data !== null &&
              data.map((pokemon) => {
                return (
                  <div
                    className="w-full h-[17rem] bg-slate-600 p-6 m-3 rounded-xl"
                    key={pokemon.id}
                  >
                    <img
                      className="w-42 h-32 mx-auto"
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                    />
                    <h3 className="text-center mt-3 mb-1">{pokemon.name}</h3>
                    <div className="flex justify-center">
                      {pokemon.types.map((poketype) => {
                        return (
                          <p
                            className="px-1 mx-1 bg-slate-500 rounded-lg"
                            key={poketype.type.slot}
                          >
                            {poketype.type.name}
                          </p>
                        );
                      })}
                    </div>
                    <button
                      className="float-right border rounded-lg px-3 py-[2px] text-[12px] mt-4"
                      onClick={() =>
                        navigate(`details/pokemon/${pokemon.id}`)
                      }
                    >
                      Details
                    </button>
                  </div>
                );
              })
            )}
          </main>
        </React.Fragment>
        <div className="flex flex-col sm:flex-row sm:justify-between mx-[6rem] sm:mx-[4rem] my-10">
          <h1 className="font-mono text-lg text-center sm:text-left">Current Page: {currentPage}</h1>
          <div>
            <button
              className="px-4 py-2 rounded-lg mr-2 border disabled:bg-gray-400 hover:bg-slate-400"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-7 py-2 rounded-lg border hover:bg-slate-800"
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

Home.displayName = "Home";

export default Home;
