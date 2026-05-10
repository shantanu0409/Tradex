import React, {
  useEffect,
  useState,
} from "react";

import "./App.css";

import Home from "./components/Home";

function App() {

  const [
    loading,

    setLoading,
  ] = useState(true);

  useEffect(() => {

    const params =

      new URLSearchParams(
        window.location.search
      );

    const urlToken =
      params.get("token");

    const urlUser =
      params.get("user");

    if (urlToken) {

      localStorage.setItem(
        "token",
        urlToken
      );
    }

    if (urlUser) {

      localStorage.setItem(
        "user",
        urlUser
      );
    }

    const token =

      localStorage.getItem(
        "token"
      );

    if (!token) {

      window.location.href =
  process.env.REACT_APP_FRONTEND_URL ||
  "http://localhost:3000/login";

      return;
    }

    setLoading(false);

  }, []);

  // LOADING

  if (loading) {

    return (

      <div className="loading">

        Loading Dashboard...

      </div>
    );
  }

  return <Home />;
}

export default App;