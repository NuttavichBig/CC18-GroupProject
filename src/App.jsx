import AppRouter from "./route/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId="566477429345-tl0j5fcllt4kbm1tmbesjrplglsd4r8q.apps.googleusercontent.com">
      <AppRouter />
    </GoogleOAuthProvider>
  );
}
