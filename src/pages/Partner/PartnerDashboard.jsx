import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/user-store";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const API = import.meta.env.VITE_API;

const PartnerDashboard = () => {
  const token = useUserStore((state) => state.token);
  const [bookings, setBookings] = useState([]);
  const [todayBookings, setTodayBookings] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookingTrends, setBookingTrends] = useState([]);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [statusBreakdown, setStatusBreakdown] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const result = await axios.get(
        `${API}/booking?limit=100&orderBy=desc&sortBy=createdAt`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const bookingsData = result.data.data;
      setBookings(bookingsData);

      // Calculate metrics
      const today = new Date().toISOString().split("T")[0];
      const todayBookingsCount = bookingsData.filter(
        (booking) => booking.checkinDate.split("T")[0] === today
      ).length;
      const totalRevenueAmount = bookingsData.reduce(
        (sum, booking) => sum + parseFloat(booking.totalPrice),
        0
      );

      setTodayBookings(todayBookingsCount);
      setTotalBookings(bookingsData.length);
      setTotalRevenue(totalRevenueAmount);

      // Process chart data
      processChartData(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const processChartData = (data) => {
    const bookingCounts = {};
    const revenueCounts = {};
    const statusCounts = { CONFIRMED: 0, CANCELED: 0, PENDING: 0 };

    data.forEach((booking) => {
      const date = new Date(booking.checkinDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      bookingCounts[monthKey] = (bookingCounts[monthKey] || 0) + 1;
      revenueCounts[monthKey] = (revenueCounts[monthKey] || 0) + parseFloat(booking.totalPrice);
      statusCounts[booking.status] = (statusCounts[booking.status] || 0) + 1;
    });

    const sortedBookingTrends = Object.entries(bookingCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    const sortedRevenueTrends = Object.entries(revenueCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({ date, revenue }));

    setBookingTrends(sortedBookingTrends);
    setRevenueTrends(sortedRevenueTrends);
    setStatusBreakdown(Object.entries(statusCounts).map(([status, value]) => ({ status, value })));
  };

  // Colors for each booking status
  const statusColors = {
    CONFIRMED: "#82ca9d",
    CANCELED: "#f25746",
    PENDING: "#f2d450",
    COMPLETED: "#0088FE", // Add more colors if you have additional statuses
  };

  return (
    <div className="p-6 bg-[#FEF9F2] h-full">
      <h2 className="text-2xl font-semibold mb-8 text-gray-700">Partner Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Today's Bookings", value: todayBookings, icon: "📅" },
          { label: "Total Bookings", value: totalBookings, icon: "📖" },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: "💰" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-lg shadow-md flex flex-col items-start"
          >
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-full">
              <span className="text-indigo-500 text-2xl">{stat.icon}</span>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Booking Trends Chart (Bar Chart with Monthly Data) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Booking Trends (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3669f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trends Chart (Line Chart remains the same) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} domain={[0, "auto"]} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Breakdown Chart with Labels and Colors */}
        <div className="p-6 bg-white rounded-lg shadow-md col-span-1 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Booking Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={statusBreakdown}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`} // Show status name and count in the chart
                fill="#8884d8"
              >
                {statusBreakdown.map((entry) => (
                  <Cell
                    key={`cell-${entry.status}`}
                    fill={statusColors[entry.status] || "#8884d8"} // Use defined colors or fallback
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
