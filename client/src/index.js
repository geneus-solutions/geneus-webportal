import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <React.StrictMode> */}
    <ToastContainer
      position="top-center" // Position the toast
      autoClose={2000} // Duration before auto-close in milliseconds
      hideProgressBar={false} // Hide the progress bar
      newestOnTop={false} // Show newest toasts on top
      closeOnClick // Close the toast on click
      rtl={false} // Right-to-left text direction
      pauseOnFocusLoss // Pause toast when the window loses focus
      draggable // Allow to drag the toast
      pauseOnHover // Pause toast on hover
      theme="dark" // Theme of the // toast (colored, light, or dark)
      closeButton={false}
    />
    <Provider store={store}>
      <App />
    </Provider>
    {/* </React.StrictMode> */}
  </>
);
reportWebVitals();
