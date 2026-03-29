import { useEffect, useState } from "react";
import { Layout, List, Card, Input, Button, message } from "antd";
import config from "../../utils/config";
import { DeleteOutlined } from "@ant-design/icons";
import type { TThread } from "../../types/supabase";

const { Content } = Layout;
const { Search } = Input;

export default function Home() {
  const [threads, setThreads] = useState<Array<TThread>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThreads();
  }, []);

  async function getThreads() {
    try {
      setLoading(true);
      const response = await fetch(`${config.table}/threads`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      });
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }
      const threads = await response.json();
      setThreads(threads);
    } catch (error) {
      console.error(error);
      message.error("Ocorreu um erro ao buscar as Threads");
    } finally {
      setLoading(false);
    }
  }

  function onDelete(id: string) {
    return async function () {
      try {
        setLoading(true);
        const response = await fetch(`${config.table}/threads?id=eq.${id}`, {
          method: "DELETE",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }
        await getThreads();
        message.success("Thread excluída com sucesso");
      } catch (error) {
        console.error(error);
        message.error("Ocorreu um erro ao excluir a Thread");
      } finally {
        setLoading(false);
      }
    };
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content style={{ margin: 16 }}>
          <Search
            placeholder="Buscar produções acadêmicas..."
            allowClear
            enterButton="Buscar"
            size="large"
            style={{ marginBottom: 16 }}
          />
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={threads}
            loading={loading}
            renderItem={(item: TThread) => (
              <List.Item>
                <Card
                  title={item.title}
                  extra={
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={onDelete(item.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  }
                >
                  <CardThread {...item} />
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

const CardThread = ({ type, parent_id, abstract }: TThread) => {
  return (
    <>
      <div>
        <span style={{ fontWeight: "bold" }}>Tipo:</span> {type}
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>Thread Pai:</span>{" "}
        {parent_id ? parent_id : "Nenhum"}
      </div>
      <p>{abstract}</p>
    </>
  );
};
