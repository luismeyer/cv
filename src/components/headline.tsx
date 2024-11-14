import { createSignal, onMount } from "solid-js";
import { headlines } from "../stores/headlines";

interface HeadlineProps {
  initialText: string;
  gradientColors: string;
}

export function Headline(props: HeadlineProps) {
  const input = props.initialText;

  function transformToEmptyText(text: string) {
    return text
      .split("")
      .map(() => "\u00A0")
      .join("");
  }

  const [text, setText] = createSignal(transformToEmptyText(input));

  let pointerIndex = 0;

  let interval: number | undefined;

  onMount(() => {
    // don't animate if the headline already was shown before
    if (headlines.exists(input)) {
      setText(input);
      return;
    }

    interval = setInterval(async () => {
      const random = Math.floor(Math.random() * 10);
      if (random === 0) {
        return;
      }

      if (pointerIndex > input.length) {
        clearInterval(interval);

        headlines.add(input);

        return;
      }

      pointerIndex = pointerIndex + 1;

      const letters = input.slice(0, pointerIndex);

      const rest = transformToEmptyText(input.slice(pointerIndex));

      setText(letters + rest);
    }, 100);
  });

  return (
    <h1
      class={`text-6xl md:text-7xl font-bold mb-5 md:mb-10 bg-gradient-to-r ${props.gradientColors} rounded p-2 text-white`}
    >
      {text()}
    </h1>
  );
}
