import { Descriptions, Tag } from 'antd';

import Asset from '../../../../types/asset';
import getAssetVisualInfoBy from '../../../../utils/getAssetVisualInfoBy';

type Props = {
  asset: Asset;
};

const tagColors = {
  inAlert: 'warning',
  inOperation: 'blue',
  inDowntime: 'error',
};

export default function DetailsTab({ asset }: Props) {
  return (
    <Descriptions>
      <Descriptions.Item label="Nome">{asset.name}</Descriptions.Item>
      <Descriptions.Item label="Modelo">Modelo</Descriptions.Item>
      <Descriptions.Item label="Saúde">
        {asset.healthscore}
        %
      </Descriptions.Item>
      <Descriptions.Item label="Sensores">
        {asset.sensors.join(', ')}
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        <Tag color={tagColors[asset.status!]}>
          {getAssetVisualInfoBy(asset.status!)}
        </Tag>
      </Descriptions.Item>
    </Descriptions>
  );
}
