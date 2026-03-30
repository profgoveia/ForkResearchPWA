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
import Login from "../Pages/Login"

function App() {
  const isOnline = useOnlineStatus();
  
  return (
        <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
      <BrowserRouter>
    <div className="App">
      <div className="main">
          <TitleBar />
          <div style={{padding:8}}>
            <PushNotification />
            {!isOnline && <Offline />}
          </div>
          <Routes>
            {/* SUAS ROTAS VÊM AQUI */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
          />
          </Routes>
          <NavBar />
        </div>
      <InstallPrompt />
    </div>
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App
