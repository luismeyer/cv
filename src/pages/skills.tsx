import { For, Show } from "solid-js";

import { Headline } from "../components/headline";
import { Skill } from "../components/skill";
import type { PageProps } from "../routes/[[page]]";

interface SkillData {
  rating: number;
  name: string;
}

const SKILLS: SkillData[] = [
  { rating: 5, name: "TypeScript" },
  { rating: 4, name: "AWS" },
  { rating: 5, name: "Node.js" },
  { rating: 5, name: "React" },
];

const LANGUAGES: SkillData[] = [
  { rating: 5, name: "English" },
  { rating: 5, name: "German" },
];

export function Skills(props: PageProps) {
  return (
    <div class="flex flex-col justify-center p-8">
      <Show when={props.isVisible()}>
        <Headline
          gradientColors="from-red-500 to-yellow-500"
          initialText="Skills"
        />
      </Show>

      <Show when={props.isVisible()}>
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
      </Show>
    </div>
  );
}
