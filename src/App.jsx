import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EditForm from './EditFrom';

export default function App() {
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [id,setId] = useState(1)
  // リストへ追加する関数
  const onClickAdd = () => {
    if (todoText === "") return;
    const newData = {
      id,
      title: todoText,
      completed:false,
      isEdit:false
    };

    todoList.forEach(todo => {
      todo.isEdit = false
    })
    
    setTodoList([...todoList,newData])
    setTodoText("")
    setId(id+1)
  }

  const onInputValue = (e) => {
    setTodoText(e.target.value)
  }

  // 編集フォームを表示する関数
  const onClickEdit = (id) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, isEdit: true }
      }
      return todo
    })
    setTodoList(updatedTodoList)
  }

  // リストのタイトルを編集する関数
  const onClickUpdate = (id,editTitle) => {
    const editTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, title: editTitle, isEdit: false,}
      }
      return todo
    })
    setTodoList(editTodoList)
  }

  // リストから削除する関数
  const onClickDelete = (id) => {
    var result = window.confirm('本当に削除してもよろしいですか？');
    if (result){
      const newList = todoList.filter(todo => todo.id !== id)
      setTodoList([...newList])
    }
  }

  // チェックボックス押下時に完了、未完了を切り替える関数
  const onChangeCheckBox = (id) => {
    const checkList = todoList.map(todo => {
      if (todo.id === id) {
        const isCompleted = todo.completed ? false :true
        return {...todo, completed: isCompleted}
      }
      return todo
    })
    setTodoList(checkList)
  }

  return (
    <>
      <h1>
        ToDo List
      </h1>
        <input
          type="text"
          placeholder="タスクを入力してください"
          autoComplete="off"
          value={todoText}
          onChange={onInputValue}
        />
        <button onClick={onClickAdd} className="add">作成</button>
      <div id="js-todo-list" className="todo-list">
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.isEdit 
                ? 
                <EditForm text={todo.title} id={todo.id} update={onClickUpdate}/>
                : 
                <div>
                  <input type="checkbox" className='checkbox' checked={todo.completed} onChange={ () => onChangeCheckBox(todo.id)}></input>
                  {todo.title}
                  <button onClick={() => onClickEdit(todo.id)} className="edit">編集</button>
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <span id="js-todo-count">全てのタスク: {todoList.length} 完了済み: {todoList.filter(todo => todo.completed === true).length} 未完了: {todoList.filter(todo => todo.completed === false).length}</span>
      </footer>
    </>
  )
}
