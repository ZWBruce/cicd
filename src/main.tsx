import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from '/service_worker.js?worker';

if ('serviceWorker' in navigator) {
  /* 当页面加载完成就创建一个serviceWorker */
  window.addEventListener('load', function () {
    /* 创建并指定对应的执行内容 */
    /* scope 参数是可选的，可以用来指定你想让 service worker 控制的内容的子目录。 在这个例子里，我们指定了 '/'，表示 根网域下的所有内容。这也是默认值。 */
    navigator.serviceWorker
      .register('/service_worker.js')
      .then(function (registration) {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        );
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
