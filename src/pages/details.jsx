import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Details = React.memo(() => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gacha, setGacha] = useState('failed to catch');

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        console.log(res.data);
        setPokemonData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!pokemonData) {
    return null; // You can render a loading indicator here
  }

  const { name, sprites, types, weight, height, abilities, moves, stats } = pokemonData;

  const handleCatchClick = () => {
    let gacha = Math.random();
    if (gacha < 0.5) {
      setGacha('successful to catch');
    } else {
      setGacha('failed to catch');
    }
    setShowModal(true);
  };

  const onStoreComputer = () => {
    const catchedData = JSON.parse(sessionStorage.getItem("catched")) || [];
    catchedData.push(pokemonData);
    sessionStorage.setItem("catched", JSON.stringify(catchedData));
    setShowModal(false);
  };

  return (
    <>
      <section className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <div className="bg-slate-500 p-10 rounded-xl mb-8">
            <img src={sprites.front_default} alt={name} className="w-72 h-auto mx-auto" />
            <h1 className="text-3xl font-bold text-center mb-4">{name}</h1>
            <div className="mb-8">
              <ul className="flex justify-center">
                {types.map((type) => (
                  <li className="px-3 mx-2 bg-slate-600 rounded-xl" key={type.slot}>
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Weight:</h2>
                <p>{weight}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Height:</h2>
                <p>{height}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Abilities:</h2>
                <ul>
                  {abilities.map((ability) => (
                    <li key={ability.slot}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold">Stats:</h2>
                <ul>
                  {stats.map((stat) => (
                    <li key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <button
            className="px-10 border-2 border-slate-600 py-2 text-lg rounded-lg w-min h-min hover:bg-slate-600"
            onClick={handleCatchClick}
          >
            Catch
          </button>
        </div>

        <div className="mb-10">
          <h2 className="text-xl text-center sm:text-left font-bold mb-6">Available Moves:</h2>
          <ul className="ml-8 sm:ml-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {moves.map((move) => (
              <li key={move.move.name}>{move.move.name}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-500 p-8 rounded-lg">
            {gacha === 'successful to catch' ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Caught Pokemon!</h2>
                <p>{gacha} {name}!</p>
                <button
                  className="px-4 py-2 mt-4 mx-1 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 mt-4 mx-1 bg-green-500 hover:bg-green-700 text-white rounded-lg"
                  onClick={() => onStoreComputer()}
                >
                  Store in Computer
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">Pokemon Flee!</h2>
                <p>{gacha} {name}!</p>
                <button
                  className="px-4 py-2 mt-4 mx-1 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});

Details.displayName = "Details";

export default Details;
