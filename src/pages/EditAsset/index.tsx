import { useNavigate, useParams } from 'react-router-dom';
import { message, Typography } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import AssetForm from '../../components/AssetForm';
import Loader from '../../components/Loader';
import Asset from '../../types/asset';
import delay from '../../utils/delay';

async function fetchAsset(id: string) {
  const response = await fetch(`https://my-json-server.typicode.com/tractian/fake-api/assets/${id}`);
  return response.json();
}

export default function EditAsset() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams() as { id: string };

  const [messageApi, contextHolder] = message.useMessage();

  const { data, isLoading } = useQuery({
    queryKey: ['assets', id],
    queryFn: () => fetchAsset(id),
  });

  async function handleEditAsset(editedAsset: Asset) {
    await delay(2000);

    queryClient.setQueryData(['assets', id], editedAsset);

    messageApi.success('Ativo editado com sucesso.');
    navigate('/assets');
  }

  return (
    <>
      {contextHolder}

      <Loader isLoading={isLoading} />

      <section>
        <header>
          <Typography.Title level={1} className="text-2xl">
            Ativo 01
          </Typography.Title>
        </header>

        <AssetForm
          initialValues={{
            name: data?.name,
            model: data?.model,
            sensors: data?.sensors,
            image: data?.image,
          }}
          onSubmit={handleEditAsset}
        />
      </section>
    </>
  );
}
