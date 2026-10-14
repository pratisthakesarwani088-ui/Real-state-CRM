import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;