import { PushNotification } from '../PWA/PushNotification';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import useOnlineStatus from '../../hooks/useOnlineStatus';
import InstallPrompt from '../PWA/InstallPrompt';
import Offline from '../PWA/Offline';
import NavBar from "../Layout/NavBar";
import TitleBar from "../Layout/TitleBar";
import Cadastro from "../Pages/Cadastro";
import Home from "../Pages/Home";

function App() {
  const isOnline = useOnlineStatus();
  
  return (
        <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
      <BrowserRouter>
    <div className="App">
      {/* Online status banner */}
      {!isOnline && (
        <div style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          zIndex: 1000
        }}>
          ⚠️ You are currently offline
        </div>
      )}
      
      {/* Show Offline component when offline */}
      {!isOnline ? (
        <Offline />
      ) : (
        <div className="main">
          <PushNotification />
          <TitleBar />
          <Routes>
            {/* SUAS ROTAS VÊM AQUI */}
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
          </Routes>
          <NavBar />
        </div>
      )}
      <InstallPrompt />
    </div>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App
