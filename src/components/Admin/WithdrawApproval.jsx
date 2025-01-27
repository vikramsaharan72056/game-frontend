import React, { useEffect, useState } from "react";
import axios from "axios";
import { WALLET_WITHDRAW, WITHDRAWL_STATUS_UPDATE_BY_ADMIN } from "../../constants/apiEndpoints";

const WithdrawalApproval = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("3");
  const [currentPage, setCurrentPage] = useState(1);
  const withdrawalsPerPage = 5;

  const fetchWithdrawals = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get(WALLET_WITHDRAW);
      const filteredWithdrawals =
        status === "3"
          ? response.data
          : response.data.filter((withdrawal) => withdrawal.status === status);
      setWithdrawals(filteredWithdrawals);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setMessage("Failed to fetch withdrawals.");
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id, newStatus, balance, cryptoname) => {
    try {
      await axios.put(WITHDRAWL_STATUS_UPDATE_BY_ADMIN(id), {
        status: newStatus,
        balance,
        cryptoname,
      });
      setMessage(`Withdrawal ${newStatus === 1 ? "Approved" : "Rejected"} successfully!`);
      fetchWithdrawals();
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
      setMessage("Failed to update withdrawal status.");
    }
  };

  const totalPages = Math.ceil(withdrawals.length / withdrawalsPerPage);
  const currentWithdrawals = withdrawals.slice(
    (currentPage - 1) * withdrawalsPerPage,
    currentPage * withdrawalsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [status]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow">
      <h1 className="text-xl font-bold text-center mb-6">Withdrawal Approval Panel</h1>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="3">All</option>
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : currentWithdrawals.length > 0 ? (
        <div>
          {/* Table for larger screens */}
          <div className="hidden lg:block">
            <table className="w-full table-auto bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Balance</th>
                  <th className="px-4 py-2 text-left">Cryptoname</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentWithdrawals.map((withdrawal, index) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {(currentPage - 1) * withdrawalsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2">{withdrawal.userId}</td>
                    <td className="px-4 py-2">{withdrawal.balance}</td>
                    <td className="px-4 py-2">{withdrawal.cryptoname}</td>
                    <td className="px-4 py-2">
                      {withdrawal.status === "0"
                        ? "Pending"
                        : withdrawal.status === "1"
                        ? "Approved"
                        : "Rejected"}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {withdrawal.status === "0" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                withdrawal.id,
                                1,
                                withdrawal.balance,
                                withdrawal.cryptoname
                              )
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                withdrawal.id,
                                2,
                                withdrawal.balance,
                                withdrawal.cryptoname
                              )
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {withdrawal.status !== "0" && (
                        <span className="text-gray-500 italic">No Actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="block lg:hidden">
            {currentWithdrawals.map((withdrawal, index) => (
              <div key={withdrawal.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="mb-2">
                  <strong>#{(currentPage - 1) * withdrawalsPerPage + index + 1}</strong>
                </div>
                <div className="mb-2">
                  <strong>User ID:</strong> {withdrawal.userId}
                </div>
                <div className="mb-2">
                  <strong>Balance:</strong> {withdrawal.balance}
                </div>
                <div className="mb-2">
                  <strong>Cryptoname:</strong> {withdrawal.cryptoname}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong>{" "}
                  {withdrawal.status === "0"
                    ? "Pending"
                    : withdrawal.status === "1"
                    ? "Approved"
                    : "Rejected"}
                </div>
                {withdrawal.status === "0" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleStatusUpdate(withdrawal.id, 1, withdrawal.balance, withdrawal.cryptoname)
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(withdrawal.id, 2, withdrawal.balance, withdrawal.cryptoname)
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {withdrawal.status !== "0" && (
                  <span className="text-gray-500 italic">No Actions</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No withdrawal requests found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Previous
        </button>
        <span className="mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          Next
        </button>
      </div>

      {message && (
        <div className="mt-4 text-center font-semibold text-green-500">{message}</div>
      )}
    </div>
  );
};

export default WithdrawalApproval;
