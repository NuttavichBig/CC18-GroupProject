import AppRouter from "./route/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId = "">
      <AppRouter />
    </GoogleOAuthProvider>
  );
}
