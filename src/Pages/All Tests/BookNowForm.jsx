import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader";

const BookNowForm = ({ user, singleTest, refetch }) => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [discount, setDiscount] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: singleTest.price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, singleTest.price]);

  const { data: discountRate = {}, isPending: loading } = useQuery({
    queryKey: ["discountRate"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners/status?active=true");
      return res.data;
    },
  });

  console.log(discountRate);

  useEffect(() => {
    if(discount === null){
      setDiscountPrice(0)
    }else if(discount === discountRate.coupon){
      setDiscountPrice(discountRate.discount)
    }
  }, [discount, discountRate.coupon, discountRate.discount, singleTest.price]);
  console.log('discount Price: ', discountPrice);
  console.log('discount Rate: ', discountRate.coupon);
  console.log('discount: ', discount);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
                    if (res.data.modifiedCount > 0) {
                      refetch();
                      Swal.fire({
                        title: `Success`,
                        text: `Your have successfully booked ${singleTest.test_name}. Your test date: ${singleTest.date}!`,
                        icon: "success",
                      });
                      navigate("/all-tests");
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
  if(loading){
    return <Loader></Loader>
  }

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
        <div className="divider"></div> 

        <div className="form-control pb-5">
          <label className="label">
            <span className="label-text text-titleText">Discount</span>
          </label>
          <input
            type="text"
            name="discount"
            onChange={(event) => setDiscount(event.target.value)}
            placeholder="Coupon Code"
            className="input input-bordered rounded-md h-[55px] focus:outline-none bg-[#E6E6E6] border-none"
            required
          />
        </div>
        <p className="mb-5">Price: {singleTest.price} usd</p>
        <p className="">Total price after discount: {singleTest.price - (singleTest.price * (discountPrice/100))} usd</p>
        <input
          type="submit"
          value="Book Now"
          disabled={!stripe || !clientSecret}
          className="mt-5 btn bg-secondary hover:bg-secondaryHover text-menuText font-semibold"
        />
        <p className="text-red-700 mt-3">{error}</p>
        {transactionId && (
          <p className="text-green-700 mt-3">
            Your transaction id : {transactionId}
          </p>
        )}
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
