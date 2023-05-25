import { createSignal, onCleanup, onMount } from "solid-js";

import image1 from "../assets/image-1.jpeg";
import image2 from "../assets/image-2.jpeg";
import image3 from "../assets/image-3.jpg";

const STYLES = [
  { borderRadius: "50%", transform: "" },
  { borderRadius: "50px", transform: "rotate(-2deg)" },
  { borderRadius: "10px", transform: "" },
];

export function Portrait() {
  const [state, setState] = createSignal(0);

  let interval: number | undefined;

  function startFading() {
    interval = setInterval(function () {
      const newState = (state() + 1) % STYLES.length;

      setState(newState);
    }, 5000);
  }

  function stopFading() {
    clearInterval(interval);
  }

  onMount(function () {
    startFading();
  });

  onCleanup(function () {
    stopFading();
  });

  const imageClass = "w-full h-full object-cover absolute hover:cursor-none";

  function imageVisibleClass(num: number) {
    return state() === num ? "opacity-100" : "opacity-0";
  }

  function style() {
    const { borderRadius, transform } = STYLES[state()];

    return {
      transition: "all 1s ease",
      "border-radius": borderRadius,
      transform: transform,
    };
  }

  return (
    <div
      class="relative row-span-2 justify-self-center self-center w-48 h-48 md:w-80 md:h-80 md:col-span-1 col-span-2"
      onMouseLeave={startFading}
      onMouseOver={stopFading}
    >
      <img
        style={style()}
        class={`${imageClass} ${imageVisibleClass(0)}`}
        src={image1}
        alt="Picture of Luis Meyer"
      />

      <img
        style={style()}
        class={`${imageClass} ${imageVisibleClass(1)}`}
        src={image2}
        alt="Picture of Luis Meyer"
      />

      <img
        style={style()}
        class={`${imageClass} ${imageVisibleClass(2)}`}
        src={image3}
        alt="Picture of Luis Meyer"
      />
    </div>
  );
}
