import { useMemo, useState } from "react";
import { createPortal } from 'react-dom';
import { Column, Id, Task } from "./types";
import ColumnContainer from "./column-container";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import TaskCard from "./task-card";
import { useDispatch } from "react-redux";
import { defaultCols, defaultTasks } from "./data";
import SimpleBar from '@/components/ui/simplebar';
import { getCountry } from "@/redux/slices/user/client/clientSlice";



function KanbanBoard() {
  const dispatch = useDispatch();

  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // console.log("Active columns....", activeColumn);
  // console.log("Active task...", activeTask);
  // console.log("Columns...", columns);
  // console.log("Tasks...", tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );


  function onDragStart(event: DragStartEvent) {
    // console.log("on drag start.......", event.active.data.current?.type)
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    // setActiveColumn(null);
    // setActiveTask(null);

    // dispatch(getCountry())


    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    // setColumns((columns) => {
    //   const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

    //   const overColumnIndex = columns.findIndex((col) => col.id === overId);

    //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
    // });

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex((col) => col.id === activeId);
      const overColumnIndex = prevColumns.findIndex((col) => col.id === overId);

      if (activeColumnIndex !== overColumnIndex) {
        return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
      }

      return prevColumns;
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }


  return (
    // <div
    //   className="
    //     mt-6
    //     w-full
    //     overflow-x-auto
    //     overflow-y-hidden
    // "
    // >
    <div className="@container border rounded-md border-t-transparent shadow-sm">
      <SimpleBar className="max-h-[600px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4 min-h-[600px]">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </SimpleBar>
    </div>
  );
}

export default KanbanBoard;