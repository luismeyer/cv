import { createRandomArray } from "../utils/create-random-array";

interface LetterColumnProps {
  running: () => boolean;
}

const LETTER_HEIGHT = 19;

export function LetterColumn(props: LetterColumnProps) {
  // we can safely access the window here. We don't render any
  // columns on the server because they depend on the window width
  const maxHeight = window.innerHeight;

  const lettersAmount = Math.round(maxHeight / LETTER_HEIGHT);

  const letters = createRandomArray(lettersAmount);

  const animationFunction = `steps(${lettersAmount}, jump-none)`;

  const animationTime = `${Math.round(Math.random() * 10 + 1)}s`;

  function animationClass() {
    return props.running() ? "animate-down" : "";
  }

  return (
    <span
      class={`overflow-hidden text-green-300 ${animationClass()}`}
      style={{
        "writing-mode": "vertical-rl",
        "text-orientation": "upright",
        "--down-animation-time": animationTime,
        "--down-animation-function": animationFunction,
      }}
    >
      {letters.reduce((acc, char) => acc + char)}
    </span>
  );
}
