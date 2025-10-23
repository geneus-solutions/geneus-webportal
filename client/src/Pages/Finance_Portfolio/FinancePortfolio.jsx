import { useState, useMemo } from "react";
import {
  useAddStocksMutation,
  // useGetStockSymbolQuery,
  useGetUserStockQuery,
  // useUpdateStocksMutation,
  useDeleteAllStockMutation
} from "../../features/Stocks/stocksApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddStockForm from "../../components/admin/Stock/AddStockForm";
import { MdDelete } from "react-icons/md";

const StockTable = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [addStock] = useAddStocksMutation();
  const [showModal, setShowModal] = useState(false);

  const {
    data: userStocks,
    isLoading,
    error,
    refetch,
  } = useGetUserStockQuery(user.id);
  const [deleteAllStock] = useDeleteAllStockMutation();
  console.log("this is the existiong user stock data--->", userStocks);
  console.log("this is error on fetching stock", error);
  const stocks = useMemo(() => {
    if (!userStocks?.data?.stocks) return [];

    return userStocks?.data?.stocks?.map((s) => ({
      name: s.stockName,
      shares: s.totalShares,
      buyPrice: s.investedAmount,
      purchaseDate: new Date(s.lastPurchaseDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      currentPrice: s.currentPrice || "-",
      totalCurrentPrice: s.currentTotalValue || "-",
      profit: s.profit || "-",
      profitPercent: s.profitPercentage || "-",
      targetPercentage: s.targetPercentage || "",
      _id: s.stockName,
    }));
  }, [userStocks]);

  const handleAddStock = async (data) => {
    try {
      console.log("this is data from handel Add Stock---->", data);
      const response = await addStock({
        name: data.name.toUpperCase().trim(),
        shares: Number(data.shares),
        buyPrice: Number(data.buyPrice),
        purchaseDate: data.purchaseDate,
        targetPercentage: Number(data.targetPercentage),
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        const saved = response.data;
        console.log("this is saved stock data--->", saved);
        refetch();
      }
    } catch (err) {
      console.error("Add stock error:", err);
      toast.error("Failed to add stock.");
    }
  };

  const handleDeleteStock = async (stockName) => {
    try {
      const response = await deleteAllStock({
        stockName,
        userId: user?.id,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  return (
    <>
      <>
        {isLoading ? (
          <div>Stock Loading...</div>
        ) : (
          <div style={styles.container}>
            <div>
              <h2 style={styles.heading}>📈 Stock Profit Tracker</h2>
              <div style={styles.buttonContainer}>
                <button
                  style={styles.addButton}
                  onClick={() => setShowModal(true)}
                >
                  Add New Stock
                </button>
              </div>
              {showModal && (
                <AddStockForm
                  onClose={() => setShowModal(false)}
                  onSubmit={handleAddStock}
                />
              )}
            </div>

            {!stocks.length ? (
              <p style={styles.noDataText}>
                No stocks added yet. Please add the stock to get the data
              </p>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Stock Name</th>
                      <th style={styles.th}>Total Shares</th>
                      <th style={styles.th}>Total Invested Amount</th>
                      <th style={styles.th}>
                        Average Stock PriceAverage Stock Price
                      </th>
                      <th style={styles.th}>Purchase Date</th>
                      <th style={styles.th}>Stock Current Price</th>
                      <th style={styles.th}>Total Current Price</th>
                      <th style={styles.th}>Profit</th>
                      <th style={styles.th}>Profit %</th>
                      {/* <th style={styles.th}>Target Profit %</th> */}
                      <th style={styles.th}>View</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock, idx) => {
                      const profitPercent = parseFloat(stock?.profitPercent);
                      const profitStyle =
                        !isNaN(profitPercent) && stock.profitPercent !== "-"
                          ? profitPercent >= 0
                            ? styles.profitPositive
                            : styles.profitNegative
                          : {};

                      return (
                        <tr key={idx}>
                          <td style={styles.td}>{stock?.name}</td>
                          <td style={styles.td}>{stock?.shares}</td>
                          <td style={styles.td}>{stock?.buyPrice}</td>
                          <td style={styles.td}>
                            {(stock?.buyPrice / stock?.shares).toFixed(2)}
                          </td>
                          <td style={styles.td}>{stock?.purchaseDate}</td>
                          <td style={styles.td}>{stock?.currentPrice}</td>
                          <td style={styles.td}>{stock?.totalCurrentPrice}</td>
                          <td style={styles.td}>
                            {stock?.currentPrice > 0
                              ? stock?.profit
                              : "Data Not Found"}
                            {!isNaN(profitPercent) &&
                              stock.profitPercent !== "-" &&
                              (profitPercent >= 0 ? (
                                <span style={styles.arrowUp}>↑</span>
                              ) : (
                                <span style={styles.arrowDown}>↓</span>
                              ))}
                          </td>
                          <td style={{ ...styles.td, ...profitStyle }}>
                            {stock?.profitPercent !== "-"
                              ? `${stock?.profitPercent}%`
                              : "-"}
                          </td>
                          {/* <td style={styles.td}>{stock?.targetPercentage}</td> */}
                          <td style={styles.td}>
                            <button
                              style={styles.button}
                              onClick={() =>
                                navigate(
                                  `/admin-dashboard/finance-porfolio/${stock?.name}`
                                )
                              }
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <button className="btn-delete"
                            onClick={()=>handleDeleteStock(stock?.name)}>
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    <tr style={{ fontWeight: "bold" }}>
                      <td style={styles.td}>Total</td>
                      <td style={styles.td}>
                        {userStocks?.data?.summary?.totalShares}
                      </td>
                      <td style={styles.td}>
                        {userStocks?.data?.summary?.totalInvested}
                      </td>
                      <td style={styles.td}></td>
                      <td style={styles.td}></td>
                      <td style={styles.td}>
                        {userStocks?.data?.summary?.totalCurrentValue}
                      </td>
                      <td style={styles.td}>
                        {userStocks?.data?.summary?.totalProfit?.toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        {userStocks?.data?.summary?.totalProfitPercentage}
                      </td>
                      {/* <td style={styles.td}></td> */}
                      <td style={styles.td}></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div style={styles.warningBox}>
              ⚠️ Some stock data could not be loaded. Please refresh the page.
            </div>
          </div>
        )}
      </>
    </>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    backgroundColor: "#f7f9fc",
    color: "#1E2A38",
    minHeight: "100vh",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  tableWrapper: {
    overflowX: "auto",
    margin: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "960px",
    fontSize: "15px",
    borderRadius: "10px",
    overflow: "hidden",
  },
  warningBox: {
    marginTop: "20px",
    padding: "12px 20px",
    backgroundColor: "#fff3cd",
    color: "#856404",
    border: "1px solid #ffeeba",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "bold",
    textAlign: "center",
  },
  th: {
    padding: "12px 16px",
    backgroundColor: "#1E90FF",
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    borderBottom: "2px solid #1E90FF",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: "10px 14px",
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
  },
  profitPositive: {
    color: "#28a745",
    fontWeight: "bold",
  },
  profitNegative: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    border: "1px solid #007BFF", // Use primary blue
    color: "#007BFF", // Use primary blue
    padding: "6px 12px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      // Add hover effect
      backgroundColor: "#007BFF",
      color: "white",
    },
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    color: "#666666",
    cursor: "not-allowed",
    borderRadius: "5px",
    padding: "6px 12px",
    fontSize: "14px",
    border: "none",
  },
  addButton: {
    backgroundColor: "#007BFF", // Use primary blue
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease",
    marginTop: "20px",
    marginLeft: "10px",
    "&:hover": {
      // Add hover effect
      backgroundColor: "#0056b3",
    },
  },
  addButtonHover: {
    backgroundColor: "#006fe6",
  },
  input: {
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    color: "#333",
    padding: "6px 10px",
    width: "90%",
    borderRadius: "4px",
    textAlign: "center",
  },
  arrowUp: {
    color: "#28a745",
    marginLeft: "6px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  arrowDown: {
    color: "#dc3545",
    marginLeft: "6px",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default StockTable;
