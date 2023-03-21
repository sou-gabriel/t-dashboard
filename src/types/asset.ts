type Asset = {
  id: number;
  name: string;
  model: string;
  status: 'inAlert' | 'inOperation' | 'inDowntime';
  sensors: string[];
  healthscore: number;
  assignedUserIds: number[]
  companyId: number
  image: string;
  healthHistory: {
    status: 'inAlert' | 'inOperation' | 'inDowntime' | 'unplannedStop';
    timestamp: string
  }[];
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  specifications: {
    maxTemp: number;
    power: number;
    rpm: number;
  };
};

export default Asset;
