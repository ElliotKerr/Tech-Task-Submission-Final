"use client";
import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList";
import axios from "axios";
import PageChanger from "./components/PageChanger";
import { useSearchParams } from "next/navigation";

// function defining the home page for the app
export default function Home() {
  // using "useState" to hold data and update it easily later on. Initialising for multiple variables.
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setcurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
  );
  const [nextPageUrl, setnextPageUrl] = useState("");
  const [previousPageUrl, setpreviousPageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // using "useEffect" to manage mass updates of our state variables, including URL and pokemon updates.
  useEffect(() => {
    setLoading(true);
    // fetches the data from the API, then changes all states to the values necessary
    axios.get(currentPageUrl).then((res) => {
      setLoading(false);
      setnextPageUrl(res.data.next);
      setpreviousPageUrl(res.data.previous);
      setPokemon(res.data.results.map((p: { name: any }) => p.name));
    });
  }, [currentPageUrl]);

  // created an if statement to give display "Loading..." if it is taking time to fetch the data from the API. We have given it the same banner so the page doesn't change too much.
  if (loading)
    return (
      <>
        <h1 className="text-center text-8xl pt-10 pb-10 bg-blue-700 text-yellow-500 font-sans">
          Pokemon List
        </h1>
        <p className="text-center text-8xl">Loading...</p>
      </>
    );

  // creating 2 functions, one that will go to the next page if the "next" button is clicked and one that goes to the previous page if "previous" is clicked.
  function gotoPreviousPage() {
    setcurrentPageUrl(previousPageUrl);
    console.log("previous");
  }
  function gotoNextPage() {
    setcurrentPageUrl(nextPageUrl);
    console.log("next");
  }
  // our return for the home function, displaying: A banner, the returns from PageChanger and the returns from PokemonList.
  return (
    <>
      <h1 className="text-center text-8xl pt-10 pb-10 bg-blue-700 text-yellow-500 font-sans">
        Pokemon List
      </h1>
      <div>
        <PageChanger
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPreviousPage={previousPageUrl ? gotoPreviousPage : null}
        />
        <PokemonList pokemon={pokemon}></PokemonList>
      </div>
    </>
  );
}
// "{nextPageUrl ? gotoNextPage : null}" completes an if statement. If the next page exists, then we pass the "gotoNextPage" function, otherwise it will do nothing.
