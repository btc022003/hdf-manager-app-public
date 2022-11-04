import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.compact.css'; // 紧凑主题
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Login from './pages/login';
import AppProvider from './components/AppProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <Router>
      <ConfigProvider locale={zhCN}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin/*' element={<App />} />
        </Routes>
      </ConfigProvider>
    </Router>
  </AppProvider>
);
