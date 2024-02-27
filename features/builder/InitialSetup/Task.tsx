"use client";

import { initialTaskDataType } from "@/features/builder/InitialSetup/initialTasks";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface TaskProps extends initialTaskDataType {
  isCompleted: boolean | boolean[];
}

export function Task({ title, text, subtasks, isCompleted }: TaskProps) {
  function isAllSubtasksCompleted(isCompleted: boolean[]) {
    for (const subtask of isCompleted) {
      if (!subtask) return false;
    }
    return true;
  }

  return (
    <details className="border-t border-slate-200 p-6">
      <summary className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="cursor-pointer">
            {(
              typeof isCompleted !== "boolean"
                ? isAllSubtasksCompleted(isCompleted)
                : isCompleted
            ) ? (
              <CheckCircleIcon className="text-emerald-600" />
            ) : (
              <XCircleIcon />
            )}
          </div>
          {title}
        </div>
        <ChevronDownIcon className="arrow w-5 text-slate-500" />
      </summary>
      {text && <p className="ml-8 mt-2 text-slate-400">{text}</p>}
      {subtasks &&
        subtasks.map(({ title, text, completed }) => (
          <section key={title} className="mt-4 text-slate-400">
            <div className="flex items-center gap-1">
              {completed ? (
                <CheckCircleIcon className="text-emerald-600" />
              ) : (
                <div className="mx-0.5 h-[18px] w-[18px] rounded-full border border-dashed border-slate-400"></div>
              )}
              {title}
            </div>
            <p className="ml-6 mt-2">{text}</p>
          </section>
        ))}
    </details>
  );
}
