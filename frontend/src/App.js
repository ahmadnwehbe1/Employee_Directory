import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/employee/add" element={<AddEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
