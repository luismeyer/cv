import { For } from "solid-js";

const FILL_STAR = "⭐️";

interface SkillProps {
  rating: number;
  name: string;
}

export function Skill(props: SkillProps) {
  return (
    <div class="flex items-center justify-between gap-8">
      <span class="text-2xl">{props.name}</span>

      <div class="flex gap-1">
        <For each={[...Array(props.rating).keys()]}>
          {(delay) => (
            <span
              style={{ "--star-animation-delay": `0.${delay}s` }}
              class="text-2xl animate-star"
            >
              {FILL_STAR}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}
