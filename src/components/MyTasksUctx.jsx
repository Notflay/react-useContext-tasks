import React, { useContext, useReducer, useState } from "react";

//Actions
const CREATE_TASK = "CREATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const FILT_TASK = "FILT_TASK";

const CHANGE_TASK = "CHANGE_TASK";
const SHOW_TASKS = "SHOW_TASKS";

const myContext = React.createContext(null);

export default function MyTasksUctx() {
  const [task, setTask] = useState({
    id: 0,
    titulo: "",
    descripcion: "",
    completed: false,
  });

  const [num, setNum] = useState(1);

  const initialState = [];

  // Reducer To Change

  const reducer = (state, action) => {
    switch (action.type) {
      case CREATE_TASK:
        console.log(action.payload);
        return [
          ...state,
          {
            id: action.payload.id,
            titulo: action.payload.titulo,
            descripcion: action.payload.descripcion,
            completed: action.payload.completed,
          },
        ];

      case DELETE_TASK:
        return state.filter((todo) => todo.id !== action.payload.id);

      case CHANGE_TASK:
        return state.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        );

      /* case FILT_TASK:
        return state.filter((todo) => todo.completed);

      case SHOW_TASKS:
        return state; */

      default:
        return state;
    }
  };

  const filterTodos = (todos, filter) => {
    switch (filter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_ACTIVE":
        return todos.filter((t) => t.completed);
      case "SHOW_INCOMPLETED":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  };

  const Tasks = ({ filt }) => {
    const state = useContext(myContext);

    const todos = filterTodos(state, filt);

    return (
      <ul>
        {todos
          ? todos.map((t, i) => {
              return (
                <li
                  key={i}
                  onClick={() =>
                    dispatch({ type: CHANGE_TASK, payload: { id: t.id } })
                  }
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    textDecorationColor: t.completed ? "green" : "none",
                    color: t.completed ? "green" : "white",
                  }}
                >
                  {t.titulo} {t.descripcion}
                  <button
                    style={{ marginLeft: "30px" }}
                    onClick={() => {
                      dispatch({ type: DELETE_TASK, payload: { id: t.id } });
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })
          : null}
      </ul>
    );
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [filt, setFilt] = useState("SHOW_ALL");

  return (
    <myContext.Provider value={state}>
      <button onClick={() => setFilt("SHOW_ALL")}>TODAS LAS TAREAS</button>
      <button onClick={() => setFilt("SHOW_ACTIVE")}>TAREAS HECHAS</button>
      <button onClick={() => setFilt("SHOW_INCOMPLETED")}>
        TAREAS SIN COMPLETAR
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: CREATE_TASK,
            payload: {
              id: task.id,
              titulo: task.titulo,
              descripcion: task.descripcion,
              completed: task.completed,
            },
          });
          setNum(num + 1);
        }}
      >
        <input
          type={"text"}
          placeholder="titulo"
          onChange={(e) => {
            setTask({
              ...task,
              id: num,
              titulo: e.target.value,
              completed: task.completed,
            });
          }}
        />
        <input
          type={"text"}
          placeholder="descripcion"
          onChange={(e) => {
            setTask({
              ...task,
              id: num,
              descripcion: e.target.value,
              completed: task.completed,
            });
          }}
        />
        <button type="submit">Creat tarea</button>
      </form>
      <Tasks filt={filt} />
    </myContext.Provider>
  );
}
