import { Spin } from 'antd';
import { createPortal } from 'react-dom';

type Props = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: Props) {
  if (!isLoading) {
    return null;
  }

  return createPortal(
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-[#f6f5fccc] flex items-center justify-center">
      <Spin size="large" tip="Carregando..." />
    </div>,
    document.body,
  );
}
