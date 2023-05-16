import { createEffect, createSignal } from "solid-js";
import { createTypewriterText } from "../utils/create-typewriter-text";
import { PageProps } from "../App";

interface Item {
  title: string;
  start: string;
  end: string;
  description: string;
}

export function Education({ isVisible }: PageProps) {
  const DATA: Item[] = [
    {
      title: "NORDAKADEMIE Hochschule der Wirtschaft, Elmshorn",
      description: "Bachelor of Science",
      start: "October 2018",
      end: "March 2022",
    },
    {
      title: "Heilwig Gymnasium, Hamburg",
      description: "Abitur",
      start: "August 2009",
      end: "July 2017",
    },
  ];

  const [title, setTitle] = createSignal("");

  createEffect(() => {
    if (!isVisible()) {
      return;
    }

    createTypewriterText("Education", title, setTitle);
  });

  return (
    <div class="max-w-2xl">
      <h1 class="text-8xl font-bold mb-16">{title()}</h1>

      <div class="flex flex-col gap-8">
        {DATA.map((job) => (
          <div class="border-l-2 pl-2">
            <h2 class="text-2xl">{job.title}</h2>
            <span class="text-gray-500">
              {job.start} - {job.end}
            </span>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
