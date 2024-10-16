import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import  './index.css'
import { store } from "./Store/store";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
