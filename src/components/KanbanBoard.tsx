import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialColumns = {
  todo: { id: 'todo', title: 'To Do', tasks: [] },
  inProgress: { id: 'inProgress', title: 'In Progress', tasks: [] },
  done: { id: 'done', title: 'Done', tasks: [] },
};

export const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskItem = { id: Date.now().toString(), content: newTask };
      setColumns({
        ...columns,
        todo: {
          ...columns.todo,
          tasks: [...columns.todo.tasks, newTaskItem],
        },
      });
      setNewTask('');
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const newTasks = Array.from(column.tasks);
      const [reorderedItem] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: newTasks,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [movedItem] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Kanban Board</h2>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="mr-2"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="bg-gray-100 p-2 rounded-md w-64">
              <h3 className="font-bold mb-2">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[100px]">
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};