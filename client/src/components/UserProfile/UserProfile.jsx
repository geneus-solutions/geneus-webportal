import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../features/auth/authApiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useDeleteUserByIdMutation } from "../../features/allusers/userDataApiSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [tempEdit, setTempEdit] = useState({});
  const user = useSelector(selectCurrentUser);
  const [updateProfile] = useUpdateUserProfileMutation();
  const { data: userProfile } = useGetUserProfileQuery(user.id);
  const [deleteUser] = useDeleteUserByIdMutation();
  const navigate = useNavigate();
  const handleEdit = (e, field) => {
    e.preventDefault();
    setTempEdit({
      field, // Field being edited
      value:
        userProfile?.userProfileData[field] ||
        userProfile?.userProfileData?.userId[field] ||
        "", // Initial value for the field
    });
  };

  const handleCancel = () => {
    setTempEdit({});
  };

  const handleSave = async () => {
    try {
      const id = user?.id; // User ID for the request
      const { field, value } = tempEdit; // Extract field and value from tempEdit
      const data = { [field]: value }; // Dynamically create payload with key-value pair
      await updateProfile({ id, data }).unwrap(); // Send data to backend
      setTempEdit({}); // Clear tempEdit after save
    } catch (error) {
      toast.error(error?.data?.error?.message);
    }
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    try{
      const response = await deleteUser(user.id).unwrap();
      toast.success(response.message);
      navigate('/');
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <div className="profile-container">
        <div className="information-container">
          <h2 className="profile-title">My Account</h2>
          <p className="profile-subtitle">Manage your account information.</p>

          <div className="profile-section">
            <strong className="label">User ID</strong>
            <p className="profile-value">{user?.id.slice(-10)}</p>
          </div>

          {[
            {
              label: "User Name",
              field: "name",
              placeholder: "Enter User Name",
              type: "text",
            },
            {
              label: "Date of Birth",
              field: "dateOfBirth",
              placeholder: "DD/MM/YYYY",
              type: "text",
            },
            {
              label: "Primary Email",
              field: "email",
              placeholder: "Primary Email",
              type: "email",
            },
            {
              label: "Secondary Email",
              field: "secondaryEmail",
              placeholder: "Secondary Email",
              type: "email",
            },
            {
              label: "Phone Number",
              field: "mobile",
              placeholder: "Enter Phone Number",
              type: "number",
            },
            {
              label: "Whatsapp Number",
              field: "whatsappNumber",
              placeholder: "Enter Whatsapp Number",
              type: "number",
            },
            { label: "Address", field: "address", Enter: "Enter Address" },
          ]?.map(({ label, field, placeholder, type }) => (
            <div key={field} className="profile-section">
              <strong className="label">{label}</strong>
              {tempEdit.field === field ? (
                <div className="profile-edit">
                  {field === "address" ? (
                    <textarea
                      value={tempEdit?.value}
                      onChange={(e) =>
                        setTempEdit((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      className="textarea-field"
                      placeholder={placeholder}
                      cols={4}
                      rows={4}
                    />
                  ) : (
                    <input
                      type={type}
                      value={tempEdit?.value}
                      onChange={(e) =>
                        setTempEdit((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                      className="input-field"
                      placeholder={placeholder}
                    />
                  )}

                  <div className="button-group">
                    <button onClick={() => handleSave()} className="save-btn">
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="profile-field">
                  <span className="profile-value">
                    {userProfile?.userProfileData[field] ||
                      userProfile?.userProfileData?.userId[field] ||
                      "Not provided"}
                  </span>
                  <button
                    onClick={(e) => handleEdit(e, field)}
                    className="edit-btn"
                  >
                    {userProfile?.userProfileData[field] ||
                    userProfile?.userProfileData?.userId[field]
                      ? "Edit"
                      : "Add"}
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="manage-account-dropdown">
            <h3 className="dropdown-title">Manage Account</h3>

            {/* <div className="account-action-row">
              <p className="action-text">Change your password</p>
              <p
                className="action-button change"
                onClick={() => alert("Delete Account clicked")}
              >
                Change
              </p>
            </div> */}

            <div className="account-action-row">
              <p className="action-text">Delete your Account</p>
              <p
                className="action-button delete"
                onClick={handleDeleteProfile}
              >
                Delete
              </p>
            </div>
          </div>
        </div>

        {/* //This is profile seciton for now hide it */}
        {/* <div className="profile-image-container">
          <img
            src="https://th.bing.com/th/id/OIP.7FsDgas0kcH0W1ajb1rZEgHaHa?w=219&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Profile"
            className="profile-image"
          />
        </div> */}
      </div>
    </>
  );
};

export default UserProfile;
