

import { useState } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios';

import './App.css';
const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [conventions, setConventions] = useState('');

  const saveFileHandler = async (values) => {
    const data = await axios({
      url: 'http://localhost:5000/generate-stringtable',
      method: 'POST',
      data: {
        title,
        author,
        conventions
      },
      responseType: 'blob'
    });
    saveAs(data.data, 'stringtable.xml')
  }

  return (
    <div className="App">
      <header>
        <h1>MAMaS Stringtable Generator</h1>
        <span>Создай или редактируй свой Stringtable!</span>
      </header>
      <main>
        <section className='main-settings'>
          <div>
            <span>Название миссии</span>
            <input name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Название' />
          </div>
          <div>
            <span>Автор миссии</span>
            <input name='author' onChange={(e) => setAuthor(e.target.value)} placeholder='Автор' />
          </div>
          <div>
            <span>Условности миссии</span>
            <textarea name='conventions' onChange={(e) => setConventions(e.target.value)} placeholder='Условности' width='250px' />
          </div>
        </section>

        <section className='sides'>
          <div className='bluefor'>
            <div>
              <span>Описание ситуации | BLUEFOR</span>
              <input name='conventions' onChange={(e) => setConventions(e.target.value)} placeholder='Ситуация ()' />
            </div>
          </div>
          <div className='redfor'>
            <div>
              <span>Условности миссии</span>
              <input name='conventions' onChange={(e) => setConventions(e.target.value)} placeholder='Условности' />
            </div>
          </div>
          <div className='independent'>

          </div>
        </section>
        <button onClick={saveFileHandler}>Click!</button>
      </main>
      <footer>
        Created by Agentos. <br />Idea and host by XDred.
      </footer>
    </div>
  );
}

export default App;
