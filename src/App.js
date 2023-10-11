import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

function App() {
  useEffect(() => {
    function handleURLChange() {
      window.parent.postMessage(window.location.href, "http://localhost:8082");
    }

    window.addEventListener("hashchange", handleURLChange, false);

    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(window.history, arguments);
      handleURLChange();
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function () {
      originalReplaceState.apply(window.history, arguments);
      handleURLChange();
    };

    return () => {
      window.removeEventListener("hashchange", handleURLChange);
    };
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/inbox">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
