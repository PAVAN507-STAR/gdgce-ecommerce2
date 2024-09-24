import React from "react";
import { useSearchParams } from "react-router-dom";
import Imgcard from "./productcard";

const SearchPage = ({ products }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || ""; // Get search query from URL

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)||
    product.category.toLowerCase().includes(query)
  );

  return (
    <div className="search-results-container p-5">
      <h1 className="text-3xl mb-4">Search Results for "{query}"</h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Imgcard data={product} key={product.id}></Imgcard>          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
