

import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios';

import './App.css';
const App = () => {
  /* Basic info */
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [conventions, setConventions] = useState('');
  const [error, setError] = useState(false);
  /* Bluefor */
  const [bluefor_situation, setBluefor_situation] = useState('');
  const [bluefor_task, setBluefor_task] = useState('');
  const [bluefor_enemy, setBluefor_enemy] = useState('');
  const [bluefor_weapons, setBluefor_weapons] = useState([]);

  /* Redfor */
  const [redfor_situation, setRedfor_situation] = useState('');
  const [redfor_task, setRedfor_task] = useState('');
  const [redfor_enemy, setRedfor_enemy] = useState('');
  const [redfor_weapons, setRedfor_weapons] = useState([]);

  useEffect(() => {
    setError(false);
  }, [title, author, conventions]);

  useEffect(() => {
    if (error) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [error]);

  const saveFileHandler = async () => {
    if (!title || !author) {
      setError(true);
      return;
    }
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
        <span>Создавай или редактируй свой Stringtable!</span><br />
        {error && <span className='red'>Все поля должны быть заполнены! Вы же профи!</span>}
        {/* TODO: edit strigtable */}
        {/* <p>Загрузить на редактирование</p>
        <input type='file' placeholder='' /> */}
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
              <span>Описание ситуации | </span><span className='blue'>BLUEFOR</span>
              <textarea name='bluefor_situation' onChange={(e) => setBluefor_situation(e.target.value)} placeholder='Ситуация (сюжет глазами синих)' />
            </div>
            <div>
              <span>Задачи | </span><span className='blue'>BLUEFOR</span>
              <textarea name='bluefor_task' onChange={(e) => setBluefor_task(e.target.value)} placeholder='Поставленные задачи' />
            </div>
            <div>
              <span>Информация о противника | </span><span className='blue'>BLUEFOR</span>
              <textarea name='bluefor_enemy' onChange={(e) => setBluefor_enemy(e.target.value)} placeholder='Информация о противнике' />
            </div>
            <div>
              <span>Вооружение | </span><span className='blue'>BLUEFOR</span>
              <textarea name='bluefor_weapons' onChange={(e) => setBluefor_weapons(e.target.value)} placeholder='Вооружение' />
            </div>
          </div>
          <div className='redfor'>
            <div>
              <span>Описание ситуации | </span><span className='red'>REDFOR</span>
              <textarea name='Redfor_situation' onChange={(e) => setRedfor_situation(e.target.value)} placeholder='Ситуация (сюжет глазами красных)' />
            </div>
            <div>
              <span>Задачи | </span><span className='red'>REDFOR</span>
              <textarea name='redfor_task' onChange={(e) => setRedfor_task(e.target.value)} placeholder='Поставленные задачи' />
            </div>
            <div>
              <span>Информация о противника | </span><span className='red'>REDFOR</span>
              <textarea name='redfor_enemy' onChange={(e) => setRedfor_enemy(e.target.value)} placeholder='Информация о противнике' />
            </div>
            <div>
              <span>Вооружение | </span><span className='red'>REDFOR</span>
              <textarea name='redfor_weapons' onChange={(e) => setRedfor_weapons(e.target.value)} placeholder='Вооружение' />
            </div>
          </div>
          <div className='independent'>

          </div>
        </section>
        <button className='submit' onClick={saveFileHandler}>Скачать</button>
      </main>
      <footer>
        Created by Agentos. <br />Idea and host by XDred.
      </footer>
    </div>
  );
}

export default App;
