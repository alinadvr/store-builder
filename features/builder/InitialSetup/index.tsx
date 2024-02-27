"use client";

import { Task } from "@/features/builder/InitialSetup/Task";
import { initialTasks } from "@/features/builder/InitialSetup/initialTasks";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function InitialSetup() {
  return (
    <details className="w-full" open>
      <summary className="p-6">
        <div className="flex items-center justify-between">
          <span>Just few steps to get started</span>
          <ChevronDownIcon className="arrow w-5 text-slate-500" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-slate-400">0 from 6 tasks complete</span>
          <div className="h-[3px] w-2/3 rounded-full bg-slate-200">
            <div className="h-[3px] w-0 rounded-full bg-violet-400"></div>
          </div>
        </div>
      </summary>
      {initialTasks.map((task, index) => (
        <Task key={task.title} {...task} isCompleted={false} />
      ))}
    </details>
  );
}
