import { useContext, useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import "./SearchBar.css";
import { CartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

export default function SearchBar() {
  const { products } = useContext(CartContext);
  const [searchItem, setSearchItem] = useState({
    search: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchItem((prevState) => ({ ...prevState, search }));
  };

  const handleSearchIconClicked = () => {
    setSearchIconClicked(!searchIconClicked);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickOutside = (e) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(e.target)
    ) {
      setSearchIconClicked(false);
      setIsFocused(false);
    }
  };

  const filteredItems = products
    ? products.filter(
        (item) =>
          item.title &&
          item.title.toLowerCase().includes(searchItem.search.toLowerCase())
      )
    : [];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      setSearchItem({ search: "" });
    };
  }, [isFocused]);

  const goToProductDetails = (productId) => {
    setSearchIconClicked(false);
    setIsFocused(false);
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 100);
  };

  return (
    <div id="search-container">
      <div
        className={`search-input-container ${isFocused ? "expanded" : ""}`}
        ref={searchInputRef}
      >
        {matches ? (
          <>
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
          </>
        ) : (
          <>
            <IoIosSearch onClick={handleSearchIconClicked} />
            {searchIconClicked && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  width: "100%",
                  height: "fit-content",
                  padding: "10px 0px 10px 0px",
                  top: "53px",
                  left: "0",
                  zIndex: 9999,
                  backgroundColor: "rgb(33, 33, 199)",
                }}
              >
                <input
                  type="text"
                  id="search-on-mobile"
                  value={searchItem.search}
                  onChange={handleSearchChange}
                  onFocus={handleFocus}
                  placeholder="Search"
                />
              </Box>
            )}
            {searchIconClicked && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "fixed",
                  width: "100%",
                  height: "fit-content",
                  top: "97px",
                  left: "0",
                  zIndex: 1,
                  backgroundColor: "rgb(33, 33, 199)",
                }}
              >
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  maxHeight: "200px",
                  top: "97px",
                  left: "0",
                  zIndex: 1,
                  overflowY: "auto",
                  color: "white",
                }}>
                  {searchItem.search && filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <div
                        key={index}
                        className="search-result-item"
                        onClick={() => goToProductDetails(item.id)}
                      >
                        <img src={item.image} alt={item.title} />
                        <span>{item.title}</span>
                      </div>
                    ))
                  ) : searchItem.search ? (
                    <p id="no-items-found">No items found</p>
                  ) : null}
                </Box>
              </Box>
            )}
          </>
        )}
        {isFocused && matches && (
          <div id="search-results">
            {searchItem.search && filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => goToProductDetails(item.id)}
                >
                  <img src={item.image} alt={item.title} />
                  <span>{item.title}</span>
                </div>
              ))
            ) : searchItem.search ? (
              <p id="no-items-found">No items found</p>
            ) : null}
          </div>
        )}
      </div>
      {/* {isFocused && (
        <div id="overlay" onClick={() => setIsFocused(false)} />
      )} */}
    </div>
  );
}
