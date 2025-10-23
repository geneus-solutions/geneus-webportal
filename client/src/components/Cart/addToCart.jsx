import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../config";

const AddToCart = async (userId, courseDetails) => {
    // console.log("userId", userId);
    const ItemData = courseDetails;

    try {
        const cartDetails = await axios.post(`${backendUrl}/addtocart`, {
            userId,
            ItemData,
        });
        // console.log(cartDetails);
        if (!cartDetails) {
            console.log("item not added");
            return -1;
        } else {
            if (
                cartDetails.data.message === "Course already purchased" ||
                cartDetails.data.message === "Course already in cart"
            ) {
                toast.success(cartDetails.data.message);
                return 0;
            } else {
                toast.success(cartDetails.data.message);
                return 1;
            }
        }
    } catch (error) {
        toast.error(error);
    }
};

export { AddToCart };
