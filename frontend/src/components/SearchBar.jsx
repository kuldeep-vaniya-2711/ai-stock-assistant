import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, loading }) {
  const [symbol, setSymbol] = useState("");

  const handleSearch = () => {
    const cleanedSymbol = symbol.trim().toUpperCase();

    if (!cleanedSymbol || loading) {
      return;
    }

    onSearch(cleanedSymbol);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleChange = (event) => {
    setSymbol(event.target.value);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 sm:p-6 shadow-lg">

      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          🔎 Search Stock
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Enter a stock symbol to view analysis and market data.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

        <input
          type="text"
          value={symbol}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="RELIANCE.NS"
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
          aria-label="Stock symbol"
          className="
            flex-1
            rounded-lg
            bg-slate-800
            border
            border-slate-700
            px-4
            py-3
            text-white
            placeholder-slate-500
            outline-none
            transition
            focus:border-cyan-400
            focus:ring-1
            focus:ring-cyan-400
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading || !symbol.trim()}
          className="
            bg-cyan-500
            hover:bg-cyan-600
            disabled:bg-slate-700
            disabled:text-slate-500
            disabled:cursor-not-allowed
            px-6
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            font-semibold
            transition
            min-w-[120px]
          "
        >
          <FaSearch />

          {loading ? "Loading..." : "Search"}
        </button>

      </div>

      <p className="text-xs text-slate-500 mt-3">
        Example: RELIANCE.NS, TCS.NS, INFY.NS
      </p>

    </div>
  );
}

export default SearchBar;