import { Row, Col, Card, Form, Input, Button, message } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../components/AppProvider';
import { loginAPI } from '../services/auth';
import { defaultImg, setToken } from '../utils/tools';

function Login() {
  const navigate = useNavigate();
  const { resetMenus } = useContext(context);
  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8,
        }}
        xs={{
          span: 22,
          push: 1,
        }}
      >
        <img
          src={defaultImg}
          style={{
            display: 'block',
            margin: '20px auto',
            borderRadius: '16px',
            width: '200px',
          }}
        />
        <Card title='好大夫平台管理系统'>
          <Form
            labelCol={{
              md: {
                span: 4,
              },
            }}
            onFinish={async (v) => {
              // console.log(v);
              const res = await loginAPI(v);
              console.log(res);
              if (res.success) {
                message.success('登录成功');
                setToken(res.data);
                // 此处可以使用服务器返回的用户角色数据
                resetMenus('kf'); // 重置路由菜单
                navigate('/admin/dashboard');
              } else {
                message.error(res.errorMessage);
              }
              // message.success('登录成功');
              // navigate('/admin/dashboard');
            }}
          >
            <Form.Item
              label='用户名'
              name='userName'
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                style={{
                  display: 'block',
                  margin: '8px auto',
                  width: '20vw',
                }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
