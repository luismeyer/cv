import { createEffect, createSignal, For, onCleanup, onMount } from "solid-js";

import { track } from "@vercel/analytics";

import { GithubLogo } from "../components/github-logo";
import { LetterColumn } from "../components/letter-column";
import type { PageProps } from "../routes/[[page]]";
import { getThemeTag } from "../utils/get-theme-tag";

const COLUMN_WIDTH = 23;

export function Github(props: PageProps) {
  const [columnAmount, setColumnAmount] = createSignal<number[]>([]);

  function updateSignal() {
    setColumnAmount([...Array(Math.round(window.innerWidth / COLUMN_WIDTH))]);
  }

  const abortController = new AbortController();

  onMount(() => {
    updateSignal();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateSignal, {
        signal: abortController.signal,
      });
    }
  });

  onCleanup(() => {
    abortController.abort();
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
        onClick={() => track("Github Link Clicked")}
        class="flex items-center gap-2 md:gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div class="w-12 h-12 md:w-32 md:h-32 fill-white">
          <GithubLogo />
        </div>

        <span class="text-4xl md:text-8xl text-white font-bold underline">
          luismeyer
        </span>
      </a>
    </div>
  );
}
