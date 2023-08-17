import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AdminUser from "./components/AdminUser";

import UpdateDelete from "./components/UpdateDelete";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AdminUser />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/updatedelete" element={<UpdateDelete />} />
          <Route exact path="/update/:id" element={<UpdateUser />} />
          <Route exact path="/updatedelete/delete" element={<DeleteUser />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
