import "./App.css";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const API_URL = "http://localhost:3004/list";

  function getData() {
    axios.get(API_URL).then((res) => setList(res.data));
  }

  useEffect(() => {
    getData();
  }, []);

  const addTask = () => {
    const payload = { value: newTask, group: "todo" };
    //id doesn't necessarily to be written in payload, json-server got auto id increment by default
    const configPost = { headers: { "Content-Type": "application/json" } };
    newTask == ""
      ? alert("tulis dulu kegiatannya")
      : axios
          .post(API_URL, payload, configPost)
          .then((res) => {
            getData();
            console.log(res);
          })
          .catch((error) => console.log(error));
    setNewTask("");
  };

  const setAsDone = async (item) => {
    const payload = { id: item.id, value: item.value, group: "done" };
    axios
      .patch(`${API_URL}/${item.id}`, payload)
      .then((res) => {
        getData();
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const unDo = async (item) => {
    const payload = { id: item.id, value: item.value, group: "todo" };
    axios
      .patch(`${API_URL}/${item.id}`, payload)
      .then(getData(), (res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const del = (i) => {
    const num = list[i].id;
    axios
      .delete(`${API_URL}/${num}`)
      .then(() => getData())
      .catch((err) => console.log(err));
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(i, id) {
    setIsOpen(true);
    console.log(`index = ${i}, id = ${id}`);
    setEditIndex(i);
    setEditId(id);
  }

  const edit = () => {
    const payload = { value: newTask };
    if (newTask === "") {
      console.log(`nggak ada perubahan`);
      closeModal();
    } else {
      axios
        .patch(`${API_URL}/${editId}`, payload)
        .then((res) => {
          getData();
          console.log(res.data);
        })
        .catch((error) => console.log(error));
      closeModal();
      setNewTask("");
    }
  };

  /* grouping cara rempong */
  // const grouping = () => {
  //   let copy = [...list];
  //   let groupped = copy.reduce((reducer, array) => {
  //     reducer[array.group] = [...(reducer[array.group] || []), array];
  //     return reducer;
  //   }, {});
  //   console.log(groupped.todo);
  // };

  return (
    <div className="App">
      <header className="App-header h-screen">
        <div className="flex border-4 w-5/6 h-5/6 border-white p-4 gap-4 rounded-xl">
          <div className="grid content-start h-full overflow-y-auto w-1/2 border-2 px-8 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Todo</h3>
            <div className="grid gap-4 content-start">
              {list.map((item, i) => {
                return item.group === "todo" ? (
                  <div key={i} className="flex justify-between border border-cyan-400 rounded-xl px-4 py-2 h-min w-full grid-cols-3">
                    <div className="justify-center col-span-2">{item.value}</div>
                    <div className="grid grid-flow-col gap-3 col-span-1">
                      <button onClick={() => openModal(i, item.id)}>
                        <img src="edit.png" className="h-7" />
                      </button>
                      <button onClick={(e) => del(i)}>
                        <img src="delete.png" name="doing" className="h-8" />
                      </button>
                      <button onClick={() => setAsDone(item)}>
                        <img src="done.png" className="h-8" />
                      </button>
                    </div>
                  </div>
                ) : null;
              })}

              <div className="flex space-4 border border-cyan-400 rounded-xl px-4 py-2 h-min w-full grid-cols-3">
                <input onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="tulis kegiatan baru" className="bg-main text-center w-full mr-5 text-lg " />
                <button onClick={addTask}>
                  <img src="add.png" className="h-7 my-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid content-start h-full overflow-y-auto w-1/2 border-2 px-8 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Done</h3>
            <div className="grid gap-4 content-start">
              {list.map((item, i) => {
                return item.group === "done" ? (
                  <div key={i} className="flex border border-green-400 outline-4 outline-red rounded-xl px-4 py-2 h-min w-full grid-cols-3">
                    <div className="grid grid-flow-col gap-3 col-span-1">
                      <button onClick={() => unDo(item)}>
                        <img src="undo.png" className="h-8" />
                      </button>
                      <button name="done" onClick={(e) => del(i)}>
                        <img src="delete.png" name="done" className="h-8" />
                      </button>
                    </div>
                    <div className="col-span-2 ml-8">{item.value}</div>
                  </div>
                ) : null;
              })}
            </div>
            <div className="grid content-start"></div>
          </div>
        </div>
        <p className="text-sm mt-6 underline underline-offset-4">Dark Mode 4 LYFE ! ✊🏻</p>
      </header>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <input type="text" className="px-4 py-2" defaultValue={editIndex !== null ? list[editIndex].value : ""} onChange={(e) => setNewTask(e.target.value)} />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={edit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default App;
