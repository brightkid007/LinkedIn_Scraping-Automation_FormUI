import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobTitleExtForm from './Components/JobTitleExtForm';
import EmployeeExtForm from './Components/EmployeeExtForm';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<JobTitleExtForm />} />
          <Route path="/employee" element={<EmployeeExtForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
