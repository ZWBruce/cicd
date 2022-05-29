import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, TableColumnsType } from 'antd';

interface ConfigItem {
  key: number;
  fieldKey: string;
  fieldValue: string;
  createTime: string;
}

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
    render(_, { key }) {
      return (
        <>
          <Button
            type="link"
            onClick={() => {
              console.log('update', key);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              console.log('delete', key);
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

const Config: FC = () => {
  const [k, setK] = useState('');
  const [v, setV] = useState('');
  const [list, setList] = useState<ConfigItem[]>([]);

  const createConfig = () => {
    return axios.post('/api/v1/config/create', { fieldKey: k, fieldValue: v });
  };

  useEffect(() => {
    axios
      .get<(Omit<ConfigItem, 'key'> & { id: number })[]>('/api/v1/config')
      .then(({ data }) => {
        console.log('config list', data);
        setList(
          data.map((config) => ({
            key: config.id,
            fieldKey: config.fieldKey,
            fieldValue: config.fieldValue,
            createTime: config.createTime,
          }))
        );
      });
  }, []);

  return (
    <>
      <h2>Config</h2>
      <h3>Create</h3>
      <label>key</label>
      <Input
        type="text"
        onChange={(e) => {
          setK(e.target.value);
        }}
      />
      <label className="text-[#f44]">value</label>
      <Input
        type="text"
        onChange={(e) => {
          setV(e.target.value);
        }}
      />
      <div>
        <Button onClick={createConfig} type="primary">
          添加
        </Button>
      </div>
      <h3>All Config</h3>
      <Table columns={columns} dataSource={list}></Table>
    </>
  );
};

export default Config;
