import React from "react";
// import {useSelector } from 'react-redux';
import "../../styles/payment-method.css";
// import {loadStripe} from '@stripe/stripe-js';

const PaymentMethod = () => {
  // const {cart} = useSelector((state)=>state.allCart);


  // const makePayment = async()=>{

  //   const stripe = await loadStripe("pk_test_51P2a48SFcb7PiTXgbLERzHMaXubaK8XxO5MptqJVsemKdsMdtZJHoDTs3EuVx3QG0TJEHPx0K4tonJbjmU8Rry8O00ea8deLT1");

  //   const body = {
  //       products:cart
  //   }

  //   const headers = {
  //       "Content-Type":"application/json"
  //   }

  //   const response = await fetch("http://localhost:3000/api/create-checkout-session",{
  //       method:"POST",
  //       headers:headers,
  //       body:JSON.stringify(body)
  //   });

  //   const session = await response.json();

  //   const result = stripe.redirectToCheckout({
  //       sessionId:session.id
  //   });
    
  //   if(result.error){
  //       console.log(result.error);
  //   };
  // }

  return (
    <>
      <div className="payment text-end mt-5">
        <button className="btn btn-success" >Reserve Now</button>
      </div>
    </>

  );
};

export default PaymentMethod;
