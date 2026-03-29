import { BookTwoTone } from "@ant-design/icons";
import { Layout, Typography } from "antd";
const { Header } = Layout;
const { Title } = Typography;

export default function TitleBar() {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Title level={2} style={{ margin: 0, textAlign: "center" }}>
        <BookTwoTone type="" />
        Fork Research
      </Title>
      <div />
    </Header>
  );
}
