import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl } from "../../config";

const removeFromCart = async (userId, courseId) => {
    // console.log("userId", userId);
    // console.log("course_id", courseId);

    try {
        const cartDetails = await axios.post(
            `${backendUrl}/cartdelete?user_id=${userId}&course_id=${courseId}`
        );

        if (!cartDetails) {
            console.log("item not deleted");
        } else {
            toast.success("Course deleted from cart");
        }
    } catch (error) {
        console.log("error", error);
        toast.error(error);
    }
};
const emptyCart = async (cartid) => {
    try {
        const cartDetails = await axios.post(
            `${backendUrl}/cartempty?cart_id=${cartid}`
        );
        if (!cartDetails) {
            console.log("item not deleted");
        } /*else {
            toast.success("Cart Emptied");
        }*/
    } catch (error) {
        toast.error(error);
    }
};

export { removeFromCart, emptyCart };
