import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GoTrash } from "react-icons/go";

function Assets() {
  const [tools, setTools] = useState([]);
  const [selected, setSelected] = useState("id");
  const [filteredTools, setFilteredTools] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/assets/`)
      .then((response) => response.json())
      .then((data) => {
        setTools(data.data.assets);
        setFilteredTools(data.data.assets);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    handleSearch();
  }, [input, selected]);

  const handleSearch = () => {
    const query = input.toLowerCase();
    const filtered = tools.filter(
      (tool) =>
        (selected === "id" && tool.assetID.toString().includes(query)) ||
        (selected === "name" && tool.assetName.toLowerCase().includes(query))
    );
    setFilteredTools(filtered);
  };

  const handleReset = () => {
    setInput("");
    setFilteredTools(tools);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/assets/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // This will throw if the response is HTML (like 404 page)
      const responseData = await response.json();
  
      if (!response.ok) {
        console.error("Delete failed:", responseData);
        throw new Error(responseData.message || "Failed to delete asset");
      }
  
      // Update UI
      setTools((prev) => prev.filter((tool) => tool._id !== _id));
      setFilteredTools((prev) => prev.filter((tool) => tool._id !== _id));
  
      console.log("Deleted:", responseData.message);
    } catch (error) {
      console.error("Error deleting asset:", error.message);
    }
  };
  
  

  return (
    <div className="p-4">
      <form className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Search Tools</h2>

        <div className="mb-4">
          <label htmlFor="filter" className="block text-sm font-medium mb-1">
            Search By:
          </label>
          <select
            id="filter"
            className="w-full px-2 py-[5px] border border-black rounded transition-all hover:px-3 hover:py-2 hover:border-blue-500"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="searchInput"
            className="block text-sm font-medium mb-1"
          >
            Enter Query:
          </label>
          <input
            id="searchInput"
            type="search"
            placeholder={
              selected === "id" ? "Search With ID" : "Search With Title"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-2 py-[5px] border border-black rounded transition-all hover:px-3 hover:py-2 hover:border-blue-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          {/* <button
            type="button"
            onClick={handleSearch}
            className="border border-black px-4 py-2 rounded bg-blue-600 hover:bg-gray-500 text-white w-full md:w-1/2"
          >
            Search
          </button> */}
          <button
            type="button"
            onClick={handleReset}
            className="border border-black px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white w-full md:w-1/4"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="overflow-x-auto mt-8">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 bg-gray-400 px-4 py-2">
                  ID
                </th>
                <th className="border border-gray-300 bg-gray-400  px-4 py-2">
                  Name
                </th>
                <th className="border border-gray-300 bg-gray-400  px-4 py-2">
                  Type
                </th>
                <th className="border border-gray-300 bg-gray-400  px-4 py-2">
                  Category
                </th>
                <th className="border border-gray-300 bg-gray-400  px-4 py-2">
                  Status
                </th>
                <th className="border border-gray-300 bg-gray-400  px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.length > 0 ? (
                filteredTools.map((asset) => (
                  <tr
                    key={asset._id}
                    onClick={() => navigate(`/dashboard/tool/${asset._id}`)}
                    className="hover:bg-gray-100 cursor-pointer hover:text-blue-600"
                  >
                    <td className="border border-gray-300 px-4 py-2 max-w-[100px] truncate">
                      {asset.assetID}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 max-w-[100px] truncate">
                      {asset.assetName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {asset.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {asset.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {asset.assetStatus}
                    </td>
                    <td>
                      <GoTrash
                        className="w-7 font-extrabold hover:text-red-800 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(asset._id); // ✅ important: _id, not assetID
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Results Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Assets;
