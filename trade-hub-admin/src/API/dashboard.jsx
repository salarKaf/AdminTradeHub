import axios from "axios";
import {coreBaseURL} from './api';

const getToken = () => localStorage.getItem("admin");

export const fetchDashboardStats = async () => {
  const res = await axios.get(`${coreBaseURL}/admin/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};

export const fetchUserSellerStats = async () => {
  const res = await axios.get(`${coreBaseURL}/admin/dashboard/user-seller-stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.data;
};




export const fetchTotalRevenue = async () => {
  const token = localStorage.getItem("admin");

  const response = await axios.get(`${coreBaseURL}/admin/dashboard/revenue`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

export const fetchPlanRevenue = async () => {
  const token = localStorage.getItem("admin");

  const response = await axios.get( `${coreBaseURL}/admin/dashboard/plan-revenue`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};



export const fetchRevenueStats = async () => {
  const token = localStorage.getItem("admin");

  const response = await axios.get(`${coreBaseURL}/admin/dashboard/revenue-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};





export const fetchMonthlyGrowth = async () => {
  const token = localStorage.getItem("admin");

  const response = await axios.get( `${coreBaseURL}/admin/dashboard/monthly-growth` , {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data; 
};



export const fetchRevenueTrend = async () => {
  const token = localStorage.getItem("admin");

  const response = await axios.get(`${coreBaseURL}/admin/dashboard/revenue_trend`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data; 
};
