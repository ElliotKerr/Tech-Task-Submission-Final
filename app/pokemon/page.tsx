"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function pokemonPage() {
  // Using useSearchParams() allows us to take the information from the link in PokemonList and use the name of the pokemon here.
  const searchParams = useSearchParams();
  const pokemonName = searchParams.get("pokemon");

  // Uses string concatenation to make the url for the pokemon. Then setting the states for the information I want to display.
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
  const [abilities, setAbilities] = useState([]);
  const [id, setId] = useState();
  const [stats, setStats] = useState([]);
  const [sprite, setSprite] = useState([]);

  // using useEffect to obtain the data from the url and setting our state information.
  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setId(res.data.id);
      setAbilities(
        res.data.abilities.map((p: { ability: any }) => p.ability.name)
      );
      setStats(
        res.data.stats.map((poke: any) => [poke.stat.name, poke.base_stat])
      );
      setSprite(res.data.sprites.front_default);
    });
  }, [url]);

  return (
    <>
      <h1 className="text-center text-8xl pt-10 pb-10 bg-blue-700 text-yellow-500 font-sans">
        Pokemon List
      </h1>
      {/* Creating a link to return to the start of the Pokemon List */}
      <Link
        href="/"
        className="absolute start-12 top-14 border-4 px-3 py-3 border-blue-200 bg-blue-200 rounded font-sans font-bold"
      >
        Back to List
      </Link>
      {/* Displays the sprite */}
      <img src={sprite} className=" mx-auto h-64" />
      {/* Displays the Name*/}
      <h2 className="capitalize font-sans text-4xl text-center">
        {pokemonName}
      </h2>
      {/* Displays the Pokedex Number*/}
      <p className="font-sans text-2xl text-center">Pokedex Number: {id}</p>
      <br />
      {/* Displays the Abilities in an unordered list*/}
      <p className="font-sans text-2xl text-center">Abilities:</p>
      <ul>
        {abilities.map((ability: any) => (
          <li className="capitalize text-center">{ability}</li>
        ))}
      </ul>
      <br />
      {/* Displays the Stats in an unordered list*/}
      <p className="font-sans text-2xl text-center">Stats:</p>
      <ul>
        {stats.map((stat: any) => (
          <li className="capitalize text-center">
            {stat[0]} : {stat[1]}
          </li>
        ))}
      </ul>
    </>
  );
}
