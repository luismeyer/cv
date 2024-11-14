import { Show, For, type JSX } from "solid-js";
import { Headline } from "./headline";
import { InfoContent } from "./info-content";

export interface InfoItem {
  title: JSX.Element;
  start: string;
  end: string;
  description?: string;
}

interface InfoPageProps {
  title: string;
  items: InfoItem[];
  isVisible: () => boolean;
  gradientColors: string;
}

export function InfoPage(props: InfoPageProps) {
  return (
    <div class="max-w-2xl p-8">
      <Show when={props.isVisible()}>
        <Headline
          gradientColors={props.gradientColors}
          initialText={props.title}
        />
      </Show>

      <Show when={props.isVisible()}>
        <div class="flex flex-col gap-4 md:gap-8">
          <For each={props.items}>
            {(job, index) => (
              <InfoContent index={index()}>
                <h2 class="text-xl md:text-2xl">{job.title}</h2>

                <span class="text-gray-500">
                  {job.start} - {job.end}
                </span>

                <Show when={job.description}>
                  <p class="text-sm md:text-lg">{job.description}</p>
                </Show>
              </InfoContent>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
