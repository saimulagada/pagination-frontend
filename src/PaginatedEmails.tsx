import { useEffect, useState } from "react";
import api from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

interface User {
  id: number;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const stripePromise = loadStripe("pk_test_51T7IFXRjugwWGPZP52tDUXWdDdruCSm2I4MzdfKpoiDmRe3TRAmC7Qou4EAMD8Psodq9l4y1tAOoyD9q1CxtFgMw00VQJ6ALiZ"); 
// Replace with your Stripe publishable key

const PaginatedEmails = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [values, setValues] = useState<User[]>([]);
  const navigate = useNavigate();

  const products: Product[] = [
    { id: 1, name: "Premium Subscription", price: 9900 },
    { id: 2, name: "Pro Subscription", price: 19900 },
    { id: 3, name: "VIP Access", price: 29900 },
  ];

  const getUsers = async (pageNumber: number) => {
    try {
      const resp = await api.get(`/pagination?page=${pageNumber}`);
      const data = resp.data;
      setTotalPages(data.totalPages);
      setValues(data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
const handleCheckout = async (product: Product) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) return;

    const response = await api.post("/create-checkout-session", {
      product,
    });

    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.log("Payment error:", error);
  }
};
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <div className="text-center mt-6">

      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {values.map((item) => (
        <div key={item.id} className="flex justify-center mt-3">
          <h2 className="p-2 border border-green-500 w-[500px] text-center rounded-[5px]">
            {item.email}
          </h2>
        </div>
      ))}

      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className="p-3 bg-pink-500 text-white mx-2 rounded-[5px]"
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* PRODUCTS SECTION */}

      <h1 className="text-2xl font-bold mt-10 mb-6">Purchase Plans</h1>

      <div className="flex justify-center gap-6 flex-wrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-xl shadow-lg w-64"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-lg mt-2">₹{product.price / 100}</p>
            <button
              onClick={() => handleCheckout(product)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PaginatedEmails;