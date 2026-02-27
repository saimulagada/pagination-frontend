import React, { useEffect, useState } from "react";
import api from "./axiosInstance"
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  email: string;
}

const PaginatedEmails = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [values, setValues] = useState<User[]>([]);
  const navigate = useNavigate();

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
      
      {/* Emails */}
      {values.map((item) => (
        <div key={item.id} className="flex justify-center mt-3">
          <h2 className="p-2 border border-green-500 w-[500px] text-center rounded-[5px]">
            {item.email}
          </h2>
        </div>
      ))}

      {/* Pagination Buttons */}
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

      {/* Logout */}
      <div className="mt-6">
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