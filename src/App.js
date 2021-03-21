

import { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'
import axios from 'axios';
import templateFile from './assets/stringtable.xml';

import './App.css';
const App = () => {
  /* Basic info */
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [conventions, setConventions] = useState('');
  const [error, setError] = useState(false);

  /* Bluefor */
  const [isBlueforEnabled, setIsBlueforEnabled] = useState(true);
  const [bluefor_situation, setBluefor_situation] = useState('');
  const [bluefor_task, setBluefor_task] = useState('');
  const [bluefor_enemy, setBluefor_enemy] = useState('');
  const [bluefor_weapons, setBluefor_weapons] = useState('');
  const [bluefor_execution, setBluefor_execution] = useState('');

  /* Redfor */
  const [isRedforEnabled, setIsRedforEnabled] = useState(true);
  const [redfor_situation, setRedfor_situation] = useState('');
  const [redfor_task, setRedfor_task] = useState('');
  const [redfor_enemy, setRedfor_enemy] = useState('');
  const [redfor_weapons, setRedfor_weapons] = useState('');
  const [redfor_execution, setRedfor_execution] = useState('');

  /* Independent */
  const [isIndependentforEnabled, setIsIndependentforEnabled] = useState(true);
  const [independent_situation, setIndependent_situation] = useState('');
  const [independent_task, setIndependent_task] = useState('');
  const [independent_enemy, setIndependent_enemy] = useState('');
  const [independent_weapons, setIndependent_weapons] = useState('');
  const [independent_execution, setIndependent_execution] = useState('');

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
    if (!title || !author || !conventions) {
      setError(true);
      return;
    }

    let { data: template } = await axios.get(templateFile, {
      'Content-Type': 'application/xml; charset=utf-8'
    });

    const parser = new DOMParser();
    template = parser.parseFromString(template, "text/xml");
    template.querySelector('[ID="STR_missionname"]').children[0].textContent = title;
    template.querySelector('[ID="STR_credits"]').children[0].textContent = author;
    template.querySelector('[ID="STR_convent"]').children[0].textContent = conventions;

    /* bluefor */

    template.querySelector('[ID="STR_situation_bf"]').children[0].textContent = bluefor_situation;
    template.querySelector('[ID="STR_task_bf"]').children[0].textContent = bluefor_task;
    template.querySelector('[ID="STR_execution_bf"]').children[0].textContent = bluefor_execution;
    template.querySelector('[ID="STR_machinery_bf"]').children[0].textContent = bluefor_weapons;
    template.querySelector('[ID="STR_enemy_bf"]').children[0].textContent = bluefor_enemy;

    /* redfor */

    template.querySelector('[ID="STR_situation_rf"]').children[0].textContent = redfor_situation;
    template.querySelector('[ID="STR_task_rf"]').children[0].textContent = redfor_task;
    template.querySelector('[ID="STR_execution_rf"]').children[0].textContent = redfor_execution;
    template.querySelector('[ID="STR_machinery_rf"]').children[0].textContent = redfor_weapons;
    template.querySelector('[ID="STR_enemy_rf"]').children[0].textContent = redfor_enemy;

    /* independent */

    template.querySelector('[ID="STR_situation_guer"]').children[0].textContent = independent_situation;
    template.querySelector('[ID="STR_task_guer"]').children[0].textContent = independent_task;
    template.querySelector('[ID="STR_execution_guer"]').children[0].textContent = independent_execution;
    template.querySelector('[ID="STR_machinery_guer"]').children[0].textContent = independent_weapons;
    template.querySelector('[ID="STR_enemy_guer"]').children[0].textContent = independent_enemy;
    template = new XMLSerializer().serializeToString(template.documentElement);
    const generatedFile = new Blob(
      [template],
      { type: 'text/application/xml; charset=utf-8' }
    );
    saveAs(generatedFile, 'stringtable.xml')
  }

  const fileChangeHandler = async (e) => {
    if (e.target.files.length) {
      const reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onloadend = () => {
        const parser = new DOMParser();
        let template = reader.result;
        template = parser.parseFromString(template, "text/xml");

        setTitle(template.querySelector('[ID="STR_missionname"]').children[0].textContent.trim());
        setAuthor(template.querySelector('[ID="STR_credits"]').children[0].textContent.trim());
        setConventions(template.querySelector('[ID="STR_convent"]').children[0].textContent.trim());

        /* bluefor */
        try {
          if (template.querySelector('[ID="STR_situation_bf"]')) {
            setBluefor_situation(template.querySelector('[ID="STR_situation_bf"]').children[0].textContent.trim());
            setBluefor_task(template.querySelector('[ID="STR_task_bf"]').children[0].textContent.trim());
            setBluefor_execution(template.querySelector('[ID="STR_execution_bf"]').children[0].textContent.trim());
            setBluefor_weapons(template.querySelector('[ID="STR_machinery_bf"]').children[0].textContent.trim());
            setBluefor_enemy(template.querySelector('[ID="STR_enemy_bf"]').children[0].textContent.trim());
          }

          /* redfor */

          if (template.querySelector('[ID="STR_situation_rf"]')) {
            setRedfor_situation(template.querySelector('[ID="STR_situation_rf"]').children[0].textContent.trim());
            setRedfor_task(template.querySelector('[ID="STR_task_rf"]').children[0].textContent.trim());
            setRedfor_execution(template.querySelector('[ID="STR_execution_rf"]').children[0].textContent.trim());
            setRedfor_weapons(template.querySelector('[ID="STR_machinery_rf"]').children[0].textContent.trim());
            setRedfor_enemy(template.querySelector('[ID="STR_enemy_rf"]').children[0].textContent.trim());
          }

          /* independent */

          if (template.querySelector('[ID="STR_situation_guer"]')) {
            setIndependent_situation(template.querySelector('[ID="STR_situation_guer"]').children[0].textContent.trim());
            setIndependent_task(template.querySelector('[ID="STR_task_guer"]').children[0].textContent.trim());
            setIndependent_execution(template.querySelector('[ID="STR_execution_guer"]').children[0].textContent.trim());
            setIndependent_weapons(template.querySelector('[ID="STR_machinery_guer"]').children[0].textContent.trim());
            setIndependent_enemy(template.querySelector('[ID="STR_enemy_guer"]').children[0].textContent.trim());
          }
        } catch (error) {
          alert('Невалидный XML!');
        }

      };
    }
  }

  return (
    <div className="App">
      <header>
        <h1>MAMaS Stringtable Generator</h1>
        <span>Создавай или редактируй свой Stringtable!</span><br />
        {error && <span className='red'>Название, автор и условности должны быть указаны! Вы же профи!</span>}
        <p>Уже есть свой stringtable? <br />Загружай и редактируй!</p>
        <input type='file' accept='text/xml' onChange={(e) => fileChangeHandler(e)} />
      </header>
      <main>
        <section className='main-settings'>
          <div>
            <span>Название миссии</span>
            <input name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Название' />
          </div>
          <div>
            <span>Автор миссии</span>
            <input name='author' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Автор' />
          </div>
          <div>
            <span>Условности миссии</span>
            <textarea name='conventions' type='text' value={conventions} onChange={(e) => setConventions(e.target.value)} placeholder='Условности' width='250px' />
          </div>
        </section>

        <section className='sides-select'>
          <div>
            <label htmlFor='bluefor-select'>Синие</label>
            <input name='bluefor-select' type="checkbox" checked={isBlueforEnabled} onChange={() => setIsBlueforEnabled(!isBlueforEnabled)} />
          </div>
          <div>
            <label htmlFor='redfor-select'>Красные</label>
            <input name='redfor-select' type="checkbox" checked={isRedforEnabled} onChange={() => setIsRedforEnabled(!isRedforEnabled)} />
          </div>
          <div>
            <label htmlFor='independent-select'>Зеленые</label>
            <input name='independent-select' type="checkbox" checked={isIndependentforEnabled} onChange={() => setIsIndependentforEnabled(!isIndependentforEnabled)} />
          </div>
        </section>
        <section className='sides'>
          {isBlueforEnabled && (
            <div className='bluefor'>
              <div>
                <span>Описание ситуации | </span><span className='blue'>BLUEFOR</span>
                <textarea name='bluefor_situation' value={bluefor_situation} onChange={(e) => setBluefor_situation(e.target.value)} placeholder='Ситуация (сюжет глазами синих)' />
              </div>
              <div>
                <span>Задачи | </span><span className='blue'>BLUEFOR</span>
                <textarea name='bluefor_task' value={bluefor_task} onChange={(e) => setBluefor_task(e.target.value)} placeholder='Поставленные задачи' />
              </div>
              <div>
                <span>Информация о противнике | </span><span className='blue'>BLUEFOR</span>
                <textarea name='bluefor_enemy' value={bluefor_enemy} onChange={(e) => setBluefor_enemy(e.target.value)} placeholder='Информация о противнике' />
              </div>
              <div>
                <span>Вооружение | </span><span className='blue'>BLUEFOR</span>
                <textarea name='bluefor_weapons' value={bluefor_weapons} onChange={(e) => setBluefor_weapons(e.target.value)} placeholder='Вооружение' />
              </div>
              <div>
                <span>Исполнение | </span><span className='blue'>BLUEFOR</span>
                <textarea name='bluefor_execution' value={bluefor_execution} onChange={(e) => setBluefor_execution(e.target.value)} placeholder='Дополнительная информация' />
              </div>
            </div>
          )}
          {isRedforEnabled && (
            <div className='redfor'>
              <div>
                <span>Описание ситуации | </span><span className='red'>REDFOR</span>
                <textarea name='redfor_situation' value={redfor_situation} onChange={(e) => setRedfor_situation(e.target.value)} placeholder='Ситуация (сюжет глазами красных)' />
              </div>
              <div>
                <span>Задачи | </span><span className='red'>REDFOR</span>
                <textarea name='redfor_task' value={redfor_task} onChange={(e) => setRedfor_task(e.target.value)} placeholder='Поставленные задачи' />
              </div>
              <div>
                <span>Информация о противнике | </span><span className='red'>REDFOR</span>
                <textarea name='redfor_enemy' value={redfor_enemy} onChange={(e) => setRedfor_enemy(e.target.value)} placeholder='Информация о противнике' />
              </div>
              <div>
                <span>Вооружение | </span><span className='red'>REDFOR</span>
                <textarea name='redfor_weapons' value={redfor_weapons} onChange={(e) => setRedfor_weapons(e.target.value)} placeholder='Вооружение' />
              </div>
              <div>
                <span>Исполнение | </span><span className='red'>REDFOR</span>
                <textarea name='redfor_execution' value={redfor_execution} onChange={(e) => setRedfor_execution(e.target.value)} placeholder='Дополнительная информация' />
              </div>
            </div>
          )}

          {isIndependentforEnabled && (
            <div className='independent'>
              <div>
                <span>Описание ситуации | </span><span className='green'>INDEPENDENT</span>
                <textarea name='independent_situation' value={independent_situation} onChange={(e) => setIndependent_situation(e.target.value)} placeholder='Ситуация (сюжет глазами зеленых)' />
              </div>
              <div>
                <span>Задачи | </span><span className='green'>INDEPENDENT</span>
                <textarea name='independent_task' value={independent_task} onChange={(e) => setIndependent_task(e.target.value)} placeholder='Поставленные задачи' />
              </div>
              <div>
                <span>Информация о противнике | </span><span className='green'>INDEPENDENT</span>
                <textarea name='independent_enemy' value={independent_enemy} onChange={(e) => setIndependent_enemy(e.target.value)} placeholder='Информация о противнике' />
              </div>
              <div>
                <span>Вооружение | </span><span className='green'>INDEPENDENT</span>
                <textarea name='independent_weapons' value={independent_weapons} onChange={(e) => setIndependent_weapons(e.target.value)} placeholder='Вооружение' />
              </div>
              <div>
                <span>Исполнение | </span><span className='green'>INDEPENDENT</span>
                <textarea name='independent_execution' value={independent_execution} onChange={(e) => setIndependent_execution(e.target.value)} placeholder='Дополнительная информация' />
              </div>
            </div>
          )}
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
