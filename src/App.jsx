import "./App.css";
import Counter from "./components/Counter";
import LoginUseReducer from "./components/LoginUseReducer";
import LoginUseState from "./components/LoginUseState";
import MyTasksUctx from "./components/MyTasksUctx";

function App() {
  return (
    <div className="App">
      {/* <Counter></Counter> */}
      {/* <LoginUseState></LoginUseState> */}
      {/* <LoginUseReducer></LoginUseReducer> */}
      <MyTasksUctx></MyTasksUctx>
    </div>
  );
}

export default App;
