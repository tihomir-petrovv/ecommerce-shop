import { useContext, useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css";
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { products } = useContext(CartContext);
  const [searchItem, setSearchItem] = useState({
    search: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchItem((prevState) => ({ ...prevState, search }));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const filteredItems = products
    ? products.filter((item) =>
        item.title && item.title.toLowerCase().includes(searchItem.search.toLowerCase())
      )
    : [];

  useEffect(() => {
    document.body.style.overflow = isFocused ? 'hidden' : 'auto';
  }, [isFocused]);

  const goToProductDetails = (productId) => {
    setIsFocused(false);
    // Allow a brief timeout to ensure navigation happens after the dropdown closes
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 100); // Adjust the timeout as necessary
  };

  return (
    <div id="search-container">
      <div className={`search-input-container ${isFocused ? "expanded" : ""}`} ref={searchInputRef}>
        <input
          type="text"
          id="search"
          value={searchItem.search}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          placeholder="Search"
        />
        <label htmlFor="search">
          <IoIosSearch />
        </label>
        {isFocused && (
          <div id="search-results">
            {searchItem.search && filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div key={index} className="search-result-item" onClick={() => goToProductDetails(item.id)}>
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              ))
            ) : (
              searchItem.search && <p id="no-items-found">No items found</p>
            )}
          </div>
        )}
      </div>
      {isFocused && <div id="overlay" onClick={() => setIsFocused(false)} />}
    </div>
  );
}
