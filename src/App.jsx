//-----------Libraries-----------//
import { initJuno } from "@junobuild/core";
import { useEffect } from "react";

//-----------Providers-----------//
import Routes from "./providers/routerProvider.jsx";
import { Auth } from "./Auth.jsx";
import { DarkModeProvider } from './providers/DarkModeProvider';
import UpgradeMessage from "./components/UpgradeMessage";

const App = () => {
  useEffect(() => {
    (async () =>
      await initJuno({
        satelliteId: "3ug6g-vaaaa-aaaal-aseca-cai",
      }))();
  }, []);

  return (
    <>
      <UpgradeMessage />
      <DarkModeProvider>
        <Auth>
          <Routes />
        </Auth>
      </DarkModeProvider>
    </>
  );
};

export default App;
