import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert/>
        <div className="container">
        <Routes>
          <Route  path="/" element={<Home />} exact> 
          
          </Route>
          <Route path="/about" element={<About />} exact>
          
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
