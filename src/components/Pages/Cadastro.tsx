import { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import config from "../../utils/config";
import type { TFormThreadData } from "../../types/supabase";

const { Content } = Layout;

export default function Cadastro() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TFormThreadData>({
    threads: [],
    thread_types: [],
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const response = await fetch(`${config.edge}/list_threads_and_types`, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
      message.error("Ocorreu um erro ao buscar os dados");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(values: any) {
    try {
      setLoading(true);
      const data = {
        owner_id: localStorage.getItem("user_id"),
        ...values,
        parent_id: values.parent_id == "" ? null : values.parent_id,
      };
      const response = await fetch(`${config.table}/threads`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }
      message.success("Thread criada com sucesso!");
    } catch (error) {
      console.error(error);
      message.error("Ocorreu um erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "16px" }}>
        <Spin spinning={loading}>
          <Form form={form} layout="vertical" onFinish={onSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={18} md={12} lg={12}>
                <Form.Item
                  name="title"
                  label="Título"
                  rules={[{ required: true, message: "Informe o Título" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6}>
                <Form.Item
                  name="type"
                  label="Tipo"
                  rules={[{ required: true, message: "Informe o resumo" }]}
                >
                  <Select
                    options={data.thread_types.map((x) => ({
                      value: x,
                      label: x,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6} lg={6}>
                <Form.Item name="parent_id" label="Thread Pai">
                  <Select
                    options={data.threads.map((x) => ({
                      value: x.id,
                      label: x.title,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="abstract"
              label="Resumo"
              rules={[{ required: true, message: "Informe o resumo" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label={null} style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Content>
    </Layout>
  );
}
