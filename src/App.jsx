import React from 'react';
import { AdminProvider } from './context/AdminContext';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <AdminProvider>
      <Layout />
    </AdminProvider>
  );
}

export default App;
