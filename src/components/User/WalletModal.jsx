import React, { useState } from 'react';
import axios from 'axios';
import { WALLET_DEPOSITE, WALLET_WITHDRAW } from '../../constants/apiEndpoints';
import { useNavigate, Link } from 'react-router-dom';

const WalletModal = ({ visibleFundingWallet, toggleModal }) => {
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' or 'withdrawal'
  const [inputValue, setInputValue] = useState(''); // Input field state
  const [cryptoname, setCryptoname] = useState('BTC'); // Cryptoname selection
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({message:'',type:''}); // Success/Error message
  const userId = sessionStorage.getItem('userId');

  const navigate = useNavigate();

  // API Call Function
  const handleApiCall = async (action) => {
    if (!inputValue) return alert('Please enter a valid amount!');

    setLoading(true);
    setMessage({message:'',type:''});
    const endpoint =
      action === 'withdrawal' ? WALLET_WITHDRAW : WALLET_DEPOSITE;

    try {
      if (action === 'withdrawal') {
        // Fetch wallet details
        const walletDetails = await axios.get(`http://localhost:5000/api/user/wallet/${userId}`);
        const wallet = walletDetails.data.find((w) => w.cryptoname === cryptoname);

        if (!wallet) {
          setMessage({message:`No wallet found for ${cryptoname}.`,type:"Error"});
          setTimeout(() => setMessage({message:'',type:''}), 3000);
          return;
        }

        const availableBalance = wallet.balance; // Current balance
        const minWithdrawLimit = cryptoname === 'INR' ? 500 : 10;

        // Check minimum withdrawal limit
        if (parseFloat(inputValue) < minWithdrawLimit) {
          setMessage({message:`Minimum withdrawal limit is ${minWithdrawLimit} ${cryptoname}.`,type:"Error"});
          setTimeout(() => setMessage({message:'',type:''}), 3000);

          return;
        }

        // Check sufficient balance
        if (parseFloat(inputValue) > availableBalance) {
          setMessage({message:`Insufficient balance. Available: ${availableBalance} ${cryptoname}.`,type:"Error"});
          setTimeout(() => setMessage({message:'',type:''}), 2000);

          return;
        }
      }

      const payload = {
        userId: userId,
        balance: inputValue,
        cryptoname: cryptoname,
        status: 0, // Default status for withdrawal
      };

      const response =
        action === 'withdrawal'
          ? await axios.post(endpoint, payload)
          : await axios.put(endpoint, payload);

      console.log(`${action} success:`, response.data);
      setMessage({message:`${action.charAt(0).toUpperCase() + action.slice(1)} Successful!`,type:"Success"});
      setTimeout(() => setMessage({message:'',type:''}), 2000);

      // Delay for 2 seconds to show the success message, then navigate
      setTimeout(() => {
        toggleModal();
        navigate("/dashboard");
    }, 2000);

      setInputValue('');
      
    } catch (error) {
      console.error(`${action} error:`, error.response?.data || error.message);
      setMessage({message:`Failed to ${action}.`,type:"Error"});
      setTimeout(() => setMessage({message:'',type:''}), 3000);

    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: 'BTC', label: 'BTC' },
    { value: 'ETH', label: 'ETH' },
    { value: 'LTC', label: 'LTC' },
    { value: 'USDT', label: 'USDT' },
    { value: 'SOL', label: 'SOL' },
    { value: 'DOGE', label: 'DOGE' },
    { value: 'BCH', label: 'BCH' },
    { value: 'XRP', label: 'XRP' },
    { value: 'TRX', label: 'TRX' },
    { value: 'EOS', label: 'EOS' },
    { value: 'INR', label: 'INR' },
    { value: 'CP', label: 'CP' },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 flex flex-col h-[500px] text-black">
        {/* Buttons for Deposit and Withdrawal */}
        <div className="flex">
          <button
            className={`w-1/2 py-3 text-center font-bold ${
              activeTab === 'deposit' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('deposit');
              setInputValue('');
            }}
          >
            Deposit
          </button>
          <button
            className={`w-1/2 py-3 text-center font-bold ${
              activeTab === 'withdrawal' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => {
              setActiveTab('withdrawal');
              setInputValue('');
            }}
          >
            Withdrawal
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow justify-center">
          <h2 className="text-xl font-bold mb-4 text-center">
            {activeTab === 'deposit' ? 'Deposit Funds' : 'Withdraw Funds'}
          </h2>

          {message.message && (
            <p
              className={`my-4 text-center font-semibold ${
                message.type === 'Error'?'text-red-500' : 'text-green-500'
              }`}
            >
              {message.message}
            </p>
            
          )}

          {/* Cryptoname Selection */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Select Cryptocurrency</label>
            <select
              value={cryptoname}
              onChange={(e) => setCryptoname(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Input Field */}
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter amount to ${activeTab}`}
            className="border p-2 rounded w-full mb-4"
          />

          {/* Submit Button */}
          <button
            onClick={() => handleApiCall(activeTab)}
            disabled={!inputValue || loading}
            className={`py-2 px-4 rounded w-full font-bold text-white ${
              activeTab === 'deposit' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : `Confirm ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
          </button>

          
          
        </div>

        {/* Close Button */}
        <button
          className="mt-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-b hover:bg-gray-400"
          onClick={toggleModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
