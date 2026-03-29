import { Menu } from "antd";
import { HomeOutlined, FormOutlined } from "@ant-design/icons";
import { useLocation, Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      key: "/cadastro",
      icon: <FormOutlined />,
      label: <Link to="/cadastro">Cadastro</Link>,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        borderTop: "1px solid #ddd",
      }}
    >
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        onClick={() => {}}
        items={items}
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      />
    </div>
  );
};

export default NavBar;
