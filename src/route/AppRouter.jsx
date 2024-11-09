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
import ProtectRouter from "./ProtectRouter";
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
      { path: "registerpartner", element: <ProtectRouter element={<RegisterPartner/>} reqRole={['USER']}/>},
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
    element: <ProtectRouter element={<HomeUser />} reqRole={['USER','PARTNER']}/>,
    children: [
      { path: "edit", element:  <ProtectRouter element={<ProfileForm />} reqRole={['USER','PARTNER']}/>},
      { path: "purchasehistory", element:  <ProtectRouter element={<MyPurchase />} reqRole={['USER','PARTNER']}/>},
      { path: "reviewhistory", element: <ProtectRouter element={<ReviewTabHistory /> } reqRole={['USER','PARTNER']}/>},
    ],
  },
  {
    path: "/admin",
    element: <ProtectRouter element={<HomeAdmin /> } reqRole={['ADMIN']}/>,
    children: [
      // { index: true, element: <HomeAdmin /> },
      { index: true, element:  <ProtectRouter element={<DashboardAdmin /> } reqRole={['ADMIN']}/>},
      { path: "userDetailAdmin", element:  <ProtectRouter element={<UserDetailAdmin />} reqRole={['ADMIN']}/>},
      { path: "bookingDetailAdmin", element:  <ProtectRouter element={<BookingDetailAdmin /> } reqRole={['ADMIN']}/>},
      { path: "hotelDetailAdmin", element:  <ProtectRouter element={<HotelDetailAdmin /> } reqRole={['ADMIN']}/>},
      { path: "promotionDetailAdmin", element:  <ProtectRouter element={<PromotionDetailAdmin /> } reqRole={['ADMIN']}/>},
      { path: "reviewDetailAdmin", element:  <ProtectRouter element={<ReviewDetailAdmin /> } reqRole={['ADMIN']}/>},
    ],
  },
  {
    path: "/partner",
    element: <ProtectRouter element={<HomePartner /> } reqRole={['PARTNER']}/>,
    children: [
      // { index: true, element: <HomePartner /> },

      { path: "bookingDetailPartner", element: <ProtectRouter element={<BookingDetailPartner /> } reqRole={['PARTNER']}/> },
      { path: "hotelPartner", element:  <ProtectRouter element={<HotelPartner /> } reqRole={['PARTNER']}/>},
      { path: "reviewDetailPartner", element: <ProtectRouter element={<ReviewDetailPartner />  } reqRole={['PARTNER']}/>},
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
