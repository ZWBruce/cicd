import { Routes, Route } from 'react-router-dom';
import Config from '@pages/Config';
import App from '@src/App';

export default function Router(): React.ReactElement {
  return (
    <Routes>
      <Route path="/config" element={<Config />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
}
