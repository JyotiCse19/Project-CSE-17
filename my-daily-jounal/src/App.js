import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const today = new Date().toDateString();

  const [mood, setMood] = useState(localStorage.getItem("mood") || "");

  const [journal, setJournal] = useState({
    day: "",
    feeling: "",
    healing: "",
    proud: ""
  });

  const [gratitude, setGratitude] = useState(["", "", ""]);

  const [studyHours, setStudyHours] = useState(
    localStorage.getItem("studyHours") || ""
  );

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [taskInput, setTaskInput] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedJournal = JSON.parse(localStorage.getItem("journal"));

    if (savedJournal) {
      setJournal(savedJournal);
    }

    const savedGratitude = JSON.parse(localStorage.getItem("gratitude"));

    if (savedGratitude) {
      setGratitude(savedGratitude);
    }
  }, []);

  const saveJournal = () => {
    localStorage.setItem("mood", mood);
    localStorage.setItem("journal", JSON.stringify(journal));
    localStorage.setItem("gratitude", JSON.stringify(gratitude));
    localStorage.setItem("studyHours", studyHours);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    setMessage("Journal Saved Successfully ✓");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const clearJournal = () => {
    if (
      window.confirm(
        "Are you sure you want to clear today's journal?"
      )
    ) {
      localStorage.clear();

      setMood("");

      setJournal({
        day: "",
        feeling: "",
        healing: "",
        proud: ""
      });

      setGratitude(["", "", ""]);
      setStudyHours("");
      setTasks([]);
    }
  };

  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTasks = [
      ...tasks,
      {
        text: taskInput,
        completed: false
      }
    ];

    setTasks(newTasks);
    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed =
      !updated[index].completed;

    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter(
      (_, i) => i !== index
    );

    setTasks(updated);
  };

  const getFeedback = () => {
    const hours = Number(studyHours);

    if (hours < 2)
      return "Keep going! Every small step counts.";

    if (hours <= 5)
      return "Good progress! Stay consistent.";

    return "Excellent work today! Be proud of yourself.";
  };

  return (
    <div className="container">

      <header>
        <h1>My Daily Journal</h1>

        <p>
          Reflect, Heal, Grow, and Stay Productive.
        </p>

        <span>{today}</span>
      </header>

      <section className="card">
        <h2>Mood Tracker</h2>

        <div className="moods">

          {["😊","😐","😔","😡","😴","❤️"].map(
            (item) => (
              <button
                key={item}
                className={
                  mood === item
                    ? "mood active"
                    : "mood"
                }
                onClick={() => setMood(item)}
              >
                {item}
              </button>
            )
          )}

        </div>
      </section>

      <section className="card">
        <h2>How was your day today?</h2>

        <textarea
          value={journal.day}
          onChange={(e) =>
            setJournal({
              ...journal,
              day: e.target.value
            })
          }
        />

        <small>{journal.day.length} characters</small>
      </section>

      <section className="card">
        <h2>What did you feel today?</h2>

        <textarea
          value={journal.feeling}
          onChange={(e) =>
            setJournal({
              ...journal,
              feeling: e.target.value
            })
          }
        />

        <small>
          {journal.feeling.length} characters
        </small>
      </section>

      <section className="card">
        <h2>Which part of yourself needs healing?</h2>

        <textarea
          value={journal.healing}
          onChange={(e) =>
            setJournal({
              ...journal,
              healing: e.target.value
            })
          }
        />

        <small>
          {journal.healing.length} characters
        </small>
      </section>

      <section className="card">
        <h2>What are you proud of today?</h2>

        <textarea
          value={journal.proud}
          onChange={(e) =>
            setJournal({
              ...journal,
              proud: e.target.value
            })
          }
        />

        <small>
          {journal.proud.length} characters
        </small>
      </section>

      <section className="card">
        <h2>Gratitude Corner</h2>

        {gratitude.map((item, index) => (
          <input
            key={index}
            placeholder={`Gratitude ${index + 1}`}
            value={item}
            onChange={(e) => {
              const copy = [...gratitude];
              copy[index] = e.target.value;
              setGratitude(copy);
            }}
          />
        ))}
      </section>

      <section className="card">
        <h2>Study Tracker</h2>

        <input
          type="number"
          placeholder="Study Hours"
          value={studyHours}
          onChange={(e) =>
            setStudyHours(e.target.value)
          }
        />

        {studyHours && (
          <div className="study-box">
            <h3>
              Total Hours: {studyHours}
            </h3>

            <p>{getFeedback()}</p>
          </div>
        )}
      </section>

      <section className="card">
        <h2>To-Do List</h2>

        <div className="todo-input">

          <input
            value={taskInput}
            placeholder="Add Task"
            onChange={(e) =>
              setTaskInput(e.target.value)
            }
          />

          <button onClick={addTask}>
            Add
          </button>

        </div>

        {tasks.length === 0 && (
          <p>No tasks added yet.</p>
        )}

        {tasks.map((task, index) => (
          <div
            key={index}
            className="task"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                toggleTask(index)
              }
            />

            <span
              className={
                task.completed
                  ? "completed"
                  : ""
              }
            >
              {task.text}
            </span>

            <button
              onClick={() =>
                deleteTask(index)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </section>

      <section className="controls">

        <button
          className="save-btn"
          onClick={saveJournal}
        >
          Save Journal
        </button>

        <button
          className="clear-btn"
          onClick={clearJournal}
        >
          Clear Journal
        </button>

      </section>

      {message && (
        <div className="success">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;