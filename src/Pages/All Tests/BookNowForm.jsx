import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const BookNowForm = ({ user, singleTest, refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: singleTest.price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, singleTest.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(user, singleTest);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("confirm error: ", confirmError);
    } else {
      console.log("payment intent: ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        if (user?.email) {
          const bookedTest = {
            test_id: singleTest._id,
            test_name: singleTest.test_name,
            price: singleTest.price,
            date: singleTest.date,
            image_url: singleTest.image_url,
            email: user.email,
            report_status: "pending",
          };
          await axiosSecure
            .post("/bookedTest", bookedTest)
            .then(async (res) => {
              if (res.data.insertedId) {
                await axiosSecure
                  .patch(`/allTests/${singleTest._id}`)
                  .then((res) => {
                    refetch();
                    if (res.data.modifiedCount > 0) {
                      Swal.fire({
                        title: `Success`,
                        text: `Your have successfully booked ${singleTest.test_name}. Your test date: ${singleTest.date}!`,
                        icon: "success",
                      });
                    }
                  });
              }
            });
        } else {
          Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login Now",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login", { state: { from: location } });
            }
          });
        }
      }
    }
  };
  return (
    <div className="modal-box text-titleText">
      <h3 className="font-bold text-lg mb-10">
        {" "}
        Make Payment for {singleTest.test_name} test{" "}
      </h3>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <input
          type="submit"
          value="Book Now"
          disabled={!stripe || !clientSecret}
          className="mt-5 btn bg-secondary hover:bg-secondaryHover text-menuText font-semibold"
        />
        <p className="text-red-700 mt-3">{error}</p>
        {transactionId && <p className="text-green-700 mt-3">Your transaction id : {transactionId}</p>}
      </form>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <input
            type="submit"
            value="✕"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          />
          <input type="submit" value="close" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default BookNowForm;
