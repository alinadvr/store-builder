"use client";

import { TextInput } from "@/components/fields/TextInput";
import {
  CheckCircleIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

interface AddOptionBlockProps {
  saveOption: (option: {}) => void;
}

export function AddOptionBlock({ saveOption }: AddOptionBlockProps) {
  const [addNewOptionBlock, setAddNewOptionBlock] = useState(false);
  const [newOption, setNewOption] = useState<{
    title?: string;
    values?: string[];
  }>({});
  const [newValue, setNewValue] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label htmlFor="option">Create options for the product</label>
        <div className="flex gap-5">
          <TextInput
            type="text"
            id="option"
            placeHolder="e.g. Color"
            value={newOption.title || ""}
            onChange={(e) =>
              setNewOption((prevState) => {
                return { title: e.target.value, values: prevState?.values };
              })
            }
          />
          <button
            type="button"
            onClick={() => setAddNewOptionBlock((prevState) => !prevState)}
            disabled={!newOption.title}
            className="text-slate-600 disabled:text-slate-300"
          >
            {addNewOptionBlock ? (
              <MinusIcon onClick={() => setNewOption({})} />
            ) : (
              <PlusIcon />
            )}
          </button>
        </div>
      </div>
      {addNewOptionBlock && (
        <div>
          <label htmlFor="value">
            Enter options values sequentially, adding each option using the
            &ldquo;Add option&rdquo; button
            <div className="flex gap-5">
              <TextInput
                type="text"
                id="value"
                placeHolder="e.g. White"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                disabled={!newOption.title}
              />
              <button
                type="button"
                className="w-32 font-medium disabled:text-slate-400"
                disabled={!newValue}
                onClick={() => {
                  setNewOption((prevState) => {
                    return {
                      title: prevState.title,
                      values: prevState.values
                        ? [...prevState.values, newValue]
                        : [newValue],
                    };
                  });
                  setNewValue("");
                }}
              >
                Add option
              </button>
            </div>
          </label>
        </div>
      )}
      {newOption.values && (
        <div className="flex items-center gap-2">
          <ul className="flex w-full gap-2">
            <span className="font-medium">{newOption.title}: </span>
            {newOption.values.map((value, index, values) => (
              <li key={value + index}>
                {value}
                {index < values.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setNewOption({})}>
            <TrashIcon className="w-5 text-slate-400" />
          </button>
          <button
            type="button"
            disabled={!!newOption.title || newOption.values.length < 1}
          >
            <CheckCircleIcon
              className="w-7 text-emerald-700"
              onClick={() => {
                newOption.title &&
                  newOption.values &&
                  saveOption({ [newOption.title]: newOption.values });
                setNewOption({});
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
}
