import { Button, Input, Card, message } from 'antd';
import { FC, useState } from 'react';
import axios from 'axios';
import { ConfigItem } from '.';
import { KeyedMutator } from 'swr';

const Create: FC<{
  mutate: KeyedMutator<ConfigItem[]>;
}> = ({ mutate }) => {
  const [k, setK] = useState('');
  const [v, setV] = useState('');

  const createConfig = async () => {
    await axios.post('/api/v1/config/create', { fieldKey: k, fieldValue: v });
    mutate();
    message.success('创建成功');
    setK('');
    setV('');
  };

  return (
    <Card title="创建配置">
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
      <div>
        <Button onClick={createConfig} type="primary">
          添加
        </Button>
      </div>
    </Card>
  );
};

export default Create;
