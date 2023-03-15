import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} exact />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/:id/edit" element={<EditEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
