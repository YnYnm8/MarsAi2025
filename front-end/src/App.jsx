import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/pages/dashboard/dashboard"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
