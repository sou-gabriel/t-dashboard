export default function getAssetVisualInfoBy(
  status: 'inAlert' | 'inOperation' | 'inDowntime' | 'unplannedStop',
) {
  return {
    inAlert: 'Em alerta',
    inOperation: 'Em operação',
    inDowntime: 'Em parada',
    unplannedStop: 'Parada não planejada',
  }[status];
}
