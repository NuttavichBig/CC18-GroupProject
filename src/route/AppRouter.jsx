import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "../../src/pages/User-Guest/HomePage";
import SelectHotel from "../pages/User-Guest/SelectHotel";
import SelectHotelDetail from "../pages/User-Guest/SelectHotelDetail";
import HotelDetailToPayment from "../pages/User-Guest/HotelDetailToPayment";
import HotelPayment from "../pages/User-Guest/HotelPayment";
import HotelPaymentSucessSummary from "../pages/User-Guest/HotelPaymentSucessSummary";
import HotelPromotion from "../pages/User-Guest/HotelPromotion";
import RegisterPartner from "../pages/Partner/RegisterPartner";
import HomeUser from "../pages/User-Guest/HomeUser";
import ProfileForm from "../Components/UserProfile/ProfileForm";
import MyPurchase from "../Components/UserProfile/MyPurchase";
import ReviewTabHistory from "../Components/UserProfile/ReviewTabHistory";
//////////////////////////////////////////////

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

import HomePartner from "../pages/Partner/HomePartner";
import BookingDetailPartner from "../pages/Partner/BookingDetailPartner";
import ReviewDetailPartner from "../pages/Partner/ReviewDetailPartner";
import HotelPartner from "../pages/Partner/HotelPartner";
import PartnerUpdate from "../Components/Partner/PartnerUpdate";
import HotelUpdate from "../Components/Partner/HotelUpdate";
import RoomUpdate from "../Components/Partner/RoomUpdate";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "bookinghotel", element: <SelectHotel /> },
      { path: "bookinghotel-detail", element: <SelectHotelDetail /> },
      {
        path: "bookinghotel-detail-payment",
        element: <HotelDetailToPayment />,
      },
      { path: "bookinghotel-detail-payment-method", element: <HotelPayment /> },
      {
        path: "bookinghotel-detail-payment-method-summary",
        element: <HotelPaymentSucessSummary />,
      },
      { path: "promotion", element: <HotelPromotion /> },

      ////////////////////////////////

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
      { path: "registerpartner", element: <RegisterPartner /> },
      { path: "bookinghotel", element: <SelectHotel /> },
      { path: "bookinghotel-detail", element: <SelectHotelDetail /> },
      {
        path: "bookinghotel-detail-payment",
        element: <HotelDetailToPayment />,
      },
      { path: "bookinghotel-detail-payment-method", element: <HotelPayment /> },
      {
        path: "bookinghotel-detail-payment-method-summary",
        element: <HotelPaymentSucessSummary />,
      },
      { path: "promotion", element: <HotelPromotion /> },
    ],
  },

  {
    path: "/userprofile",
    element: <HomeUser />,
    children: [
      { path: "edit", element: <ProfileForm /> },
      { path: "purchasehistory", element: <MyPurchase /> },
      { path: "reviewhistory", element: <ReviewTabHistory /> },
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
    element: <HomePartner />,
    children: [
      // { index: true, element: <HomePartner /> },
      { path: "bookingDetailPartner", element: <BookingDetailPartner /> },
      { path: "hotelPartner", element: <HotelPartner /> },
      { path: "reviewDetailPartner", element: <ReviewDetailPartner /> },
      { path: "partnerUpdate", element: <PartnerUpdate /> },
      { path: "HotelUpdate", element: <HotelUpdate /> },
      { path: "roomUpdate", element: <RoomUpdate /> },
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
