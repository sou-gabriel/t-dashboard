import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
      </Route>
    </Routes>
  );
}
