import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Assets from './pages/Assets';
import Asset from './pages/Asset';
import Users from './pages/Users';
import Units from './pages/Units';
import Companies from './pages/Companies';
import EditAsset from './pages/EditAsset';
import NotFound from './pages/404';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/:id" element={<Asset />} />
        <Route path="/assets/edit/:id" element={<EditAsset />} />
        <Route path="/users" element={<Users />} />
        <Route path="/units" element={<Units />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="*" element={<NotFound />} />
        <Route index element={<Assets />} />
      </Route>
    </Routes>
  );
}
