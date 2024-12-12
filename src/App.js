import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./component/AddProduct";
import ShowProduct from "./component/ShowProduct";
import EditProduct from "./component/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowProduct />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
