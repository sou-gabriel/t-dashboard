import { DeleteOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Typography,
  Breadcrumb,
  Spin,
  Table,
  Button,
  Popconfirm,
  message,
} from 'antd';

import Unit from '../../types/unit';
import delay from '../../utils/delay';
import useCompanies from '../../services/hooks/useCompanies';

export default function Companies() {
  const queryClient = useQueryClient();
  const {
    data: units, isFetching, isRefetching, isLoading,
  } = useCompanies();

  const [messageApi, contextHolder] = message.useMessage();

  async function handleDeleteCompany(unitIdToDelete: number) {
    await delay(3500);

    queryClient.setQueryData(
      ['units'],
      units!.filter((unit) => unit.id !== unitIdToDelete),
    );

    messageApi.success('Empresa deletada com sucesso.');
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
      title: 'Ações',
      dataIndex: 'action',
      key: 'action',
      render(_, { id }: Unit) {
        return (
          <Popconfirm
            title="Excluir"
            cancelText="Cancelar"
            onConfirm={() => handleDeleteCompany(id)}
            okButtonProps={{
              className: 'bg-[#4096ff]',
            }}
            description="Você tem certeza que deseja excluir esta empresa?"
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const dataSource = units?.map((unit) => ({
    id: unit.id,
    name: unit.name,
  }));

  return (
    <>
      {contextHolder}

      <section>
        <header className="mb-6">
          <div className="flex items-center gap-4">
            <Typography.Title level={1} className="text-2xl mb-1">
              Empresas
            </Typography.Title>

            <Spin size="small" spinning={isFetching || isRefetching} />
          </div>

          <Breadcrumb items={[{ title: 'Unidades', href: '/units' }]} />
        </header>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </section>
    </>
  );
}
