import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  useCreateTargetPercentageMutation,
  useDeleteStockMutation,
  useGetStockDetailQuery,
  useGetTargetPercentageQuery,
  useUpdateStocksMutation,
  useUpdateTargetPercentageMutation,
} from "../../features/Stocks/stocksApiSlice";
import { toast } from "react-toastify";
import "../../styles/stockData.css";

import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { CiSaveUp1 } from "react-icons/ci";
const StockData = () => {
  const { stockname } = useParams();
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [overallTarget, setOverallTarget] = useState(0);
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const {
    data: userStocks,
    isLoading,
    error,
    refetch,
  } = useGetStockDetailQuery({ stockname, userId: user.id });
  console.log("thi sis usersotc", userStocks);
  const [editingStockId, setEditingStockId] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateStock] = useUpdateStocksMutation();

  const [createTargetPercentage] = useCreateTargetPercentageMutation();
  const [updateTargetPercentage] = useUpdateTargetPercentageMutation();
  const { data: getTargetPercentage, refetch: getPercentageRefetch } =
    useGetTargetPercentageQuery({ userId: user?.id, stockName: stockname });
  console.log("thi si get TargetPercentage", getTargetPercentage);

  const [deleteStock] = useDeleteStockMutation();
  const stocks = userStocks?.data?.stocks?.stocks;

  useEffect(() => {
    if (stocks?.length <= 0) {
      navigate(-1);
    }
  }, [stocks, navigate]);

  if (isLoading) return <p>Loading stock details...</p>;
  if (error) return <p>Error fetching stock details.</p>;

  const handleEditClick = (stock) => {
    console.log("tho si stokcs", stock);
    setEditingStockId(stock?._id);

    setFormData({
      purchasedShares: stock?.purchasedShares,
      buyPrice: stock?.buyPrice,
      purchaseDate: stock?.purchaseDate,
    });
  };

  const handleCancel = () => {
    setEditingStockId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      console.log("thi si form data", formData);
      const response = await updateStock({
        id: editingStockId,
        data: formData,
      }).unwrap();
      console.log("this is updated stock repsonse", response);
      setEditingStockId(null);
      refetch();
      toast.success(response?.message);
    } catch (err) {
      toast.error(err?.data?.message);
      console.error("Update failed", err);
    }
  };

  const handleSaveTarget = async () => {
    try {
      const payload = {
        userId: user?.id,
        data: { targetPercentage: Number(overallTarget), stockName: stockname },
      };
      let res;
      if (getTargetPercentage?.data) {
        // Update if target already exists
        res = await updateTargetPercentage(payload).unwrap();
        await getPercentageRefetch();
      } else {
        // Create if no target exists
        res = await createTargetPercentage(payload).unwrap();
      }
      console.log("thi is res", res);
      toast.success(res?.message || "Target updated");
      setIsEditingTarget(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update target");
    }
  };

  const handleDeleteStock = async (stockId) => {
    try {
      const response = await deleteStock({
        stockId,
        userId: user?.id,
      }).unwrap();
      console.log("this is response when delete the stock", response);
      if (response?.success) {
        refetch();
        toast.success(response?.message || "Stock deleted");
      }
    } catch (error) {
      toast.error(error || "Failed to Delete the stock");
    }
  };

  return (
    <div className="stock-container">
      <h2 className="stock-heading">📊 Stock Details for {stockname}</h2>

      <div className="target-container">
        <h3 className="stock-price">
          Current Price: ₹{userStocks?.data?.stocks?.currentPrice}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <h3>🎯 Target Percentage:</h3>
          {isEditingTarget ? (
            <>
              <input
                type="number"
                value={overallTarget}
                onChange={(e) => setOverallTarget(e.target.value)}
                className="input"
              />
              <button className="btn-save" onClick={handleSaveTarget}>
                <CiSaveUp1 />
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setIsEditingTarget(false);
                  setOverallTarget(
                    getTargetPercentage?.data?.targetPercentage || 0
                  );
                }}
              >
                <MdCancel />
              </button>
            </>
          ) : (
            <>
              <span className="bold-text">
                {getTargetPercentage?.data?.targetPercentage || 0}%
              </span>
              <button
                onClick={() => {
                  setIsEditingTarget(true);
                  setOverallTarget(
                    getTargetPercentage?.data?.targetPercentage || 0
                  );
                }}
                className="btn-edit"
              >
                <CiEdit size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Stock Name</th>
            <th>Purchased Shares</th>
            <th>Buy Price</th>
            <th>Purchase Date</th>
            <th>Total Current Price</th>
            <th>Profit</th>
            <th>Profit %</th>
            <th>Action</th>

            {stocks?.length > 1 && <th>Delete Stock</th>}
          </tr>
        </thead>
        <tbody>
          {stocks?.map((stock, i) => {
            const isEditing = editingStockId === stock._id;
            return (
              <tr key={stock._id}>
                <td>{i + 1}</td>
                <td>{stock.stockName}</td>
                <td>
                  {isEditing ? (
                    <input
                      name="purchasedShares"
                      type="number"
                      value={formData.purchasedShares}
                      onChange={handleChange}
                      className="input"
                    />
                  ) : (
                    stock.purchasedShares
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      name="buyPrice"
                      type="number"
                      value={formData.buyPrice}
                      onChange={handleChange}
                      className="input"
                    />
                  ) : (
                    `₹${stock.buyPrice}`
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      name="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="input"
                    />
                  ) : (
                    new Date(stock.purchaseDate).toLocaleDateString()
                  )}
                </td>
                <td>₹{stock?.totalCurrentPrice}</td>
                <td>₹{stock.profit}</td>
                <td>{stock.profitPercentage}%</td>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} className="btn save">
                        Save
                      </button>
                      <button onClick={handleCancel} className="btn cancel">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(stock)}
                      className="btn edit"
                    >
                      Update
                    </button>
                  )}
                </td>
                {stocks?.length > 1 && (
                  <td>
                    <button
                      onClick={() => handleDeleteStock(stock?._id)}
                      className="btn-delete"
                    >
                      <MdDelete />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockData;
