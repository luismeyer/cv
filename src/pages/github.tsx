import { PageProps } from "../App";
import { GithubLogo } from "../components/github-logo";
import { LetterColumn } from "../components/letter-column";

const COLUMN_WIDTH = 23;

export function Github({ isVisible }: PageProps) {
  const columnAmount = Math.round(window.innerWidth / COLUMN_WIDTH);

  return (
    <div class="w-full h-full flex relative bg-black">
      {Array(columnAmount)
        .fill(0)
        .map(() => (
          <LetterColumn running={isVisible} />
        ))}

      <a
        href="https://github.com/luismeyer"
        class="flex items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <GithubLogo />

        <span class="text-9xl text-white font-bold">/luismeyer</span>
      </a>
    </div>
  );
}
