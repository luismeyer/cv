import { Headline } from "./headline";
import { InfoContent } from "./info-content";

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
    <div class="max-w-2xl p-8">
      {isVisible() && <Headline input={title} />}

      <div class="flex flex-col gap-4 md:gap-8">
        {isVisible() &&
          items.map((job, index) => (
            <InfoContent index={index}>
              <h2 class="text-xl md:text-2xl">{job.title}</h2>

              <span class="text-gray-500">
                {job.start} - {job.end}
              </span>

              <p class="text-sm md:text-lg">{job.description}</p>
            </InfoContent>
          ))}
      </div>
    </div>
  );
}
