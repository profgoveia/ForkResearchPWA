import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import config from "../../utils/config";


const { Title } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);

  async function handleLogin(values: any) {
    setLoading(true);

    try {
      const res = await fetch(
        `${config.edge}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao fazer login");
      }

      // salva tokens
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user_id", data.user.id);

      message.success("Login realizado com sucesso!");

      // redirecionar
      window.location.href = "/home";
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 350 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: "Informe seu e-mail" },
              { type: "email", message: "E-mail inválido" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="email@exemplo.com" />
          </Form.Item>

          <Form.Item
            name="senha"
            label="Senha"
            rules={[{ required: true, message: "Informe sua senha" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Sua senha"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}