import React, { useEffect, useState } from "react";
import AllChatAdmin from "../../pages/Admin/AllChatAdmin";
import useAdminStore from "../../stores/socket-store";
import { useShallow } from "zustand/shallow";
import hotel3 from "../../assets/hotel3.png";
import user2 from "../../assets/user2.png";
import star2 from "../../assets/star2.png";
import booking2 from "../../assets/booking2.png";

import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function DashboardAdmin({}) {
  const API = import.meta.env.VITE_API;

  const { socket, connect, setChatBoxNull } = useAdminStore(
    useShallow((state) => ({
      socket: state.socket,
      connect: state.connect,
      setChatBoxNull: state.setChatBoxNull,
    }))
  );
  const [chatBoxList, setChatBoxList] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [noti,setNoti] = useState(0);

  const [data, setData] = useState({
    totalUsers: 0,
    totalPartners: 0,
    totalBookings: 0,
    bookingTrends: [],
    revenue: 0,
    averageRating: 0,
    newUsersByMonth: [],
    newPartnersByMonth: [],
    popularBookingTypes: [],
    monthlySales: [],
    totalReview : [],
  });

  const [timePeriod, setTimePeriod] = useState("daily");

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  useEffect(() => {
    connect();
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("adminJoinComplete", (allLastMessage) => {
        setChatBoxList(allLastMessage);
      });
      socket.emit("adminJoin");
      socket.on("userMessage", (data) => {
        setChatBoxList((prevChatBoxList) => {
          const newData = data.data;
          const indx = prevChatBoxList.findIndex(
            (item) => item.id === newData.id
          );
          let newArr = [...prevChatBoxList];
          if (indx !== -1) {
            newArr.splice(indx, 1);
          }
          newArr = [newData, ...newArr];
          return newArr;
        });
      });
      socket.on("userLeave", (delChat) => {
        console.log("someone leave");
        setChatBoxList((prev) => {
          const newData = prev.filter((item) => item.id !== delChat.id);
          return newData;
        });
        setChatBoxNull();
      });
      socket.on('adminRead',({data})=>{
        console.log('admin read')
        setChatBoxList(data)
      })
    }
    return () => {
      if (socket) {
        socket.off("userMessage");
        socket.off("userLeave");
        socket.off('adminRead')
      }
    };
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsersResponse = await axios.get(
          `${API}/adminDashboard/total-users`
        );
        const totalPartnersResponse = await axios.get(
          `${API}/adminDashboard/total-partners`
        );
        const totalBookingsResponse = await axios.get(
          `${API}/adminDashboard/total-bookings`
        );
        const bookingTrendsResponse = await axios.get(
          `${API}/adminDashboard/booking-trends`
        );
        const revenueResponse = await axios.get(
          `${API}/adminDashboard/revenue`
        );
        const averageRatingResponse = await axios.get(
          `${API}/adminDashboard/average-rating`
        );
        const newUsersByMonthResponse = await axios.get(
          `${API}/adminDashboard/new-users-by-month`
        );
        const newPartnersByMonthResponse = await axios.get(
          `${API}/adminDashboard/new-partners-by-month`
        );
        const popularBookingTypesResponse = await axios.get(
          `${API}/adminDashboard/popular-booking-types`
        );
        const monthlySalesResponse = await axios.get(
          `${API}/adminDashboard/monthly-sales`,
          {
            params: { timePeriod: timePeriod },
          }
        );
        const reviewList = await axios.get(`${API}/review?limit=999`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData({
          totalUsers: totalUsersResponse.data.totalUsers,
          totalPartners: totalPartnersResponse.data.totalPartners,
          totalBookings: totalBookingsResponse.data.totalBookings,
          bookingTrends: bookingTrendsResponse.data.bookingTrends,
          revenue: revenueResponse.data.totalRevenue,
          averageRating: averageRatingResponse.data.averageRating,
          newUsersByMonth: newUsersByMonthResponse.data.newUsers,
          newPartnersByMonth: newPartnersByMonthResponse.data.newPartners,
          popularBookingTypes:
            popularBookingTypesResponse.data.popularBookingTypes,
          monthlySales: monthlySalesResponse.data.monthlySales,
          totalReview : reviewList.data.data.length
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timePeriod]);


  useEffect(()=>{
    let noti = 0
    chatBoxList.map(item=>{
      const find = item.messages.find(chat=>chat.isRead === false)
      if(find){
        noti++
      }
    })
    setNoti(noti)
  },[chatBoxList])
  const bookingTrendsData = {
    labels: Array.isArray(data.bookingTrends)
      ? data.bookingTrends.map((item) =>
          new Date(item.createdAt).toLocaleDateString()
        )
      : [],
    datasets: [
      {
        label: "Bookings",
        data: Array.isArray(data.bookingTrends)
          ? data.bookingTrends.map((item) => item._count.id)
          : [],
        backgroundColor: "#2C6CB7",
        borderColor: "#002366",
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesData = {
    labels: Array.isArray(data.monthlySales)
      ? data.monthlySales.map((item) => {
          if (timePeriod === "daily") {
            return moment(item.createdAt).format("DD/MM/YYYY");
          } else if (timePeriod === "weekly") {
            return moment(item.createdAt).startOf("week").format("MM/DD/YYYY");
          } else if (timePeriod === "monthly") {
            return moment(item.createdAt).format("MM/YYYY");
          }
          return "";
        })
      : [],
    datasets: [
      {
        label: "Sales",
        data: Array.isArray(data.monthlySales)
          ? data.monthlySales.map((item) => item._sum.totalPrice)
          : [],
        fill: false,
        backgroundColor: "#4B96EB",
        borderColor: "#002366",
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Users", "Bookings"],
    datasets: [
      {
        data: [data.totalUsers, data.totalBookings],
        backgroundColor: ["#2c6cb7", "#4B96EB"],
        hoverOffset: 4,
      },
    ],
  };

  const newUsersAndPartnersData = {
    labels: Array.isArray(data.newUsersByMonth)
      ? data.newUsersByMonth.map((item) => {
          return moment(item.createdAt).format("MM/YYYY");
        })
      : [],
    datasets: [
      {
        label: "New Users",
        data: Array.isArray(data.newUsersByMonth)
          ? data.newUsersByMonth.map((item) => item._count.id)
          : [],
        backgroundColor: "#4B96EB",
        borderColor: "#002366",
        borderWidth: 1,
      },
      {
        label: "New Partners",
        data: Array.isArray(data.newPartnersByMonth)
          ? data.newPartnersByMonth.map((item) => item._count.id)
          : [],
        backgroundColor: "#5D8CC0",
        borderColor: "#495057",
        borderWidth: 1,
      },
    ],
  };

  const top3PopularBookingTypes = Array.isArray(data.popularBookingTypes)
    ? data.popularBookingTypes
        .sort((a, b) => (b._count?.id || 0) - (a._count?.id || 0))
        .slice(0, 3)
    : [];

  const popularBookingTypesData = {
    labels: top3PopularBookingTypes.map(
      (item) => item.hotel?.name || "Unknown"
    ),
    datasets: [
      {
        data: top3PopularBookingTypes.map((item) => item._count?.id || 0),
        backgroundColor: ["#2C6CB7", "#5D8CC0", "#627A96"],
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    cutout: "70%",
  };

  return (
    <>
      {chatOpen && (
        <AllChatAdmin setChatOpen={setChatOpen} chatBoxList={chatBoxList} />
      )}
      <div className="p-8 min-h-screen bg-white rounded-2xl">
        <div className="text-center mb-8 text-[#1b2c5c]">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {[
            {
              link: "/admin/bookingDetailAdmin",
              img: booking2,
              label: "TOTAL BOOKING",
              count: data.totalBookings,
            },
            {
              link: "/admin/userDetailAdmin",
              img: user2,
              label: "TOTAL USERS",
              count: data.totalUsers,
            },
            {
              link: "/admin/hotelDetailAdmin",
              img: hotel3,
              label: "TOTAL HOTELS",
              count: data.totalPartners,
            },
            {
              link: "/admin/reviewDetailAdmin",
              img: star2,
              label: "TOTAL REVIEWS",
              count: data.totalReview,
            },
          ].map(({ link, img, label, count }, index) => (
            <a
              key={index}
              href={link}
              className="rounded-lg p-6 bg-white text-[#0f0d41] font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-100 ease-in-out text-center cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img src={img} alt={label} className="w-16" />
                <div>
                  <span className="text-xl">{label}</span>
                  <p className="text-2xl font-extrabold">{count}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        {/* Chat Info */}
        <div className="bg-gradient-to-r from-[#0088d1] to-[#1E4D8C] p-6 rounded-lg shadow-2xl mb-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold text-white">TOTAL CHATS</p>
              <p className="text-3xl font-bold text-white">
                {chatBoxList.length}
              </p>
            </div>
            <button
              onClick={() => setChatOpen(true)}
              className="relative flex flex-col justify-center items-center rounded-full p-8 border-4 border-[#FFD700] bg-[#ffaa20] text-[#1954ba] font-semibold shadow-lg hover:bg-[#ff9a2e] hover:border-[#FFD700] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <p className="text-2xl font-bold">WAITING CHAT</p>
              <p className="absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-[#FF1744] rounded-full border-4 border-[#FFD700] bg-[#ffaa20] p-2">
                {noti}
              </p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-xl font-bold text-[#0d1141]">BOOKING TRENDS</p>
            <Bar data={bookingTrendsData} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="mb-6 flex justify-between">
              <p className="text-xl font-bold text-[#0f0d41]">MONTHLY SALES</p>
              <select
                id="timePeriod"
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="p-2 text-sm font-medium rounded-lg"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <Line
              key={timePeriod}
              data={monthlySalesData}
              options={{ responsive: true }}
            />
          </div>

          <div className="bg-white rounded-lg p-12 shadow-lg h-[500px]">
            <p className="text-xl font-bold text-[#0f0d41]">
              USERS VS BOOKINGS
            </p>
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-center">
            <p className="text-xl font-bold text-[#0f0d41]">
              NEW USERS & NEW PARTNERS BY MONTH
            </p>
            <Bar
              data={newUsersAndPartnersData}
              options={{ responsive: true }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-12 mt-6 shadow-lg h-[500px]">
            <p className="text-xl font-bold text-[#0f0d41]">
              POPULAR BOOKING TYPES
            </p>
            <Pie data={popularBookingTypesData} options={donutOptions} />
          </div>

          <div className="flex flex-col justify-center items-center gap-6 ">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full">
              <p className="text-xl font-bold text-[#0f0d41]">REVENUE</p>
              <p className="text-2xl font-semibold">${data.revenue}</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg w-full">
              <p className="text-xl font-bold text-[#0f0d41]">AVERAGE RATING</p>
              <p className="text-2xl font-semibold">{data.averageRating} ⭐</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
