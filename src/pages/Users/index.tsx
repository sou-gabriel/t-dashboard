import { useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Typography,
  Spin,
  Table,
  Breadcrumb,
  Popconfirm,
  message,
  Button,
} from 'antd';

import User from '../../types/user';
import useUsers from '../../services/hooks/useUsers';
import delay from '../../utils/delay';

export default function Users() {
  const queryClient = useQueryClient();
  const {
    data, isRefetching, isFetching, isLoading,
  } = useUsers();

  const [messageApi, contextHolder] = message.useMessage();

  async function handleDeleteUser(userIdToDelete: number) {
    await delay(3000);

    queryClient.setQueryData(
      ['users'],
      data!.filter((item) => item.id !== userIdToDelete),
    );

    messageApi.success('Usuário deletado com sucesso.');
  }

  const dataSource = useMemo(
    () => data?.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
    })),
    [data],
  );

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
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ações',
      dataIndex: 'action',
      key: 'action',
      render(_: unknown, { id }: User) {
        return (
          <Popconfirm
            title="Excluir"
            cancelText="Cancelar"
            onConfirm={() => handleDeleteUser(id)}
            okButtonProps={{
              className: 'bg-[#4096ff]',
            }}
            description="Você tem certeza que deseja excluir este usuário?"
          >
            <Button type="link">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}

      <section>
        <header className="mb-6 flex items-center gap-4">
          <div>
            <Typography.Title level={1} className="text-2xl mb-1">
              Usuários
            </Typography.Title>

            <Breadcrumb items={[{ title: 'Usuários', href: '/users' }]} />
          </div>

          <Spin size="small" spinning={isFetching || isRefetching} />
        </header>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </section>
    </>
  );
}
