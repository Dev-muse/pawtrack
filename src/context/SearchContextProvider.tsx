"use client";

import React, { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleSearchQueryChange: (newSearch: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

function SearchContextProvider({ children }: SearchContextProviderProps) {
  // state to manage pets and selected pet ID
  const [searchQuery, setsearchQuery] = useState("");
  //derives the selected pet from the list of pets

  // function to handle selection of a pet by ID
  const handleSearchQueryChange = (newSearch: string) => {
    setsearchQuery(newSearch);

  };
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleSearchQueryChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
