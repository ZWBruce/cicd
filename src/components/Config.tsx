import { FC, useState, useEffect } from 'react';
import axios from 'axios';

const Config: FC = () => {
  const [k, setK] = useState('');
  const [v, setV] = useState('');

  const createConfig = () => {
    return axios.post('/api/v1/config/create', { fieldKey: k, fieldValue: v });
  };

  useEffect(() => {
    axios.get('/api/v1/config').then(({ data }) => {
      console.log('config list', data);
    });
  }, []);

  return (
    <>
      <h2>Config</h2>
      <h3>Create</h3>
      <label>key</label>
      <input
        type="text"
        onChange={(e) => {
          setK(e.target.value);
        }}
      />
      <label>value</label>
      <input
        type="text"
        onChange={(e) => {
          setV(e.target.value);
        }}
      />
      <div>
        <button onClick={createConfig}>添加</button>
      </div>
    </>
  );
};

export default Config;
