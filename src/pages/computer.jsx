import React, { useState, useEffect } from "react";
import closeLogo from "../assets/close-logo.png";

const Computer = React.memo(() => {
  const [catchedData, setCatchedData] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const onClickDelete = () => {
    setShowDeleteIcon(!showDeleteIcon);
  };

  const onDeletePokemon = (id) => {
    const updatedData = catchedData.filter((pokemon) => pokemon.id !== id);
    setCatchedData(updatedData);
    sessionStorage.setItem("catched", JSON.stringify(updatedData));
  };

  const onClickDeleteAll = () => {
    setCatchedData([]);
    sessionStorage.removeItem("catched");
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("catched")) || [];
    setCatchedData(data);
  }, []);

  return (
    <section className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {catchedData.length === 0 ? (
        <div className="col-span-full mx-auto mt-12 text-xl">No Pokémon caught yet!</div>
      ) : (
        catchedData.map((pokemonList) => (
          <div
            className="bg-slate-500 mb-10 flex flex-col items-center justify-between rounded-xl"
            key={pokemonList.id}
          >
            <div className="mt-4">
              <h1 className="text-2xl font-semibold text-center">{pokemonList.name}</h1>
              <div className="flex justify-center">
                {pokemonList.types.map((poketype) => (
                  <p className="px-3 mx-1 bg-slate-700 rounded-lg" key={poketype.type.slot}>
                    {poketype.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <img
                className=""
                src={pokemonList.sprites.front_default}
                alt={pokemonList.name}
              />
            </div>
            {showDeleteIcon && (
              <button
                className="w-8 h-8 mt-2"
                onClick={() => onDeletePokemon(pokemonList.id)}
              >
                <img src={closeLogo} alt="close-button" />
              </button>
            )}
          </div>
        ))
      )}
      {catchedData.length > 0 && (
        <div className="col-span-full flex justify-center mt-6">
          <button
            className="bg-red-500 mx-2 px-4 py-2 rounded-lg"
            onClick={onClickDelete}
          >
            {showDeleteIcon ? "Cancel" : "Release Pokemon"}
          </button>
          <button
            className="bg-red-500 mx-2 px-4 py-2 rounded-lg"
            onClick={onClickDeleteAll}
          >
            Release All Pokemon
          </button>
        </div>
      )}
    </section>
  );
});

Computer.displayName = "Computer";

export default Computer;
