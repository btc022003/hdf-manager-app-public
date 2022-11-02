import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { defaultImg as logo } from '../utils/tools';

const { Header, Sider, Content } = Layout;

const sideMenuData = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: '看板',
  },
  {
    key: '/admin/medicine',
    icon: <VideoCameraOutlined />,
    label: '药品管理',
    children: [
      {
        label: '药品分类',
        key: '/admin/medicine/categories',
      },
      {
        label: '药品信息',
        key: '/admin/medicine/list',
      },
    ],
  },
  {
    key: '/admin/articles',
    icon: <UploadOutlined />,
    label: '文章管理',
    children: [
      {
        label: '文章分类',
        key: '/admin/articles/categories',
      },
      {
        label: '文章信息',
        key: '/admin/articles/list',
      },
    ],
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: '会员信息',
  },
];

/**
 * 查找当前选中的menu菜单的值
 * @param key
 * @returns
 */
const findOpenKeys = (key: string) => {
  const result: string[] = [];
  const findInfo = (arr: any) => {
    arr.forEach((item: any) => {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          findInfo(item.children); // 使用递归的方式查找当前页面刷新之后的默认选中项
        }
      }
    });
  };
  findInfo(sideMenuData);
  return result;
};

const MyLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation(); // 获取location中的数据
  const tmpOpenKeys = findOpenKeys(pathname);
  return (
    <Layout
      style={{ width: '100vw', height: '100vh' }}
      id='components-layout-demo-custom-trigger'
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <img src={logo} alt='好大夫' />
        </div>
        <Menu
          theme='light'
          mode='inline'
          defaultOpenKeys={tmpOpenKeys}
          defaultSelectedKeys={tmpOpenKeys}
          onClick={({ key }) => {
            // alert(key);
            navigate(key);
          }}
          items={sideMenuData}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span className='app-title'>好大夫平台管理系统</span>
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) => {
                  if (key === 'logOut') {
                    navigate('/');
                  } else {
                    message.info('暂未开通');
                  }
                }}
                items={[
                  {
                    label: '个人中心',
                    key: 'userCenter',
                  },
                  {
                    label: '退出',
                    key: 'logOut',
                  },
                ]}
              />
            }
          >
            <img
              src={logo}
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '16px',
                marginRight: '20px',
              }}
            />
          </Dropdown>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
