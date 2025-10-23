import React, { useState } from "react";
import {
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
} from "../../../features/allusers/userDataApiSlice";
import { AiFillDelete } from "react-icons/ai";
import PopUp from "../visitorData/PopUp";
import { toast } from "react-toastify";
import Loading from "../../../components/loading/Loading";

const UsersData = () => {
  const { data: users } = useGetAllUserQuery();
  const [deleteUser, { isLoading }] = useDeleteUserByIdMutation();
  const [showPopUp, setShowPopUp] = useState(null);

  const handleDelteUserById = async (id) => {
    setShowPopUp(id);
  };

  const handleNoClick = () => {
    setShowPopUp(!showPopUp);
  };

  const handleYesClick = async () => {
    try {
      const response = await deleteUser(showPopUp).unwrap();
      setShowPopUp(!showPopUp);
      toast.success(response.message);
    } catch (error) {
      console.log("Error on delete the user", error);
    }
  };
  return (
    <div className="visitor-container">
      <h2 className="visitor-title">Users Data</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="visitor-table-container">
          <table className="visitor-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Role</th>
                <th>Enroll Course</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.modifyUsers?.map((user, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.coursePurchase ? "Enroll" : "Not Enroll"}</td>
                    <td>
                      <AiFillDelete
                        style={{
                          marginLeft: "15px",
                          fontSize: "22px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelteUserById(user?._id)}
                      />
                    </td>
                  </tr>
                  {showPopUp === user._id && (
                    <PopUp
                      title="Are you sure to delete the user account?"
                      handleYesClick={handleYesClick}
                      handleNoClick={handleNoClick}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersData;
