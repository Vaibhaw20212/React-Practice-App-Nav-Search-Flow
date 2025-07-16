import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function BitcoinChartPage() {
  // Try to load date from localStorage, fallback to today
  const getInitialDate = () => {
    const saved = localStorage.getItem("btc_chart_date");
    return saved ? new Date(saved) : new Date();
  };
  const [date, setDate] = useState(getInitialDate());
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (selectedDate) => {
    setLoading(true);
    setError("");
    setChartData(null);
    try {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const dd = String(selectedDate.getDate()).padStart(2, "0");
      // Coingecko API: https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&date=dd-mm-yyyy
      // But for historical, use: /coins/bitcoin/history?date=dd-mm-yyyy
      // For chart, use market_chart/range with timestamps
      const from = Math.floor(new Date(`${yyyy}-${mm}-${dd}T00:00:00Z`).getTime() / 1000);
      const to = Math.floor(new Date(`${yyyy}-${mm}-${dd}T23:59:59Z`).getTime() / 1000);
      const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from}&to=${to}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      if (!data.prices || data.prices.length === 0) throw new Error("No data for this day");
      setChartData({
        labels: data.prices.map(([ts]) => new Date(ts).toLocaleTimeString()),
        datasets: [
          {
            label: "BTC Price (USD)",
            data: data.prices.map(([, price]) => price),
            borderColor: "#f7931a",
            backgroundColor: "rgba(247,147,26,0.1)",
            tension: 0.2,
          },
        ],
      });
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(date);
    // eslint-disable-next-line
  }, [date]);

  // Save date to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("btc_chart_date", date.toISOString());
  }, [date]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 2 }}>
        <Typography variant="h4" mb={3} align="center">
          Bitcoin Price Chart by Date
        </Typography>
        <Paper sx={{ p: 2, mb: 3, display: "flex", justifyContent: "center" }}>
          <DatePicker
            label="Pick a date"
            value={date}
            onChange={(newDate) => newDate && setDate(newDate)}
            maxDate={new Date()}
          />
        </Paper>
        {loading && <Typography align="center">Loading...</Typography>}
        {error && <Typography color="error" align="center">{error}</Typography>}
        {chartData && (
          <Paper sx={{ p: 2 }}>
            <Line data={chartData} options={{
              responsive: true,
              plugins: { legend: { display: true, position: "top" } },
              scales: { x: { title: { display: true, text: "Time" } }, y: { title: { display: true, text: "USD" } } },
            }} />
          </Paper>
        )}
      </Box>
    </LocalizationProvider>
  );
}
