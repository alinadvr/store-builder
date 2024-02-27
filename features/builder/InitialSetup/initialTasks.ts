export interface initialTaskDataType {
  title: string;
  completed?: boolean;
  text?: string;
  subtasks?: { title: string; text: string; completed: boolean }[];
}

export const initialTasks: initialTaskDataType[] = [
  {
    title: "Choose a design",
    completed: false,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat facilisis velit, venenatis finibus ligula. Donec condimentum, ante ut varius faucibus, velit lacus aliquet metus, a ornare tortor sapien sed quam.",
  },
  {
    title: "Add Content",
    subtasks: [
      {
        title: "Add Product",
        completed: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat facilisis velit, venenatis finibus ligula. Donec condimentum, ante ut varius faucibus, velit lacus aliquet metus, a ornare tortor sapien sed quam.",
      },
      {
        title: "Add Navigation",
        completed: false,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat facilisis velit, venenatis finibus ligula. Donec condimentum, ante ut varius faucibus, velit lacus aliquet metus, a ornare tortor sapien sed quam.",
      },
    ],
  },
];
