import "./App.css";
import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";

function App() {
  const [doing, setDoing] = useState(["ngoding", "pahami algoritma", "janlup console.log"]);
  const [done, setDone] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    newTask == "" ? alert("tulis dulu kegiatannya") : setDoing((doing) => [...doing, newTask]);
  };

  const setAsDone = (item, i) => {
    // console.log(i);
    // console.log(item);
    doing.splice(i, 1);
    setDoing(doing);
    // console.log(doing);
    setDone((done) => [...done, item]);
  };

  const unDo = (item, i) => {
    // console.log(i);
    // console.log(item);
    done.splice(i, 1);
    setDone(done);
    // console.log(doing);
    setDoing((doing) => [...doing, item]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex border-4 border-white p-4 gap-4 rounded-xl">
          <div className="grid content-start place-content-center h-full w-96 border-2 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Todo</h3>
            <div className="grid content-start">
              {doing.map((item, i) => (
                <div key={i} className="flex justify-between border border-cyan-400 rounded-xl m-2 p-1 h-min w-80">
                  <div className="justify-center">{item}</div>
                  <button key={i} onClick={() => setAsDone(item, i)}>
                    ➡️
                  </button>
                </div>
              ))}
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="border border-emerald-400 rounded-xl m-2 p-1 h-min w-80 text-gray-400">
                      <span>Add Task +</span>
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 w-80 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                      <div className="overflow-hidden rounded-lg shadow-lg  ring-1 bg-white p-3 ring-black ring-opacity-5">
                        <input onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="tulis kegiatan" className="w-72 text-black" />
                        <button onClick={addTask} className="border border-emerald-400 rounded-xl m-2 p-1 h-min w-36 text-black">
                          Add
                        </button>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
          </div>
          <div className="grid content-start place-content-center h-full w-96 border-2 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Done</h3>
            {done.map((item, i) => (
              <div key={i} className="border border-green-400 rounded-xl m-2 p-1 h-min w-80">
                <button onClick={() => unDo(item, i)}>⬅️</button>
                {item}
              </div>
            ))}
            <div className="grid content-start"></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
