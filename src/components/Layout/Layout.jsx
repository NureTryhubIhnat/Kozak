import Navbar from "../Navigation/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}{" "}
      <Toaster
        toastOptions={{
          style: {
            background: "red",
            color: "white",
          },
        }}
        containerStyle={{
          top: 150,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
    </div>
  );
}
