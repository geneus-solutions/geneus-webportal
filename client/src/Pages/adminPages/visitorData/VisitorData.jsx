import React, { useState } from "react";
import {
  useDeleteVisitorDataByIdMutation,
  useDeleteVisitorDataMutation,
  useVisitorDataQuery,
} from "../../../features/visitorData/visitorDataApiSlice";
import { AiFillDelete } from "react-icons/ai";
import "./VisitorData.css"; // Import the external CSS file
import PopUp from "./PopUp";
import { toast } from "react-toastify";

const VisitorData = () => {
  const currentTime = new Date().toISOString().split("T")[0]
  const [dateFrom, setDateFrom] = useState(currentTime); // Holds input date
  const [dateTo, setDateTo] = useState(currentTime); // Holds input date
  const [selectedDateFrom, setSelectedDateFrom] = useState(currentTime); // Stores the date when "Filter" is clicked
  const [selectedDateTo, setSelectedDateTo] = useState(currentTime); // Stores the date when "Filter" is clicked
  const [showPopUp, setShowPopUp] = useState(false);

  // Fetch data only when selectedDate is available
  const { data: visitorData, isLoading } = useVisitorDataQuery(
    { dateFrom: selectedDateFrom, dateTo: selectedDateTo },
    { skip: !selectedDateFrom || !selectedDateTo} // Fetch only when selectedDate is not empty
  );

  // console.log('thisis visitor data', visitorData)

  const [deleteVisitorData] = useDeleteVisitorDataMutation();

  const [deleteVisitorDataById] = useDeleteVisitorDataByIdMutation();

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value); // Update input date state
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value); // Update input date state
  };

  const handleFilterClick = () => {
    setSelectedDateFrom(dateFrom); // Trigger API call when "Filter" is clicked
    setSelectedDateTo(dateTo);
  };

  // console.log('this is selectedDateFrom',selectedDateFrom, selectedDateTo)
  const handleYesClick = async () => {
    try {
        const res = await deleteVisitorData(
          { dateFrom: selectedDateFrom, dateTo: selectedDateTo },
          { skip: !selectedDateFrom || !selectedDateTo }
        ).unwrap();
        // console.log(res);
        toast.success(res.message);
        setShowPopUp(!showPopUp);
    } catch (error) {
      console.log("this is serror", error);
    }
  };

  const handleNoClick = () => {
    setShowPopUp(!showPopUp);
  };

  const handleDeleteByID = async (id) =>{
    // console.log('id', id)
    try{
      await deleteVisitorDataById({id}).unwrap();
      // console.log(res);
    }catch(error){
      console.log('this is error', error)
    }
  }

  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Visitor Data</h2>

      {/* Date Input and Filter Button */}
      <div className="filter-container">
        From
        <input type="date" value={dateFrom} onChange={handleDateFromChange} />
        To
        <input type="date" value={dateTo} onChange={handleDateToChange}  min={dateFrom}
        />
        <button
          className="filter-btn"
          onClick={handleFilterClick}
          disabled={!dateFrom || !dateTo}
        >
          Filter
        </button>
        <button
          className="delete-btn"
          disabled={!dateFrom || !dateTo || visitorData?.data?.length<=0}
          onClick={() => setShowPopUp(!showPopUp)}
        >
          <AiFillDelete style={{ fontSize: 22, color: '#FFFFFF'}} />
        </button>
      </div>
      {showPopUp && (
        <PopUp title="Are you sure to delete the visitor data?" handleYesClick={handleYesClick} handleNoClick={handleNoClick} />
      )}
      {/* Show message when no date is selected */}
      {!selectedDateFrom || !selectedDateTo ? (
        <p className="no-data">
          Please select a date and click "Filter" to fetch && "Delete" to delete the visitor data
        </p>
      ) : isLoading ? (
        <p>Please wait, fetching data...</p>
      ) : visitorData?.data?.length > 0 ? (
        <div className="visitor-table-container">
          <table className="visitor-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Date</th>
                <th>URL</th>
                <th>IP Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visitorData?.data?.map((visitor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(visitor.createdAt).toLocaleDateString()}</td>
                  <td>{visitor.url}</td>
                  <td>{visitor.ip}</td>
                  <td>{visitor.city}</td>
                  <td>{visitor.country}</td>
                  <td><AiFillDelete style={{marginLeft: '15px', fontSize: '22px', color: 'red', cursor: 'pointer'}} onClick={()=>handleDeleteByID(visitor._id)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">
          No visitor data available for this date. Please select other date
        </p>
      )}
    </div>
  );
};

export default VisitorData;
