import React, { useState } from "react";
import { useGetStockSymbolQuery } from "../../../features/Stocks/stocksApiSlice";

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContent = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "500px",
  position: "relative",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#1E90FF",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const AddStockForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    shares: "",
    buyPrice: "",
    purchaseDate: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { data: stockSymbols } = useGetStockSymbolQuery();
  const symbols = stockSymbols?.map((sym) => sym.symbol) || [];


    const validate = () => {
    const errors = {};
    const { name, shares, buyPrice, purchaseDate } = formData;

    if (!name) errors.name = "Stock symbol is required";
    else if (!symbols.includes(name))
      errors.name = "Please select a stock from the suggestions";

    if (!shares) errors.shares = "Shares are required";
    if (!buyPrice) errors.buyPrice = "Buy price is required";
    if (!purchaseDate) errors.purchaseDate = "Purchase date is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const inputVal = value.toUpperCase();
      const filtered = symbols.filter((sym) =>
        sym.toUpperCase().startsWith(inputVal)
      );
      setSuggestions(filtered.slice(0, 10)); // limit to top 10
      setShowSuggestions(true);
      setFormData((prev) => ({ ...prev, [name]: inputVal }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const selectSuggestion = (symbol) => {
    setFormData((prev) => ({ ...prev, name: symbol }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    const { name, shares, buyPrice, purchaseDate/*, targetPercentage*/ } = formData;
    if (!name || !shares || !buyPrice || !purchaseDate) {
      alert("Please fill all fields");
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2 style={{ marginBottom: "20px", color: "#1E90FF" }}>
          Add New Stock
        </h2>
        <div style={{ position: "relative" }}>
          <input
            name="name"
            placeholder="Stock Symbol"
            style={inputStyle}
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          />
           {formErrors.name && <div style={errorStyle}>{formErrors.name}</div>}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #1E90FF",
                borderTop: "none",
                zIndex: 1001,
                maxHeight: "150px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((symbol, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    backgroundColor: "#f9f9f9",
                  }}
                  onMouseDown={() => selectSuggestion(symbol)}
                >
                  {symbol}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          name="shares"
          type="number"
          placeholder="Shares"
          style={inputStyle}
          value={formData.shares}
          onChange={handleChange}
        />
          {formErrors.shares && <div style={errorStyle}>{formErrors.shares}</div>}
        <input
          name="buyPrice"
          type="number"
          placeholder="Buy Price"
          style={inputStyle}
          value={formData.buyPrice}
          onChange={handleChange}
        />
        {formErrors.buyPrice && <div style={errorStyle}>{formErrors.buyPrice}</div>}
        <input
          name="purchaseDate"
          type="date"
          placeholder="Purchase Date"
          style={inputStyle}
          value={formData.purchaseDate}
          onChange={handleChange}
        />
         {formErrors.purchaseDate && (
          <div style={errorStyle}>{formErrors.purchaseDate}</div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button style={buttonStyle} onClick={handleSubmit}>
            Add
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#aaa" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStockForm;
