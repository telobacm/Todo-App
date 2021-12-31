import "./App.css";
import { useState, Fragment } from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";

function App() {
  const [doing, setDoing] = useState(["ngoding", "pahami algoritma", "janlup console.log", "fokus"]);
  const [done, setDone] = useState(["maem", "bobok"]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState();

  const addTask = () => {
    newTask == "" ? alert("tulis dulu kegiatannya") : setDoing((doing) => [...doing, newTask]);
  };

  const setAsDone = (item, i) => {
    var array = [...doing];
    array.splice(i, 1);
    setDoing(array);
    setDone((done) => [...done, item]);
  };

  const unDo = (item, i) => {
    var array = [...doing];
    array.splice(i, 1);
    setDone(array);
    setDoing((doing) => [...doing, item]);
  };

  const del = (item, i, e) => {
    let gol = e.target.name;
    if (gol == "doing") {
      var array = [...doing];
      array.splice(i, 1);
      setDoing(array);
    } else {
      var array = [...done];
      array.splice(i, 1);
      setDone(array);
    }
    console.log(`${item} from ${gol} deleted`);
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(i) {
    setIsOpen(true);
    setEditIndex(i);
  }

  const edit = () => {
    var array = [...doing];
    array[editIndex] = newTask;
    setDoing(array);
    closeModal();
  };

  return (
    <div className="App">
      <header className="App-header h-screen">
        <div className="flex border-4 w-5/6 h-5/6 border-white p-4 gap-4 rounded-xl">
          <div className="grid content-start h-full w-1/2 border-2 px-8 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Todo</h3>
            <div className="grid gap-4 content-start">
              {doing.map((item, i) => (
                <div key={i} className="flex justify-between border border-cyan-400 rounded-xl px-4 py-2 h-min w-full grid-cols-3">
                  <div className="justify-center col-span-2">{item}</div>
                  <div className="grid grid-flow-col gap-3 col-span-1">
                    <button onClick={() => openModal(i)}>
                      <img src="edit.png" className="h-7" />
                    </button>
                    <button name="doing" onClick={(e) => del(item, i, e)}>
                      <img src="delete.png" className="h-8" />
                    </button>
                    <button onClick={() => setAsDone(item, i)}>
                      <img src="done.png" className="h-8" />
                    </button>
                  </div>
                </div>
              ))}
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="border border-emerald-400 rounded-xl px-4 py-2 h-min w-full text-gray-400">
                      <span>Add Task +</span>
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 w-full px-4 mt-3 -translate-x-1/2 left-1/2">
                      <div className="overflow-hidden rounded-lg shadow-lg  ring-1 bg-white opacity-75 p-3 ring-black ring-opacity-5">
                        <input onChange={(e) => setNewTask(e.target.value)} type="text" placeholder="tulis kegiatan" className="w-full text-black" />
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
          <div className="grid content-start h-full w-1/2 border-2 px-8 border-white rounded-xl">
            <h3 className="underline mt-4 mb-2">Done</h3>
            <div className="grid gap-4 content-start">
              {done.map((item, i) => (
                <div key={i} className="flex border border-green-400 rounded-xl px-4 py-2 h-min w-full grid-cols-3">
                  <div className="grid grid-flow-col gap-3 col-span-1">
                    <button onClick={() => unDo(item, i)}>
                      <img src="undo.png" className="h-8" />
                    </button>
                    <button name="done" onClick={(e) => del(item, i, e)}>
                      <img src="delete.png" className="h-8" />
                    </button>
                  </div>
                  <div className="col-span-2 ml-8">{item}</div>
                </div>
              ))}
            </div>
            <div className="grid content-start"></div>
          </div>
        </div>
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
                <input type="text" className="px-4 py-2" defaultValue={doing[editIndex]} onChange={(e) => setNewTask(e.target.value)} />
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

// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";

// function MyModal() {
//   let [isOpen, setIsOpen] = useState(true);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//               <Dialog.Overlay className="fixed inset-0" />
//             </Transition.Child>

//             {/* This element is to trick the browser into centering the modal contents. */}
//             <span className="inline-block h-screen align-middle" aria-hidden="true">
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                 <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                   Payment successful
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                     onClick={closeModal}
//                   >
//                     Got it, thanks!
//                   </button>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }
