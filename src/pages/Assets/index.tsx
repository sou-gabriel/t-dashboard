import { useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Card, message, Space, Spin, Statistic, Table, Typography,
} from 'antd';

import { Link } from 'react-router-dom';
import useAssets from '../../services/hooks/useAssets';
import Asset from '../../types/asset';
import delay from '../../utils/delay';

export default function Assets() {
  const queryClient = useQueryClient();
  const {
    data, isLoading, isFetching, isRefetching,
  } = useAssets();

  const [messageApi, contextHolder] = message.useMessage();

  async function handleDeleteAsset(assetIdToDelete: number) {
    await delay(3000);

    queryClient.setQueryData(['assets'], data?.filter((item) => (
      item.id !== assetIdToDelete
    )));

    messageApi.success('Ativo deletado com sucesso.');
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      dataIndex: 'action',
      key: 'action',
      render(_, { id }: Asset) {
        return (
          <Space size="middle">
            <Link to={`/assets/${id}`} className="text-[#1677ff]">
              <EyeOutlined />
            </Link>

            <Button
              type="link"
              className="hover:text-[#1677ff]"
              onClick={() => handleDeleteAsset(id)}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const dataSource = data?.map((asset) => ({
    id: asset.id,
    name: asset.name,
    model: asset.model,
    status: asset.status,
  }));

  const assetsStatusSummary = {
    inAlert: data?.filter((asset) => asset.status === 'inAlert').length,
    inOperation: data?.filter((asset) => asset.status === 'inOperation').length,
    inDowntime: data?.filter(({ status }) => status === 'inDowntime').length,
  };

  return (
    <>
      {contextHolder}

      <section>
        <header className="flex items-center gap-4">
          <Typography.Title level={1} className="text-2xl">
            Ativos
          </Typography.Title>

          <Spin size="small" spinning={isFetching || isRefetching} />
        </header>

        <div className="mb-4 flex items-center gap-2">
          <Card className="flex-1">
            <Statistic
              title="Ativos em alerta"
              value={assetsStatusSummary.inAlert}
            />
          </Card>
          <Card className="flex-1">
            <Statistic
              title="Ativos em operação"
              value={assetsStatusSummary.inOperation}
            />
          </Card>
          <Card className="flex-1">
            <Statistic
              title="Ativos em parada"
              value={assetsStatusSummary.inDowntime}
            />
          </Card>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </section>
    </>
  );
}
