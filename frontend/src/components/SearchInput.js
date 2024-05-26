import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-sky-500 text-white">
        <IoSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
