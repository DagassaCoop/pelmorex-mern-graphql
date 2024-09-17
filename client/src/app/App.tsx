import { useLocation } from "react-router-dom";

// Provider
import Providers from "./providers";

// Layouts
import RootLayout from "../components/layouts/Root.layout";
import CleanLayout from "../components/layouts/Clean.layout";

function App() {
  const location = useLocation();
  const { pathname } = location;
  const inAuthPages = pathname === "/login" || pathname === "/registration";

  return (
    <Providers>
      {inAuthPages && <CleanLayout />}
      {!inAuthPages && <RootLayout />}
    </Providers>
  );
}

export default App;
