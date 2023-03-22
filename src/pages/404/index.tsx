import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Typography.Title className="text-xl">Página inexistente</Typography.Title>
      <Button onClick={() => navigate(-1)}>Voltar</Button>
    </>
  );
}
