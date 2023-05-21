import { Headline } from "./headline";

export interface InfoItem {
  title: string;
  start: string;
  end: string;
  description: string;
}

interface InfoPageProps {
  title: string;
  items: InfoItem[];
  isVisible: () => boolean;
}

export function InfoPage({ title, items, isVisible }: InfoPageProps) {
  return (
    <div class="max-w-2xl">
      {isVisible() && <Headline input={title} />}

      <div class="flex flex-col gap-8">
        {items.map((job) => (
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
