import React, { useState, useEffect } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import WalletModal from "./User/WalletModal";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("usertoken");
  const userId = sessionStorage.getItem("userId");
  const adminToken = sessionStorage.getItem("admintoken");
  const location = useLocation();

  const [wallet, setWallet] = useState([]);
  const [visibleFundingWallet, setVisibleFundingWallet] = useState("0.000000 INR");
  const [selectedCryptoname, setSelectedCryptoname] = useState("INR");
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const UserLoginPage = location.pathname === '/login' || location.pathname === '/register';
  const UserDashboardPage = location.pathname === '/';
  const AdminPage = location.pathname.startsWith('/admin');
  const AdminLoginPage = location.pathname === '/admin-login';
  const currency = <div className='bg-red-500 text-white'>$</div>


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/wallet/${userId}`);
        setWallet(response.data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };
    fetchData();
  }, [userId]);


  const getCryptoIcon = (symbol) => {
    
    try {
      return require(`cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`);
    } catch {
      if (symbol.toLowerCase() === 'busd') {
        return "./busd.png"; // Your custom BUSD icon path
      }else if (symbol.toLowerCase() === 'cro') {
        return "./cro.png";
      }else if (symbol.toLowerCase() === 'shib') {
        return "./shib.png";
      }else if(symbol.toLowerCase() === 'inr'){
        return "./inr.png";
      }else if(symbol.toLowerCase() === 'cp'){
        return "./inr.png";
      }
      return require('cryptocurrency-icons/svg/color/generic.svg'); // Fallback for unknown currencies
    }
  };

  useEffect(() => {
    const selectedWallet = wallet.find((entry) => entry.cryptoname === selectedCryptoname);
    if (selectedWallet) {
      setVisibleFundingWallet(`${parseFloat(selectedWallet.balance).toFixed(6)} ${selectedCryptoname}`);
    } else {
      setVisibleFundingWallet("0.000000 INR");
    }
  }, [selectedCryptoname, wallet]);

  const handleLogout = () => {
    sessionStorage.removeItem("usertoken");
    navigate("/login");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className="flex flex-row justify-between items-center p-2 lg:p-4 shadow-md w-full fixed h-16 z-50"
      style={{ backgroundColor: "rgba(41, 69, 52, 255)" }}
    >
      {/* App Title */}
      <h1 className="text-white text-sm lg:text-xl font-bold">
        <Link to="/">My App</Link>
      </h1>

      {/* Wallet Information */}
      {userToken && !AdminPage &&  (
        <div className="flex items-center space-x-2 lg:space-x-4">
          <button
            className="bg-gray-800 text-white py-1 px-2 lg:py-2 lg:px-8 rounded text-sm lg:text-md hover:border-transparent"
            onClick={() => setHovered((prev) => !prev)}
          >
            {visibleFundingWallet} ▾
          </button>

          {hovered && (
            <div className="flex flex-col absolute top-16 bg-white text-black w-2/3 sm:w-2/3 lg:w-1/4 mx-auto  rounded shadow-lg z-50 max-h-85">
            <ul className="max-h-70 overflow-y-auto">
              <span className="absolute right-0 bg-white text-black w-full mt-14 rounded shadow-lg z-[1050] max-h-85">
              {wallet.map((entry, index) => (
                <li
                key={index}
                className="flex flex-row justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setSelectedCryptoname(entry.cryptoname)}
              >
                
                <span>{parseFloat(entry.balance).toFixed(6)}</span>
                <div className='flex flex-row'>
                <img
                  src={getCryptoIcon(entry.cryptoname)}
                  alt={entry.cryptoname}
                  className="w-6 h-6 mr-2"
                />
                <span>{(entry.cryptoname)}</span>
                </div>
               
              </li>
              ))}
              </span>
            </ul>
            <button
                  className='flex flex-row justify-center items-center p-2 hover:bg-gray-100 cursor-pointer mx-auto my-2 border rounded'
                >
                  <FaCog className="text-gray-500 mr-2" />Wallet Setting
                </button>
              
          </div>
                




            
          )}

          <button
            className="bg-green-500 text-white py-1 px-2 lg:py-2 lg:px-8 rounded text-sm lg:text-md hover:bg-green-700"
            onClick={toggleModal}
          >
            My Wallet
          </button>
        </div>
      )}

      {/* Logout Button */}
      {userToken && !AdminLoginPage && !AdminPage &&  (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 lg:py-2 lg:px-8 rounded text-sm lg:text-md font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
      {UserLoginPage && (
  <button
    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 lg:py-2 lg:px-8 rounded text-sm lg:text-md font-bold"
    onClick={() => navigate('/admin-login')}
  >
    Admin Login
  </button>
)}

       {/* Admin Logout Button */}
       {adminToken && AdminPage && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => {
              sessionStorage.removeItem('admintoken');
              navigate('/admin-login');
            }}
          >
            Logout as Admin
          </button>
        )}

      {/* Wallet Modal */}
      {isModalOpen && (
        <WalletModal
          visibleFundingWallet={visibleFundingWallet}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default Header;
