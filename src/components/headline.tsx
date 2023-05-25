import { createSignal, onMount } from "solid-js";

interface HeadlineProps {
  input: string;
}

export function Headline({ input }: HeadlineProps) {
  function transformToEmptyText(text: string) {
    return text
      .split("")
      .map(() => "\u00A0")
      .join("");
  }

  const [text, setText] = createSignal(transformToEmptyText(input));

  let pointerIndex = 0;

  let interval: number | undefined;

  onMount(function () {
    interval = window.setInterval(async () => {
      const random = Math.floor(Math.random() * 10);
      if (random === 0) {
        return;
      }

      if (pointerIndex > input.length) {
        clearInterval(interval);

        return;
      }

      pointerIndex = pointerIndex + 1;

      const letters = input.slice(0, pointerIndex);

      const rest = transformToEmptyText(input.slice(pointerIndex));

      setText(letters + rest);
    }, 100);
  });

  return <h1 class="text-6xl md:text-7xl font-bold mb-5 md:mb-10">{text()}</h1>;
}
