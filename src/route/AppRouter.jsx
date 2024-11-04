import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "../../src/pages/User-Guest/HomePage";



//////////////////////////////////////////////บนนี้ทำแล้ว

import SelectHotel from "../pages/User-Guest/SelectHotel";

import SelectDetail from "../pages/User-Guest/SelectDetail";
import PaymentDetail from "../pages/User-Guest/PaymentDetail";
import PaymentSummary from "../pages/User-Guest/PaymentSummary";
import PaymentFinal from "../pages/User-Guest/PaymentFinal";
import PromotionPage from "../pages/User-Guest/PromotionPage";
import RegisterPartner from "../pages/Partner/RegisterPartner";
import ManageOwnAccount from "../pages/User-Guest/ManageOwnAccount";
import OwnPurchase from "../pages/User-Guest/OwnPurchase";
import OwnReview from "../pages/User-Guest/OwnReview";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import BookingDetailAdmin from "../pages/Admin/BookingDetailAdmin";
import HotelDetailAdmin from "../pages/Admin/HotelDetailAdmin";
import PromotionDetailAdmin from "../pages/Admin/PromotionDetailAdmin";
import ReviewDetailAdmin from "../pages/Admin/ReviewDetailAdmin";
import UserDetailAdmin from "../pages/Admin/UserDetailAdmin";
import HomePartner from "../pages/Partner/HomePartner";
import BookingDetailPartner from "../pages/Partner/BookingDetailPartner";
import ReviewDetailPartner from "../pages/Partner/ReviewDetailPartner";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "selecthotel", element: <SelectHotel /> },

      //////////////////////////////////////////////บนนี้ทำแล้วล่างไว้พิจารณา เตรียมลบ ยังไม่มี /user

      { path: "selectDetail", element: <SelectDetail /> },
      { path: "paymentDetail", element: <PaymentDetail /> },
      { path: "paymentSummery", element: <PaymentSummary /> },
      { path: "paymentFinal", element: <PaymentFinal /> },
      { path: "promotion", element: <PromotionPage /> },
      { path: "registerPartner", element: <RegisterPartner /> },
      { path: "manageAccount", element: <ManageOwnAccount /> },
      { path: "OwnPurchase", element: <OwnPurchase /> },
      { path: "OwnReview", element: <OwnReview /> },
    ],
  },
  {
    path: "/user",
    element: <Outlet />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "selecthotel", element: <SelectHotel /> },

    ],
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
    children: [
      { path: "userDetailAdmin", element: <UserDetailAdmin /> },
      { path: "bookingDetailAdmin", element: <BookingDetailAdmin /> },
      { path: "hotelDetailAdmin", element: <HotelDetailAdmin /> },
      { path: "promotionDetailAdmin", element: <PromotionDetailAdmin /> },
      { path: "reviewDetailAdmin", element: <ReviewDetailAdmin /> },
    ],
  },
  {
    path: "/partner",
    element: <HomePartner />,
    children: [
      { path: "bookingDetailPartner", element: <BookingDetailPartner /> },
      { path: "registerPartner", element: <RegisterPartner /> },
      { path: "reviewDetailPartner", element: <ReviewDetailPartner /> },
    ],
  },
]);
export default function AppRouter() {
  return (
    <>
      <RouterProvider router={MainRouter} />
    </>
  )
}