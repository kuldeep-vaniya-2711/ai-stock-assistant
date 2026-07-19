import { useState, useEffect } from "react";

import api from "../services/api";

import { getCurrentUser } from "../utils/auth";

import {
  addToWatchlist,
  getWatchlist,
} from "../services/watchlist";

import {
  buyStock,
  getPortfolio,
} from "../services/portfolio";

import {
  getProfile,
} from "../services/user";

export default function useDashboard() {

  const [analysis, setAnalysis] = useState(null);

  const [analytics, setAnalytics] = useState(null);

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(false);

  const [watchlist, setWatchlist] = useState([]);

  const [portfolio, setPortfolio] = useState([]);

  const [profile, setProfile] = useState(null);

  const user = getCurrentUser();

  const userEmail = user?.email;

  const loadProfile = async () => {

    try {

      const data = await getProfile(userEmail);

      setProfile(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadWatchlist = async () => {

    try {

      const data = await getWatchlist(userEmail);

      setWatchlist(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadPortfolio = async () => {

    try {

      const data = await getPortfolio(userEmail);

      setPortfolio(data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadAnalytics = async () => {

    try {

      const res = await api.get(`/analytics/${userEmail}`);

      setAnalytics(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    if (!userEmail) return;

    const fetchData = async () => {

      await loadProfile();

      await loadWatchlist();

      await loadPortfolio();

      await loadAnalytics();

    };

    fetchData();

  }, [userEmail]);

  const handleSearch = async (symbol) => {

    try {

      setLoading(true);

      const analysisResponse = await api.get(`/analysis/${symbol}`);

      setAnalysis(analysisResponse.data);

      const newsResponse = await api.get(`/news/${symbol}`);

      setNews(newsResponse.data.news || []);

    } catch (error) {

      console.error(error);

      alert("Stock not found.");

      setAnalysis(null);

      setNews([]);

    } finally {

      setLoading(false);

    }

  };

  const handleAddWatchlist = async () => {

    if (!analysis) {

      alert("Search a stock first.");

      return;

    }

    try {

      const response = await addToWatchlist(

        userEmail,

        analysis.symbol

      );

      alert(response.message);

      await loadWatchlist();

    } catch (error) {

      console.error(error);

      alert("Unable to add watchlist.");

    }

  };

  const handleBuyStock = async () => {

    if (!analysis) {

      alert("Search a stock first.");

      return;

    }

    try {

      const response = await buyStock(

        userEmail,

        analysis.symbol,

        1,

        analysis.price

      );

      alert(

        response.message ||

        "Stock Purchased Successfully"

      );

      await loadProfile();

      await loadPortfolio();

      await loadAnalytics();

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(

          error.response.data.message ||

          "Purchase Failed"

        );

      } else {

        alert("Purchase Failed");

      }

    }

  };

  return {

    analysis,

    analytics,

    news,

    loading,

    profile,

    portfolio,

    watchlist,

    userEmail,

    loadProfile,

    loadPortfolio,

    loadWatchlist,

    loadAnalytics,

    handleSearch,

    handleAddWatchlist,

    handleBuyStock,

  };

}