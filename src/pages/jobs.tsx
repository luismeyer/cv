import { createEffect, createSignal } from "solid-js";
import { PageProps } from "../App";
import { createTypewriterText } from "../utils/create-typewriter-text";

interface Job {
  title: string;
  start: string;
  end: string;
  description: string;
}

export function Jobs({ isVisible }: PageProps) {
  const DATA: Job[] = [
    {
      title: "Product Engineer at Accenture Song, Hamburg",
      description:
        "At Accenture Song I worked for an automotive client building Micro Frontends. This included the AWS Infrastructure as well as developing a Serverless Backend-For-Frontend and React Applications in Typescript.",
      start: "March 2022",
      end: "Present",
    },
    {
      title: "Dual Student at SinnerSchrader Deutschland GmbH, Hamburg",
      description:
        "For my dual studies I worked as a Product Engineer in 10 week intervals, alternating between University and different Client Projects. During the time I was getting to know the daily business of Web-Development and learned the technologies that are used in the industry.",
      start: "October 2018",
      end: "March 2022",
    },
  ];

  const [title, setTitle] = createSignal("");

  createEffect(() => {
    if (!isVisible()) {
      return;
    }

    createTypewriterText("Experience", title, setTitle);
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
