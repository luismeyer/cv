import { For } from "solid-js";

import { PageProps } from "../App";
import { Headline } from "../components/headline";
import { Skill } from "../components/skill";

interface Skill {
  rating: number;
  name: string;
}

const SKILLS: Skill[] = [
  { rating: 5, name: "TypeScript" },
  { rating: 4, name: "AWS" },
  { rating: 5, name: "Node.js" },
  { rating: 5, name: "React" },
];

const LANGUAGES: Skill[] = [
  { rating: 5, name: "English" },
  { rating: 5, name: "German" },
];

export function Skills(props: PageProps) {
  return (
    <div class="flex flex-col justify-center p-8">
      <Headline initialText="Skills" />

      {props.isVisible() && (
        <div class="grid sm:grid-cols-2 gap-12">
          <div class="flex flex-col gap-1">
            <For each={SKILLS}>
              {({ rating, name }) => <Skill name={name} rating={rating} />}
            </For>
          </div>

          <div class="flex flex-col gap-1">
            <For each={LANGUAGES}>
              {({ rating, name }) => <Skill name={name} rating={rating} />}
            </For>
          </div>
        </div>
      )}
    </div>
  );
}
