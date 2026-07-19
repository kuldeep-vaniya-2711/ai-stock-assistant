// import { FaSearch } from "react-icons/fa";

// function SearchBar() {
//   return (
//     <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

//       <h2 className="text-xl font-semibold mb-4">
//         Search Stock
//       </h2>

//       <div className="flex gap-4">

//         <input
//           type="text"
//           placeholder="Enter Stock Symbol (e.g. RELIANCE.NS)"
//           className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
//         />

//         <button
//           className="bg-cyan-500 hover:bg-cyan-600 transition px-6 rounded-lg font-semibold flex items-center gap-2"
//         >
//           <FaSearch />
//           Search
//         </button>

//       </div>

//     </div>
//   );
// }

// export default SearchBar;

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch, loading }) {
  const [symbol, setSymbol] = useState("");

  const handleSearch = () => {
    if (!symbol.trim()) return;
    onSearch(symbol.toUpperCase());
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-semibold mb-4">
        Search Stock
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="RELIANCE.NS"
          className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 px-6 rounded-lg flex items-center gap-2"
        >
          <FaSearch />
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;