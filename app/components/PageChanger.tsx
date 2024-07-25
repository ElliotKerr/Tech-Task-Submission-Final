import React from "react";

// PageChanger takes 2 functions as inputs and creates buttons which will move to the next set of pokemon or the previous.
export default function PageChanger({ gotoNextPage, gotoPreviousPage }: any) {
  return (
    <div>
      {gotoPreviousPage && (
        <button
          className="absolute start-12 top-14 border-4 px-3 py-3 border-blue-200 bg-blue-200 rounded font-sans font-bold"
          onClick={gotoPreviousPage}
        >
          Previous <br />
          Pokemon
        </button>
      )}
      {gotoNextPage && (
        <button
          className="absolute end-12 top-14 border-4 px-3 py-3 border-blue-200 bg-blue-200 rounded font-sans font-bold"
          onClick={gotoNextPage}
        >
          Next <br />
          Pokemon
        </button>
      )}
    </div>
  );
}
// "gotoPreviousPage &&" is another if statement. This one says that if gotoPreviousPage is null, the button is not displayed. This is the case for the first set of pokemon.
