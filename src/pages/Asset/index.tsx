import {
  Spin, Tabs, Typography, message, Breadcrumb,
} from 'antd';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import useAsset from '../../services/hooks/useAsset';
import GalleryTab from './Tabs/Gallery';
import SpecificationsTab from './Tabs/Specifications';
import HealthHistoryTab from './Tabs/HealthHistory';
import MetricsTab from './Tabs/Metrics';
import DetailsTab from './Tabs/Details';

export default function Asset() {
  const { id } = useParams() as { id: string };
  const {
    data, isLoading, isFetching, isRefetching, isError,
  } = useAsset(id);

  const [messageApi, contextHolder] = message.useMessage();

  const tabs = useMemo(
    () => [
      {
        key: 'details',
        label: 'Detalhes',
        children: data && <DetailsTab asset={data} />,
      },
      {
        key: 'metrics',
        label: 'Métricas',
        children: data?.metrics && <MetricsTab metrics={data.metrics} />,
      },
      {
        key: 'healthHistory',
        label: 'Histórico de saúde',
        children: data?.healthHistory && (
          <HealthHistoryTab healthHistory={data.healthHistory} />
        ),
      },
      {
        key: 'specifications',
        label: 'Especificações',
        children: data?.specifications && (
          <SpecificationsTab specifications={data.specifications} />
        ),
      },
      {
        key: 'images',
        label: 'Imagens',
        children: data?.image && (
          <GalleryTab alt={data?.name} image={data.image} />
        ),
      },
    ],
    [data],
  );

  useEffect(() => {
    if (isError) {
      messageApi.error({
        content: 'Falha no carregamento das informações.',
      });
    }
  }, [isError]);

  return (
    <>
      {contextHolder}

      <Loader isLoading={isLoading} />

      <section>
        <header className="mb-6">
          <div className="flex items-center gap-4">
            <Typography.Title level={1} className="text-2xl mb-1">
              {data?.name}
            </Typography.Title>

            <Spin size="small" spinning={isFetching || isRefetching} />
          </div>

          <Breadcrumb
            items={[
              { title: 'Assets', href: '/assets' },
              { title: id, href: `/assets/${id}` },
            ]}
          />
        </header>

        <Tabs items={tabs} />
      </section>
    </>
  );
}
