import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Assets from './pages/Assets';
import Asset from './pages/Asset';
import Users from './pages/Users';
import Units from './pages/Units';
import Companies from './pages/Companies';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/:id" element={<Asset />} />
        <Route path="/users" element={<Users />} />
        <Route path="/units" element={<Units />} />
        <Route path="/companies" element={<Companies />} />
        <Route index element={<Asset />} />
      </Route>
    </Routes>
  );
}
