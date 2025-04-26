'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';

interface Event {
  title: string;
  details: string;
  start: Date;
  end: Date;
}

const ReminderApp: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({ title: '', details: '', start: new Date(), end: new Date() });
  const [todoList, setTodoList] = useState<{ task: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const addEvent = () => {
    if (newEvent.title.trim() !== "") {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', details: '', start: new Date(), end: new Date() });
      setOpenSnackbar(true);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodoList([...todoList, { task: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = todoList.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTodoList(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 min-h-screen animate-fadeIn">
      <div className="bg-blue-50 shadow-xl rounded-lg p-6 w-full max-w-lg text-center transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-indigo-700">Reminder Calendar</h2>
        
        <div className="mt-4 p-4 border rounded-lg shadow-md h-64 overflow-auto bg-white">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="p-2 border-b last:border-none">
                <p className="text-lg font-semibold text-gray-800">{event.title}</p>
                <p className="text-sm text-gray-600">{format(event.start, 'PPpp')}</p>
                <p className="text-sm text-gray-500">{event.details}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reminders added.</p>
          )}
        </div>
        
        <input type="text" placeholder="New Reminder" className="w-full p-2 border rounded-md mt-4" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <textarea placeholder="Appointment Details" className="w-full p-2 border rounded-md mt-2" value={newEvent.details} onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })} />
        <input type="date" className="w-full p-2 border rounded-md mt-2" onChange={(e) => {
          const dateValue = new Date(e.target.value);
          if (!isNaN(dateValue.getTime())) {
            setNewEvent({ ...newEvent, start: dateValue, end: dateValue });
          }
        }} />
        <input type="time" className="w-full p-2 border rounded-md mt-2" onChange={(e) => {
          const time = e.target.value.split(":");
          const hours = parseInt(time[0], 10);
          const minutes = parseInt(time[1], 10);
          if (!isNaN(hours) && !isNaN(minutes)) {
            const newDate = new Date(newEvent.start);
            newDate.setHours(hours, minutes);
            setNewEvent({ ...newEvent, start: newDate, end: newDate });
          }
        }} />
        
        <button className="w-full bg-indigo-500 text-white p-2 rounded-md mt-4 hover:bg-indigo-600 transition duration-300" onClick={addEvent}>Add Reminder</button>
      </div>
      
      <div className="bg-green-50 shadow-xl rounded-lg p-6 w-full max-w-lg text-center transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-green-600">To-Do List</h2>
        <div className="mt-4 p-4 border rounded-lg shadow-md h-64 overflow-auto bg-white">
          {todoList.length > 0 ? (
            todoList.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 border-b last:border-none">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} className="mr-2" />
                <span className={task.completed ? "line-through text-gray-400" : "text-lg text-gray-800"}>{task.task}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks added.</p>
          )}
        </div>
        
        <input type="text" placeholder="New Task" className="w-full p-2 border rounded-md mt-4" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600 transition duration-300" onClick={addTask}>Add Task</button>
      </div>

      {openSnackbar && (
        <div className="bg-green-500 text-white p-3 rounded-md shadow-md">
          Reminder added successfully!
        </div>
      )}
    </div>
  );
};

export default ReminderApp;
