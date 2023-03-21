import { useMemo } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import timeline from 'highcharts/modules/timeline';

import toUTC from '../../../../utils/toUTC';
import getAssetVisualInfoBy from '../../../../utils/getAssetVisualInfoBy';

HighchartsExporting(Highcharts);
timeline(Highcharts);

type Props = {
  healthHistory: {
    status: 'inAlert' | 'inOperation' | 'inDowntime' | 'unplannedStop';
    timestamp: string;
  }[];
};

type TimelineData = {
  x: number;
  name: string;
  label: string;
};

export default function HealthHistoryTab({ healthHistory }: Props) {
  const timelineData: TimelineData[] = useMemo(
    () => healthHistory?.map(({ timestamp, status }) => ({
      x: toUTC(new Date(timestamp)),
      name: status,
      label: getAssetVisualInfoBy(status),
    })) || [],
    [healthHistory],
  );

  const options = useMemo(
    () => ({
      chart: {
        zoomType: 'x',
        type: 'timeline',
      },
      xAxis: {
        type: 'datetime',
        visible: false,
      },
      yAxis: {
        gridLineWidth: 1,
        title: null,
        labels: {
          enabled: false,
        },
      },
      legend: {
        enabled: false,
      },
      title: null,
      tooltip: {
        style: {
          width: 300,
        },
      },
      series: [
        {
          dataLabels: {
            allowOverlap: false,
            format:
              '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > '
              + '{point.x:%d %b %Y}</span><br/>{point.label}',
          },
          marker: {
            symbol: 'circle',
          },
          data: timelineData,
        },
      ],
      credits: false,
    }),
    [timelineData],
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
