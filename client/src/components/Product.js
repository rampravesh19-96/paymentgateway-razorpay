import React from "react";

const Product = (props) => {
  const {name,amount,description, image } = props.product;
  return (
    <div>
      <img src={image} alt="" style={{width:"100px",height:"100px"}} />
      <p>{name}</p>
      <p><b>Amount:- Rs. {amount}</b></p>
      <p>{description}</p>
      <button onClick={()=>{props.handlePayment(props.product)}}>pay</button>
    </div>
  );
};

export default Product;
