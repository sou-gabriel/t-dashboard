import { Layout, Menu } from 'antd';
import {
  Link, Outlet, useLocation, useNavigate,
} from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

const { Sider, Content } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedKey] = location.pathname.split('/').filter(Boolean);

  return (
    <Layout className="h-screen">
      <Sider trigger={null} className="px-6 py-14">
        <img src={logo} alt="Tractian" className="mb-6" />

        <Menu
          theme="dark"
          mode="vertical"
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={['assets']}
          items={[
            {
              key: 'assets',
              label: 'Ativos',
              onClick: () => navigate('/assets'),
            },
            {
              key: 'users',
              label: 'Usuários',

              onClick: () => navigate('/users'),
            },
            {
              key: 'units',
              label: 'Unidades',
              onClick: () => navigate('/units'),
            },
            {
              key: 'companies',
              label: 'Empresas',
              onClick: () => navigate('/companies'),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content className="mt-6 mx-4 p-6 min-h-[280px] overflow-y-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
