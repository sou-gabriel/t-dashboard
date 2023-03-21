import { Descriptions } from 'antd';

type Props = {
  specifications: {
    maxTemp: number;
    power: number;
    rpm: number;
  };
};

export default function SpecificationsTab({ specifications }: Props) {
  return (
    <Descriptions>
      <Descriptions.Item label="Temperatura Máxima">
        {specifications.maxTemp ? `${specifications.maxTemp}°C` : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="Potência">
        {specifications.power ? `${specifications.power}kWh` : '-'}
      </Descriptions.Item>
      <Descriptions.Item label="RPM">
        {specifications.rpm ? `${specifications.rpm}rpm` : '-'}
      </Descriptions.Item>
    </Descriptions>
  );
}
