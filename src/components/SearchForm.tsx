'use client'
import { useSearchContext } from "@/lib/hooks";
import React from "react";

function SearchForm() {
  const { searchQuery, handleSearchQueryChange } = useSearchContext();
  // This component is a simple search form that allows users to input a search query.
  return (
    <form className="size-full ">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e.target.value)}
        className="size-full bg-white/20 outline-none rounded-md px-5 transition focus:bg-white/50 hover:bg-white/30 
        placeholder:text-white/50 "
        placeholder="Search for pets..."

      />
    </form>
  );
}

export default SearchForm;
