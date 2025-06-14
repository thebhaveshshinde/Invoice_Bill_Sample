import React, { useEffect , useState} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


function AllInvoices() {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('invoices') || '[]');
        setInvoices(stored);
    },[]);

    const downloadPDF = async (invoice) => {
        const element = document.createElement('div');
        element.style.padding = '20px';
        element.style.backgroundColor = 'white';
        element.style.width = '600px';
        element.innerHTML = `
      <h2 style="text-align:center">Purchase Invoice</h2>
      <hr />
      <p><strong>Bill no.:</strong> ${invoice.id}</p>
      <p><strong>Date:</strong> ${invoice.date}</p>
      <p><strong>Time:</strong> ${invoice.time}</p>
      <hr/>
      <p><strong>Customer Details :</strong><p/>
      <p><strong>Name:</strong> ${invoice.name}</p>
      <p><strong>Email:</strong> ${invoice.email}</p>
      <hr />
      <p><strong>Product & Pricing :- </strong><p/>
      <p><strong>Product:</strong> ${invoice.product}</p>
      <p><strong>Quantity:</strong> ${invoice.quantity}</p>
      <p><strong>Price per Unit:</strong> ₹${invoice.price}</p>
      <p><strong>Grand Total:</strong> ₹${invoice.finalPrice}</p>
    `;
        document.body.appendChild(element);

        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`invoice-${invoice.id}.pdf`);

        document.body.removeChild(element);
    };

    return (
        <>
            <div class="row d-flex justify-content-center align-items-center gap-3" style={{ padding: '20px' }}>
                <h2>All Invoices</h2>
                {invoices.length === 0 ? (
                    <p>No invoices yet.</p>
                ) : (
                    invoices.map((inv) => (
                        <div class="col-md-3" key={inv.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>

                             {/* <p ><strong>Date:</strong> {inv.date} | <strong>Time:</strong> {inv.time}</p>
                            <p><strong>Invoice Bill No.:</strong> {inv.id}</p>
                            <p><strong>Customer Name:</strong> {inv.name}</p>
                            <p><strong> Customer Email:</strong> {inv.email}</p>
                            <p><strong>Product Name:</strong> {inv.product}</p>
                            <p><strong>Quantity:</strong> {inv.quantity}</p>
                            <p><strong>Price Per Unit:</strong> ₹{inv.price}</p>
                            <p><strong>Grand Total:</strong> ₹{inv.finalPrice}</p>

                            <button class="btn btn-dark" onClick={() => downloadPDF(inv)}>Download Invoice</button> */}


<div class="card " key={inv.id}>
  <div class="card-header">
   {inv.name}
  </div>
  <div class="card-body">
    <h5 class="card-title"><strong>Bill No.</strong>{inv.id}</h5>
    <p class="card-text">{inv.date} | {inv.time}</p>
     <button class="btn btn-dark" onClick={() => downloadPDF(inv)}>Download Invoice</button>
  </div>
</div>











                        </div> 
                    ))
                )}
            </div>
        </>
    )
}

export default AllInvoices




// import React, { useEffect, useState } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function AllInvoices() {
//     const [invoices, setInvoices] = useState([]);

//     useEffect(() => {
//         try {
//             const stored = JSON.parse(localStorage.getItem('invoices')) || [];
//             if (Array.isArray(stored)) {
//                 setInvoices(stored);
//             } else {
//                 setInvoices([]);
//             }
//         } catch (error) {
//             console.error("Error loading invoices:", error);
//             setInvoices([]);
//         }
//     }, []);

//     const downloadPDF = async (invoice) => {
//         const container = document.createElement('div');
//         container.style.padding = '20px';
//         container.style.backgroundColor = 'white';
//         container.style.width = '600px';
//         container.style.fontSize = '14px';

//         container.innerHTML = `
//       <h2 style="text-align:center">Invoice Purchase Bill</h2>
//       <hr />
//      <p><strong>Name:</strong> ${invoice.billNo || 'N/A'}</p>
//      <p><strong>Date:</strong> ${invoice?.date || 'N/A'}</p>
//       <p><strong>Time:</strong> ${invoice?.time || 'N/A'}</p>
//       <hr/>
//       <h2 style="text-align:center">Issued To</h2>
//       <p><strong>Name:</strong> ${invoice?.customer?.name || 'N/A'}</p>
//       <p><strong>Email:</strong> ${invoice?.customer?.email || 'N/A'}</p>
//       <hr />
//       <h4>Products:</h4>
//       <ul>
//         ${Array.isArray(invoice?.products)
//                 ? invoice.products.map(p =>
//                     // `<li>${p.name || 'Unnamed'} - Qty: ${p.quantity || 0}, Price: ₹${p.price || 0}, Subtotal: ₹${(p.quantity || 0) * (p.price || 0)}</li>
//                    ` <table>
//                     <thead>
//       <tr>
//         <th>Product Name</th>
//         <th>Quantity</th>
//         <th>Price</th>
//         <th>Total</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>${p.name}</td>
//         <td>${p.quantity}</td>
//         <td>${p.price}</td>
//         <td>₹${(p.quantity || 0) * (p.price || 0)}</td>
//       </tr>
//     </tbody>
//             </table>     `
//                 ).join('')
//                 : '<li>No products available</li>'
//             }
//       </ul>
//       <h3>Grand Final Total: ₹${invoice?.total || 0}</h3>
//     `;

//         document.body.appendChild(container);
//         const canvas = await html2canvas(container);
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const width = pdf.internal.pageSize.getWidth();
//         const height = (canvas.height * width) / canvas.width;
//         pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//         pdf.save(`invoice-${invoice?.id || 'unknown'}.pdf`);
//         document.body.removeChild(container);
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>All Invoices</h2>
//             {invoices.length === 0 ? (
//                 <p>No invoices yet.</p>
//             ) : (
//                 invoices.map((inv) => (
//                     <div key={inv.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//                         <p><strong>Invoice Bill No.:</strong> {inv.billNo || 'N/A'}</p>
//                          <p><strong>Date:</strong> {inv.date || 'N/A'} | <strong>Time:</strong> {inv.time || 'N/A'}</p>
//                         <p><strong>Name:</strong> {inv.customer?.name || 'N/A'}</p>
//                         <p><strong>Email:</strong> {inv.customer?.email || 'N/A'}</p>
                       
//                         <p><strong>Total:</strong> ₹{inv.total || 0}</p>
//                         <p><strong>Products:</strong></p>
//                         <ul>
//                             {Array.isArray(inv.products) ? (
//                                 inv.products.map((p, i) => (
//                                     <li key={i}>
//                                         {p.name || 'Unnamed'} - Qty: {p.quantity || 0}, Price: ₹{p.price || 0}
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li>No products</li>
//                             )}
//                         </ul>
//                         <button onClick={() => downloadPDF(inv)}>Download PDF</button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default AllInvoices;
