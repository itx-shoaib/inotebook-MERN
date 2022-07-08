import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route  path="/" element={<Home />} exact> 
          
          </Route>
          <Route path="/about" element={<About />} exact>
          
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
