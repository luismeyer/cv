import { createEffect } from "solid-js";

import { PageProps } from "../App";
import { GithubLogo } from "../components/github-logo";
import { LetterColumn } from "../components/letter-column";
import { createResponsiveSignal } from "../utils/create-responsive-signal";
import { getThemeTag } from "../utils/get-theme-tag";

const COLUMN_WIDTH = 23;

export function Github({ isVisible }: PageProps) {
  const columnAmount = createResponsiveSignal(() =>
    Math.round(window.innerWidth / COLUMN_WIDTH)
  );

  createEffect(() => {
    const themeTag = getThemeTag();

    if (!isVisible()) {
      themeTag.setAttribute("content", "#ffffff");
      return;
    }

    themeTag.setAttribute("content", "#000000");
  });

  return (
    <div class="w-full h-full flex relative bg-black">
      {Array(columnAmount())
        .fill(0)
        .map(() => (
          <LetterColumn running={isVisible} />
        ))}

      <a
        href="https://github.com/luismeyer"
        class="flex items-center gap-2 md:gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div class="w-12 h-12 md:w-32 md:h-32">
          <GithubLogo />
        </div>

        <span class="text-4xl md:text-8xl text-white font-bold underline">
          luismeyer
        </span>
      </a>
    </div>
  );
}
