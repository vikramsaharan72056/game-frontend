
import { BASE_URL } from "./config";
//Games
export const GET_ALL_GAMES = `${BASE_URL}/api/games/allgames`;
export const GET_GAME_BY_ID = (id) => `${BASE_URL}/api/games/game/${id}`;
export const ADD_GAME = `${BASE_URL}/api/games/addgame`;
export const UPDATE_GAME = (id) => `${BASE_URL}/api/games/updategame/${id}`;
export const DELETE_GAME = (id) => `${BASE_URL}/api/games/deletegame/${id}`;

  //Users
  export const GET_ALL_USERS = `${BASE_URL}/api/user/allusers`;
  export const GET_USER_BY_ID = (id) => `${BASE_URL}/api/user/user/${id}`;
  
  export const UPDATE_USER = (id) => `${BASE_URL}/api/user/user/${id}`;
  export const DELETE_USER = (id) => `${BASE_URL}/api/user/user/${id}`;
  
  export const UPDATE_USER_PASSWORD = (id) => `${BASE_URL}/api/user/user/${id}/password`;
  export const USER_LOGIN = `${BASE_URL}/api/user/login`;
  export const REGISTER_USER = `${BASE_URL}/api/user/register`;

  //KYC
  export const GET_KYC_DETAILS_BY_USER_ID = (id) => `${BASE_URL}/api/user/user/${id}/kyc`;
  export const UPDATE_KYC_STATUS = (id) => `${BASE_URL}/api/user/user/${id}/kyc`;

  //Wallet Deposite and Withdrawl

  export const WALLET_WITHDRAW = `${BASE_URL}/api/wallet/withdrawl`;
  export const WALLET_DEPOSITE = `${BASE_URL}/api/user/wallet/balance`;
  export const WITHDRAWL_STATUS_UPDATE_BY_ADMIN = (id) => `${BASE_URL}/api/wallet/withdrawl/${id}`;

//Admin 
export const ADMIN_LOGIN = `${BASE_URL}/api/admin/admin-login`;
export const ADD_USER_BY_ADMIN = `${BASE_URL}/api/admin/user`;

//Slider
    export const GET_ALL_SLIDERS = `${BASE_URL}/api/slider/sliders`;
    export const ADD_SLIDER = `${BASE_URL}/api/slider/slider`;
    export const UPDATE_SLIDER = (id) => `${BASE_URL}/api/slider/slider/${id}`;
    export const DELETE_SLIDER = (id) => `${BASE_URL}/api/slider/slider/${id}`;


//Bank Accounts
export const GET_ALL_BANK_ACCOUNTS = `${BASE_URL}/api/bankaccount/getall`;
export const UPDATE_BANK_ACCOUNT = (id) => `${BASE_URL}/api/bankaccount/update/${id}`;
export const GET_BANK_ACCOUNTS_BY_USER_ID = (id) => `${BASE_URL}/api/bankaccount/getone/user/${id}`;
export const ADD_BANK_ACCOUNT = `${BASE_URL}/api/bankaccount/addnew`;
export const DELETE_BANK_ACCOUNT = (id) => `${BASE_URL}/api/bankaccount/delete/${id}`;