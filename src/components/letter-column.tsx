import { createRandomArray } from "../utils/create-random-array";

export function LetterColumn() {
  const maxHeight = window.innerHeight;
  const lettersPerColum = Math.round(maxHeight / 24);

  const letters = createRandomArray(lettersPerColum);

  const animationFunction = `steps(${Math.floor(
    Math.random() * lettersPerColum + 10
  )}, end)`;

  const animationTime = `${Math.floor(Math.random() * 10)}s`;

  return (
    <div
      class="flex flex-col overflow-y-hidden bg-black animate-down"
      style={{
        "--down-animation-time": animationTime,
        "--down-animation-function": animationFunction,
      }}
    >
      {letters.map((char) => (
        <span class="text-green-300">{char}</span>
      ))}
    </div>
  );
}
