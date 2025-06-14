import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InvoiceForm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        product: '',
        quantity: '',
        price: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const finalPrice = formData.quantity * formData.price;
        const newInvoice = {
            ...formData,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
            finalPrice,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            id: Date.now()
        };

        const allInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        localStorage.setItem('invoices', JSON.stringify([...allInvoices, newInvoice]));
        navigate('/invoices');
    };


    return (
        <>

            <div style={{ padding: '20px' }}>
                <h2>Create Invoice</h2>
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-3">
                        <input type="text" name='name' class="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChange} required />
                        <label for="floatingInput">Customer Name</label>
                    </div>
                    {/* Customer Name:<input name="name" onChange={handleChange} required /> */}

                    <div class="form-floating mb-3">
                        <input type="email" name='email' class="form-control" id="floatingInput" onChange={handleChange} placeholder="name@example.com" required />
                        <label for="floatingInput">Customer Email </label>
                    </div>
                    {/* Customer Email:<input name="email" onChange={handleChange} required />
                    <br /><br /> */}


                    <div className="form-floating mb-3">
                        <select
                            className="form-select"
                            id="floatingSelect"
                            name="product"
                            onChange={handleChange}
                            required
                            aria-label="Product Name"
                        >
                            <option value="">Select Product</option>
                            <option value="Fan">Fan</option>
                            <option value="LED Bulb">LED Bulb</option>
                            <option value="Switch">Switch</option>
                        </select>
                        <label htmlFor="floatingSelect">Product Name</label>
                    </div>


                    {/* <div class="form-floating mb-3">
                        <input type="text" name='product' class="form-control" id="floatingInput" onChange={handleChange} required placeholder="name@example.com" />
                        <label for="floatingInput">Product Name </label>
                    </div> */}
                    {/* Product Name: <input name="product" onChange={handleChange} required /> */}

                    <div class="form-floating mb-3">
                        <input type="number" name='quantity' placeholder="name@example.com" class="form-control" id="floatingInput" onChange={handleChange} required />
                        <label for="floatingInput">Quantity Purchase </label>
                    </div>
                    {/* Quantity:<input name="quantity" type="number" onChange={handleChange} required /> */}


                    <div class="form-floating mb-3">
                        <input type="number" placeholder="name@example.com" name='price' class="form-control" id="floatingInput" onChange={handleChange} required />
                        <label for="floatingInput">Price Per Unit </label>
                    </div>
                    {/* Price Per Unit:<input name="price" type="number" onChange={handleChange} required /> */}
                    
                    <button class="btn btn-primary" type="submit">Save Invoice</button>
                </form>
            </div>
        </>
    )
}

export default InvoiceForm



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function InvoiceForm() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState({ name: '', email: '' });

//   const [products, setProducts] = useState([
//     { name: '', quantity: 1, price: 0 }
//   ]);

//   const handleCustomerChange = (e) => {
//     setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleProductChange = (index, field, value) => {
//     const updated = [...products];
//     updated[index][field] = field === 'name' ? value : Number(value);
//     setProducts(updated);
//   };

//   const addProduct = () => {
//     setProducts([...products, { name: '', quantity: 1, price: 0 }]);
//   };

//   const removeProduct = (index) => {
//     if (products.length > 1) {
//       const updated = [...products];
//       updated.splice(index, 1);
//       setProducts(updated);
//     }
//   };

//   const total = products.reduce(
//     (sum, p) => sum + p.quantity * p.price,
//     0
//   );
  
 



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const now = new Date();
//    const all = JSON.parse(localStorage.getItem('invoices') || '[]');
//  const billNo = `INV${(all.length + 1).toString().padStart(4, '0')}`;
    
   
//   const invoice = {
//       id: Date.now(),
//       billNo,
//       customer,
//       products,
//       total,
//       date: now.toLocaleDateString(),
//       time: now.toLocaleTimeString(),
//     };
//  localStorage.setItem('invoices', JSON.stringify([...all, invoice])); navigate('/invoices');
//   };
 

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Create Invoice</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Customer Name" onChange={handleCustomerChange} required />
//         <br /><br />
//         <input name="email" placeholder="Customer Email" onChange={handleCustomerChange} required />
//         <br /><br />

//         <h3>Products</h3>
//         {products.map((p, idx) => (
//           <div key={idx} style={{ marginBottom: '10px' }}>
//             <input
//               placeholder="Product Name"
//               value={p.name}
//               onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Qty"
//               value={p.quantity}
//               min="1"
//               onChange={(e) => handleProductChange(idx, 'quantity', e.target.value)}
//               required
//               style={{ width: '60px', marginLeft: '10px' }}
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={p.price}
//               onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
//               required
//               style={{ width: '80px', marginLeft: '10px' }}
//             />
//             <button type="button" onClick={() => removeProduct(idx)} style={{ marginLeft: '10px' }}>Remove</button>
//           </div>
//         ))}
//         <button type="button" onClick={addProduct}>+ Add Product</button>
//         <br /><br />

//         <h3>Total: ₹{total}</h3>

//         <button type="submit">Save Invoice</button>
//       </form>
//     </div>
//   );
// }

// export default InvoiceForm;
