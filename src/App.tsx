import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';
import './App.css'
import workerPort from './util/worker';

const { port1, port2 } = new MessageChannel();

function App() {

  const [count, setCount] = useState(0);
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // (0, eval)(`import _ from 'lodash'`);

    const shadowDom = divRef.current!.attachShadow({ mode: 'open' });
    ReactDOM.render(
      <>
        <p part="p">p in shadowDom with part</p>
        <p>p in shadowDom</p>
      </>, 
      shadowDom
    );

    workerPort.addEventListener('message', (e: MessageEvent) => {
      console.log(e)
      setList(e.data)
    });
    
    
    return () => {
      workerPort.postMessage('close00')
      workerPort.close()
      workerPort.postMessage('close')
    }
  }, [])

  return (
    <div>
      <header>
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>

          <button onClick={ () => {
            // fetch('/api/ifram', { method: 'post' });

            console.log(iframeRef.current?.contentWindow?.document);
          } }>req</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <div ref={divRef} className="shadow-con"></div>
        <input type="text" name="" id="" onChange={e => {
          setValue(e.target.value)
        }} />
        <button onClick={() => {
          if(!value) {
            return ;
          }
          workerPort.postMessage(value)
        }}>push data</button>

        <ul>
        {
          list.map(t => <li key={t}>{t}</li>)
        }
</ul>
      </header>
    </div>
  )
}

export default App
