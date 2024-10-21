import { useState } from "react"
import './EditForm.css'

export default function EditForm(props) {
  const [editText,setEditText] = useState(props.text)
  const onInputValue = (e) => {
    setEditText(e.target.value)
  }

  return(
    <>
      <input value={editText} onChange={onInputValue}></input>
      <button className="update" onClick={() => props.update(props.id,editText)}>更新</button>
    </>
  )
}