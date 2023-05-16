import { Accessor, Setter, onCleanup, onMount } from "solid-js";

export function createTypewriterText(
  input: string,
  text: Accessor<string>,
  setText: Setter<string>
) {
  let pointerIndex = 0;

  let interval: number | undefined;

  onMount(() => {
    if (text().length === input.length) {
      return;
    }

    interval = setInterval(async () => {
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

      const rest = input
        .slice(pointerIndex)
        .split("")
        .map(() => "\u00A0")
        .join("");

      setText(letters + rest);
    }, 100);
  });
}
