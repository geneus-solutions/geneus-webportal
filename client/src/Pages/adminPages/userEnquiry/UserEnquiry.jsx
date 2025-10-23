import React from 'react';
import '../../../styles/UserEnquiry.css'
import { useDeleteQueryMutation, useGetEnqueryQuery, useUpdateQueryMutation } from '../../../features/supportAndQuery/SupportAndQueryApiSlice';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const UserEnquiry = () => {

    const {data: enquiries} = useGetEnqueryQuery();
    const [deleteQuery] = useDeleteQueryMutation();
    // const [enquiry, setEnquiry] = useState({});
    const [updateQuery] = useUpdateQueryMutation();

    const onStatusChange = async (id, newStatus) => {
        try{
            console.log('this is id and new Status', id, newStatus);
            const response = await updateQuery({id, newStatus}).unwrap();
            console.log('this is response', response);
            // await axios.put(`/api/enquiries/${id}`, { status: newStatus });
            // setEnquiry((prev) =>
                //   prev.map((enq) =>
                    //     enq._id === id ? { ...enq, status: newStatus } : enq
            //   )
            // );
        }catch(error){
            console.log('this is an error', error)
        }
      };

    const handleDeleteQuery = async (id) => {
        try{
          const response = await deleteQuery(id).unwrap();
        //   console.log('this is dlete qyery response', response);
        toast.success(response?.message);
        }catch(error){
          console.log('this is an error', error);
        }
      }
    
  return (
    <div className="enquiry-list">
    <h2>Support Enquiries</h2>
    {enquiries?.allEnquiry?.map((enquiry) => (
      <div className="enquiry-card" key={enquiry._id}>
         <button
            className="delete-btn"
            onClick={() => handleDeleteQuery(enquiry._id)}
            title="Delete Enquiry"
          >
            <FaTrash />
          </button>
        <div className="enquiry-details">
          <p><strong>Name:</strong> {enquiry.name}</p>
          <p><strong>Email:</strong> {enquiry.email}</p>
          <p><strong>Subject:</strong> {enquiry.subject}</p>
          <p><strong>Message:</strong> {enquiry.message}</p>
          <p><strong>Date:</strong> {new Date(enquiry.createdAt).toLocaleString()}</p>
          {enquiry?.paymentId && (
            <p><strong>PaymentId:</strong> {enquiry?.paymentId}</p>
            )}
        </div>
        <div className="enquiry-status">
          {/* <label>Status:</label> */}
          <select
            value={enquiry.status}
            style={{
                backgroundColor:
                  enquiry.status === 'PENDING'
                    ? '#fff3cd' // yellow
                    : enquiry.status === 'REJECTED'
                    ? '#f8d7da' // red
                    : enquiry.status === 'COMPLETED'
                    ? '#d4edda' // green
                    : 'white', color: '#000000'}}
            onChange={(e) => onStatusChange(enquiry._id, e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="REJECTED">REJECTED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>
    ))}
  </div>
  )
}

export default UserEnquiry
