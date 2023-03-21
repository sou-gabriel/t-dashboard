import { Descriptions } from 'antd';

import formatDate from '../../../../utils/formatDate';

type Props = {
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
};

export default function MetricsTab({ metrics }: Props) {
  const lastUptimeAt = metrics.lastUptimeAt
    && formatDate(new Date(metrics.lastUptimeAt), {
      dateStyle: 'long',
    });

  return (
    <Descriptions>
      <Descriptions.Item label="Total de coletas uptime">
        {metrics.totalCollectsUptime}
      </Descriptions.Item>
      <Descriptions.Item label="Total de horas de coleta uptime">
        {metrics.totalUptime}
      </Descriptions.Item>
      <Descriptions.Item label="Data da última coleta uptime">
        {lastUptimeAt}
      </Descriptions.Item>
    </Descriptions>
  );
}
