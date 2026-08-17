import { useCallback, useEffect, useState } from "react";

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


  // --------------------------------
  // Load Profile
  // --------------------------------

  const loadProfile = useCallback(async () => {

    if (!userEmail) {
      return null;
    }

    try {

      const data = await getProfile(userEmail);

      setProfile(data);

      return data;

    } catch (error) {

      console.error(
        "Profile loading failed:",
        error
      );

      return null;
    }

  }, [userEmail]);


  // --------------------------------
  // Load Watchlist
  // --------------------------------

  const loadWatchlist = useCallback(async () => {

    if (!userEmail) {
      setWatchlist([]);
      return [];
    }

    try {

      const data = await getWatchlist(userEmail);

      const stocks = Array.isArray(data)
        ? data
        : [];

      setWatchlist(stocks);

      return stocks;

    } catch (error) {

      console.error(
        "Watchlist loading failed:",
        error
      );

      setWatchlist([]);

      return [];
    }

  }, [userEmail]);


  // --------------------------------
  // Load Portfolio
  // --------------------------------

  const loadPortfolio = useCallback(async () => {

    if (!userEmail) {
      setPortfolio([]);
      return [];
    }

    try {

      const data = await getPortfolio(userEmail);

      const stocks = Array.isArray(data)
        ? data
        : [];

      setPortfolio(stocks);

      return stocks;

    } catch (error) {

      console.error(
        "Portfolio loading failed:",
        error
      );

      setPortfolio([]);

      return [];
    }

  }, [userEmail]);


  // --------------------------------
  // Load Analytics
  // --------------------------------

  const loadAnalytics = useCallback(async () => {

    if (!userEmail) {
      setAnalytics(null);
      return null;
    }

    try {

      const response = await api.get(
        `/analytics/${encodeURIComponent(userEmail)}`
      );

      setAnalytics(response.data);

      return response.data;

    } catch (error) {

      console.error(
        "Analytics loading failed:",
        error
      );

      setAnalytics(null);

      return null;
    }

  }, [userEmail]);


  // --------------------------------
  // Initial Dashboard Data
  // --------------------------------

  useEffect(() => {

    if (!userEmail) {

      setProfile(null);
      setPortfolio([]);
      setWatchlist([]);
      setAnalytics(null);

      return;
    }

    let cancelled = false;


    const fetchDashboardData = async () => {

      try {

        const [
          profileData,
          watchlistData,
          portfolioData,
          analyticsData,
        ] = await Promise.all([

          getProfile(userEmail),

          getWatchlist(userEmail),

          getPortfolio(userEmail),

          api.get(
            `/analytics/${encodeURIComponent(userEmail)}`
          ),

        ]);


        if (cancelled) {
          return;
        }


        setProfile(profileData);

        setWatchlist(
          Array.isArray(watchlistData)
            ? watchlistData
            : []
        );

        setPortfolio(
          Array.isArray(portfolioData)
            ? portfolioData
            : []
        );

        setAnalytics(
          analyticsData?.data ?? null
        );

      } catch (error) {

        if (cancelled) {
          return;
        }

        console.error(
          "Dashboard loading failed:",
          error
        );

      }

    };


    fetchDashboardData();


    return () => {

      cancelled = true;

    };

  }, [
    userEmail,
  ]);


  // --------------------------------
  // Search Stock
  // --------------------------------

  const handleSearch = useCallback(async (symbol) => {

    const cleanedSymbol = symbol
      ?.trim()
      .toUpperCase();


    if (!cleanedSymbol) {

      alert("Enter a stock symbol.");

      return;

    }


    try {

      setLoading(true);

      setNews([]);


      // ----------------------------
      // Stock Analysis
      // ----------------------------

      const analysisResponse = await api.get(
        `/analysis/${encodeURIComponent(cleanedSymbol)}`
      );


      const analysisData =
        analysisResponse.data;


      setAnalysis(analysisData);


      // ----------------------------
      // News
      // News failure should NOT
      // destroy successful analysis
      // ----------------------------

      try {

        const newsResponse = await api.get(
          `/news/${encodeURIComponent(cleanedSymbol)}`
        );


        setNews(
          Array.isArray(newsResponse.data?.news)
            ? newsResponse.data.news
            : []
        );

      } catch (newsError) {

        console.error(
          "News loading failed:",
          newsError
        );

        setNews([]);

      }

    } catch (error) {

      console.error(
        "Stock analysis failed:",
        error
      );

      setAnalysis(null);

      setNews([]);

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Stock not found.";

      alert(message);

    } finally {

      setLoading(false);

    }

  }, []);


  // --------------------------------
  // Add To Watchlist
  // --------------------------------

  const handleAddWatchlist = useCallback(async () => {

    if (!userEmail) {

      alert("Please login first.");

      return;

    }


    if (!analysis?.symbol) {

      alert("Search a stock first.");

      return;

    }


    try {

      const response = await addToWatchlist(

        userEmail,

        analysis.symbol

      );


      alert(
        response?.message ||
        "Watchlist updated."
      );


      await loadWatchlist();

    } catch (error) {

      console.error(
        "Watchlist update failed:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Unable to add watchlist."
      );

    }

  }, [
    userEmail,
    analysis,
    loadWatchlist,
  ]);


  // --------------------------------
  // Buy Stock
  // --------------------------------

  const handleBuyStock = useCallback(async () => {

    if (!userEmail) {

      alert("Please login first.");

      return;

    }


    if (!analysis?.symbol) {

      alert("Search a stock first.");

      return;

    }


    const price = Number(
      analysis.price
    );


    if (!Number.isFinite(price) || price <= 0) {

      alert("Invalid stock price.");

      return;

    }


    try {

      const response = await buyStock(

        userEmail,

        analysis.symbol,

        1,

        price

      );


      alert(
        response?.message ||
        "Stock Purchased Successfully"
      );


      await Promise.all([

        loadProfile(),

        loadPortfolio(),

        loadAnalytics(),

      ]);

    } catch (error) {

      console.error(
        "Stock purchase failed:",
        error
      );


      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Purchase Failed";


      alert(message);

    }

  }, [
    userEmail,
    analysis,
    loadProfile,
    loadPortfolio,
    loadAnalytics,
  ]);


  // --------------------------------
  // Return Dashboard Data
  // --------------------------------

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