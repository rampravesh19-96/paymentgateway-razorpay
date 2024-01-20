import React from 'react'
import Product from './components/Product'
import useRazorpay from "react-razorpay";
const products = [
  {
      name : "Shirt",
      amount : "100",
      description:"best shirt",
      image : "https://cdn.pixabay.com/photo/2014/04/03/10/55/t-shirt-311732_960_720.png"
  },
  {
      name : "Shoes",
      amount : "200",
      description:"best Shoes",
      image : "https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_960_720.png"
  },
 
]

const App = () => {

  const [Razorpay] = useRazorpay();

  async function makeApiCall(body) {
    try {
        const response = await fetch("http://localhost:3000/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Something went wrong!');
    }
}

function buildRazorpayOptions(paymentResponse) {
  return {
      key: `${paymentResponse.key_id}`,
      amount: `${paymentResponse.amount}`,
      currency: 'INR',
      name: `${paymentResponse.product_name}`,
      description: `${paymentResponse.description}`,
      image: 'https://dummyimage.com/600x400/000/fff',
      order_id: `${paymentResponse.order_id}`,
      handler: function (response) {
          alert("Payment Succeeded");
      },
      prefill: {
          contact: `${paymentResponse.contact}`,
          name: `${paymentResponse.name}`,
          email: `${paymentResponse.email}`,
      },
      notes: {
          description: `${paymentResponse.description}`,
      },
      theme: {
          color: "#2300a3",
      },
  };
}

function setupRazorpay(options) {
  // const razorpayObject = new window.Razorpay(options);
  const razorpayObject = new Razorpay(options);

  razorpayObject.on('payment.failed', function (response) {
      alert("Payment Failed");
  });

  razorpayObject.open();
}


async function handlePayment({amount,name,description}) {

  const body = {
    amount,
    product_name: name,
    description,
    contact: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com"
  }
  

  try {

    const paymentResponse = await makeApiCall(body);

    if (paymentResponse.success) {
      const options = buildRazorpayOptions(paymentResponse);
      setupRazorpay(options);
    } else {
      alert(paymentResponse.msg);
    }
  } catch (error) {
    alert(error.message);
  }
}
  return (
    <>
      <hr />
      <div style={{display:"flex",gap:"30px"}}>
      {products.map(product => <Product key={product.image} product={product} handlePayment={handlePayment}/>)}
      </div>
    </>
  )
}

export default App