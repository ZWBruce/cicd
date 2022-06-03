import { FC } from 'react';
import Create from './Create';
import List from './List';
import { PageHeader } from 'antd';
import useSWRImmutable from 'swr/immutable';
import axios from 'axios';

export interface ConfigItem {
  key: number;
  fieldKey: string;
  fieldValue: string;
  createTime: string;
}

const Config: FC = () => {
  const { data: list, mutate } = useSWRImmutable<ConfigItem[]>(
    '/api/v1/config',
    (path) => {
      return axios.get(path).then((res) =>
        res.data.map((t: ConfigItem & { id: number }) => ({
          ...t,
          key: t.id,
        }))
      );
    }
  );
  return (
    <>
      <PageHeader
        onBack={() => history.back()}
        title="配置"
        subTitle="配置管理"
      />
      <Create mutate={mutate} />
      <List list={list} mutate={mutate} />
    </>
  );
};

export default Config;
