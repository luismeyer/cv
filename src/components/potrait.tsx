import { createSignal, onCleanup, onMount } from "solid-js";
import image1 from "../assets/image-1.jpeg";
import image2 from "../assets/image-2.jpeg";

export function Portrait() {
  const [state, setState] = createSignal(0);

  let interval: number | undefined;

  onMount(() => {
    interval = setInterval(() => {
      const newState = (state() + 1) % 2;

      setState(newState);
    }, 5000);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  const imageClass =
    "w-96 h-96 object-cover absolute transition-all duration-1000";

  const imageVisible = (num: number) =>
    state() === num ? "opacity-100" : "opacity-0";

  return (
    <div class="relative row-span-2 justify-self-center w-96 h-96">
      <img
        class={`${imageClass} rounded-full ${imageVisible(0)}`}
        src={image1}
        alt="Picture of Luis Meyer"
      />
      <img
        class={`${imageClass} rounded ${imageVisible(1)}`}
        src={image2}
        alt="Picture of Luis Meyer"
      />
    </div>
  );
}
