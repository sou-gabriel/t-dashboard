import { useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  Card, message, Popconfirm, Space, Spin, Statistic, Table, Typography,
} from 'antd';

import { Link } from 'react-router-dom';
import useAssets from '../../services/hooks/useAssets';
import Asset from '../../types/asset';
import delay from '../../utils/delay';
import getAssetVisualInfoBy from '../../utils/getAssetVisualInfoBy';
import capitalize from '../../utils/capitalize';

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
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
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
      render(_: any, { id }: Asset) {
        return (
          <Space size="middle">
            <Link to={`/assets/${id}`} className="text-[#1677ff] inline-flex">
              <EyeOutlined />
            </Link>

            <Link to={`/assets/edit/${id}`} className="text-[#1677ff] inline-flex">
              <EditOutlined />
            </Link>

            <Popconfirm
              title="Excluir"
              cancelText="Cancelar"
              onConfirm={() => handleDeleteAsset(id)}
              okButtonProps={{
                className: 'bg-[#4096ff]',
              }}
              description="Você tem certeza que deseja excluir este ativo?"
            >
              <Button type="link" className="inline-flex p-0 h-fit hover:text-[#1677ff]">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const dataSource = data?.map((asset) => ({
    id: asset.id,
    name: asset.name,
    model: capitalize(asset.model),
    status: getAssetVisualInfoBy(asset.status),
  })) || [] as any[];

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
