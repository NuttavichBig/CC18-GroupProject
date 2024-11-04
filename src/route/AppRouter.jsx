import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "../../src/pages/User-Guest/HomePage";
import SelectHotel from "../pages/User-Guest/SelectHotel";
import SelectHotelDetail from "../pages/User-Guest/SelectHotelDetail";
import HotelDetailToPayment from "../pages/User-Guest/HotelDetailToPayment";
import HotelPayment from "../pages/User-Guest/HotelPayment";
import HotelPaymentSucessSummary from "../pages/User-Guest/HotelPaymentSucessSummary";
import HotelPromotion from "../pages/User-Guest/HotelPromotion";

//////////////////////////////////////////////บนนี้ทำแล้ว

// import PaymentDetail from "../pages/User-Guest/PaymentDetail";
// import PaymentSummary from "../pages/User-Guest/PaymentSummary";
// import PaymentFinal from "../pages/User-Guest/PaymentFinal";
// import PromotionPage from "../pages/User-Guest/PromotionPage";
// import RegisterPartner from "../pages/Partner/RegisterPartner";
// import ManageOwnAccount from "../pages/User-Guest/ManageOwnAccount";
// import OwnPurchase from "../pages/User-Guest/OwnPurchase";
// import OwnReview from "../pages/User-Guest/OwnReview";
import BookingDetailAdmin from "../pages/Admin/BookingDetailAdmin";
import HotelDetailAdmin from "../pages/Admin/HotelDetailAdmin";
import PromotionDetailAdmin from "../pages/Admin/PromotionDetailAdmin";
import ReviewDetailAdmin from "../pages/Admin/ReviewDetailAdmin";
import UserDetailAdmin from "../pages/Admin/UserDetailAdmin";
import HomeAdmin from "../pages/Admin/HomeAdmin";
import DashboardAdmin from "../pages/Admin/DashboardAdmin";
// import HomePartner from "../pages/Partner/HomePartner";
// import BookingDetailPartner from "../pages/Partner/BookingDetailPartner";
// import ReviewDetailPartner from "../pages/Partner/ReviewDetailPartner";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "select-hotel", element: <SelectHotel /> },
      { path: "select-hotel-detail", element: <SelectHotelDetail /> },
      { path: "select-hotel-detail-payment", element: <HotelDetailToPayment /> },
      { path: "select-hotel-detail-payment-method", element: <HotelPayment /> },
      { path: "select-hotel-detail-payment-method-success", element: <HotelPaymentSucessSummary /> },
      { path: "promotion", element: <HotelPromotion /> },
      //////////////////////////////////////////////บนนี้ทำแล้วล่างไว้พิจารณา เตรียมลบ ยังไม่มี /user

      // { path: "paymentDetail", element: <PaymentDetail /> },
      // { path: "paymentSummery", element: <PaymentSummary /> },
      // { path: "paymentFinal", element: <PaymentFinal /> },
      // { path: "promotion", element: <PromotionPage /> },
      // { path: "registerPartner", element: <RegisterPartner /> },
      // { path: "manageAccount", element: <ManageOwnAccount /> },
      // { path: "OwnPurchase", element: <OwnPurchase /> },
      // { path: "OwnReview", element: <OwnReview /> },
    ],
  },
  {
    path: "/user",
    element: <Outlet />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "select-hotel", element: <SelectHotel /> },
      { path: "select-hotel-detail", element: <SelectHotelDetail /> },

      { path: "select-hotel-detail-payment", element: <HotelDetailToPayment /> },
      { path: "select-hotel-detail-payment-method", element: <HotelPayment /> },
      { path: "select-hotel-detail-payment-method-success", element: <HotelPaymentSucessSummary /> },
      { path: "promotion", element: <HotelPromotion /> },

    ],
  },
  {
    path: "/admin",
    element: <HomeAdmin />,
    children: [
      // { index: true, element: <HomeAdmin /> },
      { path: "dashboard", element: <DashboardAdmin /> },
      { path: "userDetailAdmin", element: <UserDetailAdmin /> },
      { path: "bookingDetailAdmin", element: <BookingDetailAdmin /> },
      { path: "hotelDetailAdmin", element: <HotelDetailAdmin /> },
      { path: "promotionDetailAdmin", element: <PromotionDetailAdmin /> },
      { path: "reviewDetailAdmin", element: <ReviewDetailAdmin /> },
    ],
  },
  {
    path: "/partner",
    // element: <HomePartner />,
    children: [
      // { path: "bookingDetailPartner", element: <BookingDetailPartner /> },
      // { path: "registerPartner", element: <RegisterPartner /> },
      // { path: "reviewDetailPartner", element: <ReviewDetailPartner /> },
    ],
  },
]);
export default function AppRouter() {
  return (
    <>
      <RouterProvider router={MainRouter} />
    </>
  );
}
