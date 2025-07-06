import { useState, useEffect, useRef } from "react"
import axios from "axios"
import "./App.css"

function App() {
  const rTitle = useRef()

  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("Pending")
  const [priority, setPriority] = useState("Medium")

  const [tasks, setTasks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  const [eid, setEid] = useState(null)
  const [etitle, setEtitle] = useState("")
  const [estatus, setEstatus] = useState("Pending")
  const [epriority, setEpriority] = useState("Medium")

  const [theme, setTheme] = useState("light")

  const hTitle = (e) => setTitle(e.target.value)
  const hStatus = (e) => setStatus(e.target.value)
  const hPriority = (e) => setPriority(e.target.value)

  const hEtitle = (e) => setEtitle(e.target.value)
  const hEstatus = (e) => setEstatus(e.target.value)
  const hEpriority = (e) => setEpriority(e.target.value)

  const hSearch = (e) => {
    let val = e.target.value
    setSearch(val)
    let result = tasks.filter(t => t.title.toLowerCase().includes(val.toLowerCase()))
    setFiltered(result)
  }

  const toggle = () => {
    let newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.body.className = newTheme
  }

  const load = () => {
    axios.get("http://localhost:5000/tasks")
      .then(res => {
        setTasks(res.data)
        setFiltered(res.data)
      })
      .catch(err => alert("Load error: " + err))
  }

  const save = (e) => {
    e.preventDefault()
    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters")
      rTitle.current.focus()
      return
    }

    let data = { title, status, priority }
    axios.post("http://localhost:5000/tasks", data)
      .then(() => {
        setTitle("")
        setStatus("Pending")
        setPriority("Medium")
        setError("")
        rTitle.current.focus()
        load()
      })
      .catch(err => setError("Add error: " + err))
  }

  const startEdit = (t) => {
    setEid(t.id)
    setEtitle(t.title)
    setEstatus(t.status)
    setEpriority(t.priority)
  }

  const update = () => {
    if (etitle.trim().length < 3) {
      setError("Title must be at least 3 characters")
      return
    }

    let data = { title: etitle, status: estatus, priority: epriority }
    axios.put(`http://localhost:5000/tasks/${eid}`, data)
      .then(() => {
        setEid(null)
        setError("")
        load()
      })
      .catch(err => setError("Update error: " + err))
  }

  const del = (id) => {
    let ok = window.confirm("Are you sure you want to delete?")
    if (!ok) return

    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        load()
      })
      .catch(err => alert("Delete error: " + err))
  }

  useEffect(() => {
    load()
    document.body.className = theme
  }, [theme])

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <h2>📝 Task Manager</h2>
        <button onClick={toggle} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </div>

      <form onSubmit={save} className="input-section">
        <input type="text" value={title} onChange={hTitle}
          placeholder="Enter task title" ref={rTitle} />

        <select value={status} onChange={hStatus}>
          <option>Pending</option>
          <option>In-Progress</option>
          <option>Completed</option>
        </select>

        <select value={priority} onChange={hPriority}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {error && <div className="error-msg">{error}</div>}

      <div className="search-box">
        <input type="text" value={search} onChange={hSearch}
          placeholder="🔍 Search by title..." />
      </div>

      <ul>
        {filtered.map((t, index) =>
          <li key={t.id}>
            {eid === t.id ?
              <>
                <input type="text" value={etitle} onChange={hEtitle} />
                <select value={estatus} onChange={hEstatus}>
                  <option>Pending</option>
                  <option>In-Progress</option>
                  <option>Completed</option>
                </select>
                <select value={epriority} onChange={hEpriority}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <div className="button-group">
                  <button onClick={update} className="save-btn">Save</button>
                  <button onClick={() => setEid(null)} className="cancel-btn">Cancel</button>
                </div>
              </>
              :
              <>
                <span className="task-title">
                  {index + 1}. {t.title}
                  <div className="meta">
                    <span>Status: <strong>{t.status}</strong></span>
                    <span>Priority: <strong>{t.priority}</strong></span>
                    <span className="timestamp">🕓 Created: {t.created_date}</span>
                    <span className="timestamp">🔄 Updated: {t.updated_date}</span>
                  </div>
                </span>
                <div className="button-group">
                  <button onClick={() => startEdit(t)} className="edit-btn">Edit</button>
                  <button onClick={() => del(t.id)} className="delete-btn">Delete</button>
                </div>
              </>
            }
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
