import Link from "next/link";
import React from "react";

// Takes our list of pokemon from the API and displays it in a list.
export default function PokemonList({ pokemon }: any) {
  return (
    <>
      <div>
        {pokemon.map((p: any) => (
          <div className="capitalize text-center text-xl font-sans" key={p}>
            {/* Adding a link to the page.tsx in the pokemon folder that takes the pokemon name with it. */}
            <Link
              href={{
                pathname: "/pokemon",
                query: { pokemon: p },
              }}
            >
              {p}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
