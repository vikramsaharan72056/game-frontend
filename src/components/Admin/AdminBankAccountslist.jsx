import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_BANK_ACCOUNTS, UPDATE_BANK_ACCOUNT } from "../../constants/apiEndpoints";

const BankAccountList = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get(GET_ALL_BANK_ACCOUNTS);
      setBankAccounts(response.data);
      setFilteredAccounts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bank accounts:", err);
      setError("Failed to fetch bank accounts.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = bankAccounts.filter((account) =>
      ["accountname", "accountnumber", "ifsccode", "branch"]
        .map((key) => account[key]?.toLowerCase().includes(query))
        .some((match) => match)
    );
    setFilteredAccounts(filtered);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(UPDATE_BANK_ACCOUNT(id), { status: newStatus });
      setMessage(`Status updated to ${newStatus === 1 ? "Verified" : "Rejected"}.`);
      fetchBankAccounts();
    } catch (err) {
      console.error("Error updating status:", err);
      setMessage("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Bank Accounts</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by account name, number, IFSC code, or branch"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredAccounts.length > 0 ? (
        <div>
          {/* Table for larger screens */}
          <div className="hidden lg:block">
            <table className="w-full table-auto bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">User ID</th>
                  <th className="px-4 py-2 text-left">Account Name</th>
                  <th className="px-4 py-2 text-left">Account Number</th>
                  <th className="px-4 py-2 text-left">IFSC Code</th>
                  <th className="px-4 py-2 text-left">Branch</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, index) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{account.userId}</td>
                    <td className="px-4 py-2">{account.accountname}</td>
                    <td className="px-4 py-2">{account.accountnumber}</td>
                    <td className="px-4 py-2">{account.ifsccode}</td>
                    <td className="px-4 py-2">{account.branch}</td>
                    <td className="px-4 py-2">
                      {account.status === 0
                        ? "Pending Approval"
                        : account.status === 1
                        ? "Verified"
                        : "Rejected"}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {account.status === 0 && (
                        <>
                          <button
                            onClick={() => updateStatus(account.id, 1)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => updateStatus(account.id, 2)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="block lg:hidden">
            {filteredAccounts.map((account, index) => (
              <div key={account.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="mb-2">
                  <strong>#{index + 1}</strong>
                </div>
                <div className="mb-2">
                  <strong>User ID:</strong> {account.userId}
                </div>
                <div className="mb-2">
                  <strong>Account Name:</strong> {account.accountname}
                </div>
                <div className="mb-2">
                  <strong>Account Number:</strong> {account.accountnumber}
                </div>
                <div className="mb-2">
                  <strong>IFSC Code:</strong> {account.ifsccode}
                </div>
                <div className="mb-2">
                  <strong>Branch:</strong> {account.branch}
                </div>
                <div className="mb-2">
                  <strong>Status:</strong>{" "}
                  {account.status === 0
                    ? "Pending Approval"
                    : account.status === 1
                    ? "Verified"
                    : "Rejected"}
                </div>
                {account.status === 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(account.id, 1)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => updateStatus(account.id, 2)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className="mt-4 text-center font-semibold text-green-500">{message}</div>
          )}
        </div>
      ) : (
        <p className="text-center">No matching bank accounts found.</p>
      )}
    </div>
  );
};

export default BankAccountList;
