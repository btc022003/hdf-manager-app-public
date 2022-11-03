import {
  Card,
  Button,
  Form,
  Input,
  Table,
  Space,
  Modal,
  message,
  Pagination,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import MyUpload from '../../components/MyUpload';
import {
  loadDataAPI,
  insertAPI,
  updateByIdAPI,
  delByIdAPI,
} from '../../services/medicine-categories';
import { dalImg } from '../../utils/tools';

function MedicineCategories() {
  const [isShow, setIsShow] = useState(false); // 控制modal显示和隐藏
  const [myForm] = Form.useForm(); // 可以获取表单元素实例
  const [query, setQuery] = useState({}); // 查询条件
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // 总数量
  const [currentId, setCurrentId] = useState(''); // 当前id，如果为空表示新增
  const [imageUrl, setImageUrl] = useState<string>(''); // 上传之后的数据

  useEffect(() => {
    loadDataAPI(query).then((res) => {
      // console.log(res);
      setData(res.data.list);
      setTotal(res.data.total); // 设置总数量
    });
  }, [query]); // 监听query改变
  useEffect(() => {
    if (!isShow) {
      // 关闭弹窗之后重置数据
      setCurrentId('');
      setImageUrl('');
    }
  }, [isShow]);
  return (
    <>
      <Card
        title='药品分类'
        extra={
          <>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={() => {
                setIsShow(true);
              }}
            />
          </>
        }
      >
        <Space direction='vertical' style={{ width: '100%' }}>
          <Form
            layout='inline'
            onFinish={(v) => {
              // message.success('查询成功');
              setQuery(v);
            }}
          >
            <Form.Item label='名字' name='name'>
              <Input placeholder='请输入关键词' allowClear />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Form>
          <Table
            dataSource={data}
            rowKey='id'
            columns={[
              {
                title: '序号',
                width: 80,
                align: 'center',
                render(v, r, i) {
                  return <>{i + 1}</>;
                },
              },
              {
                title: '名字',
                dataIndex: 'name',
                width: 180,
              },
              {
                title: '主图',
                width: 120,
                align: 'center',
                render(v, r: any) {
                  return (
                    <img className='t-img' src={dalImg(r.image)} alt={r.name} />
                  );
                },
              },
              {
                title: '简介',
                dataIndex: 'desc',
              },
              {
                title: '操作',
                align: 'center',
                width: 110,
                render(v, r: any) {
                  return (
                    <Space>
                      <Button
                        type='primary'
                        icon={<EditOutlined />}
                        size='small'
                        onClick={() => {
                          setIsShow(true);
                          setCurrentId(r.id);
                          setImageUrl(r.image);
                          myForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title='是否确认删除此项?'
                        onConfirm={async () => {
                          await delByIdAPI(r.id);
                          setQuery({}); // 重新加载数据
                        }}
                      >
                        <Button
                          type='primary'
                          icon={<DeleteOutlined />}
                          size='small'
                          danger
                        />
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            // 分页
            pagination={{
              total, // 总数量
              // 页码改变的时候执行
              onChange(page) {
                setQuery({
                  ...query,
                  page,
                });
              },
            }}
          />
        </Space>
      </Card>
      <Modal
        title='编辑'
        open={isShow}
        // 点击遮罩层时不关闭
        maskClosable={false}
        onCancel={() => setIsShow(false)}
        // 关闭modal的时候清楚数据
        destroyOnClose
        onOk={() => {
          // message.success('保存成功');
          myForm.submit(); //手动触发表单的提交事件
        }}
      >
        <Form
          // 表单配合modal一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
          preserve={false}
          onFinish={async (v) => {
            // message.success('保存成功');
            // console.log(v);
            if (currentId) {
              await updateByIdAPI(currentId, { ...v, image: imageUrl }); // 修改
            } else {
              await insertAPI({ ...v, image: imageUrl }); // 新增
            }

            message.success('保存成功');
            setIsShow(false);
            setQuery({}); // 重置查询条件，取数据
          }}
          labelCol={{ span: 3 }}
          form={myForm}
        >
          <Form.Item
            label='名字'
            name='name'
            rules={[
              {
                required: true,
                message: '请输入名字',
              },
            ]}
          >
            <Input placeholder='请输入名字' />
          </Form.Item>
          <Form.Item label='主图'>
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item label='简介' name='desc'>
            <Input.TextArea placeholder='请输入简介' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default MedicineCategories;
