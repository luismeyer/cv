import { For, createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { GithubLogo } from "../components/github-logo";
import { LetterColumn } from "../components/letter-column";
import { getThemeTag } from "../utils/get-theme-tag";
import { PageProps } from "../routes/[page]";

const COLUMN_WIDTH = 23;

export function Github(props: PageProps) {
  const [columnAmount, setColumnAmount] = createSignal<number[]>([]);

  function updateSignal() {
    setColumnAmount([...Array(Math.round(window.innerWidth / COLUMN_WIDTH))]);
  }

  onMount(function () {
    updateSignal();

    window.addEventListener("resize", updateSignal);
  });

  onCleanup(function () {
    window.removeEventListener("resize", updateSignal);
  });

  createEffect(() => {
    const themeTag = getThemeTag();

    if (!props.isVisible()) {
      themeTag.setAttribute("content", "#ffffff");
      return;
    }

    themeTag.setAttribute("content", "#000000");
  });

  return (
    <div class="w-full h-full flex relative bg-black">
      <For each={columnAmount()}>
        {() => <LetterColumn running={props.isVisible} />}
      </For>

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
