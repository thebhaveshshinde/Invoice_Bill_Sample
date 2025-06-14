import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './Components/InvoiceForm';
import AllInvoices from './Components/AllInvoices';
import Navbar from './Components/Navbar';




function App() {
  
 

  return (
    <>
     <Router>
     <Navbar />
      <div>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/invoices" element={<AllInvoices  />} />
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
