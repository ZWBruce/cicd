import {
  Button,
  Table,
  TableColumnsType,
  Card,
  Modal,
  message,
  Input,
} from 'antd';
import { FC, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigItem } from '.';
import { KeyedMutator } from 'swr';
import autoAnimate from '@formkit/auto-animate';

const List: FC<{
  list?: ConfigItem[];
  mutate: KeyedMutator<ConfigItem[]>;
}> = ({ list, mutate }) => {
  const [modalShow, setModalShow] = useState(false);
  const [k, setK] = useState('');
  const [v, setV] = useState('');
  const [id, setId] = useState<number>();

  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target: HTMLDivElement | null | undefined =
      parent.current?.querySelector('.ant-table-tbody');
    target && autoAnimate(target);
  }, [parent]);

  const columns: TableColumnsType<ConfigItem> = [
    {
      title: 'key',
      dataIndex: 'fieldKey',
      key: 'fieldKey',
    },
    {
      title: 'value',
      dataIndex: 'fieldValue',
      key: 'fieldValue',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render(_, { key, fieldKey, fieldValue }) {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                console.log('update', key);
                setK(fieldKey);
                setV(fieldValue);
                setModalShow(true);
                setId(key);
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                Modal.confirm({
                  icon: <ExclamationCircleOutlined />,
                  content: '是否确认删除？',
                  async onOk() {
                    const res = await axios.delete(`/api/v1/config/${key}`);
                    if (res.data.affected) {
                      message.success('删除成功');
                      mutate();
                    }
                  },
                });
              }}
              type="link"
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Card title="配置列表" className="mt-20px">
      <Table columns={columns} dataSource={list} ref={parent} />
      <Modal
        title="Modal"
        visible={modalShow}
        onOk={async () => {
          const res = await axios.put(`/api/v1/config/${id}`, {
            fieldKey: k,
            fieldValue: v,
          });
          if (res.data.affected) {
            setModalShow(false);
            mutate();
            message.success('更新成功');
          }
        }}
        onCancel={() => {
          setModalShow(false);
        }}
        afterClose={() => {
          setK('');
          setV('');
        }}
      >
        <label>key</label>
        <Input
          type="text"
          onChange={(e) => {
            setK(e.target.value);
          }}
          value={k}
        />
        <label>value</label>
        <Input
          type="text"
          onChange={(e) => {
            setV(e.target.value);
          }}
          value={v}
        />
      </Modal>
    </Card>
  );
};

export default List;
