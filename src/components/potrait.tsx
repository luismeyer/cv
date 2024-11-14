import { createSignal, onCleanup, onMount } from "solid-js";

const STYLES = [
  { borderRadius: "50%", transform: "0" },
  { borderRadius: "50px", transform: "rotate(-2deg)" },
  { borderRadius: "10px", transform: "0" },
];

const ANIMATION_INTERVAL = 3000;

export function Portrait() {
  const [state, setState] = createSignal(0);

  let interval: number | undefined;

  function startFading() {
    interval = setInterval(() => {
      setState((prev) => (prev + 1) % STYLES.length);
    }, ANIMATION_INTERVAL);
  }

  function stopFading() {
    clearInterval(interval);
  }

  onMount(() => {
    startFading();
  });

  onCleanup(() => {
    stopFading();
  });

  const picture = "absolute w-full h-full transition-all";
  const img = "w-full h-full object-cover";

  function imageVisibleClass(num: number) {
    return state() === num ? "opacity-100" : "opacity-0";
  }

  function style() {
    const { borderRadius, transform } = STYLES[state()] ?? {};

    return {
      transition: "all 1s ease",
      "border-radius": borderRadius,
      transform: transform,
    };
  }

  return (
    <div
      class="relative row-span-2 justify-self-center self-center w-48 h-48 md:w-80 md:h-80 md:col-span-1 col-span-2 hover:cursor-none"
      onMouseLeave={startFading}
      onMouseOver={stopFading}
      onFocus={stopFading}
      onBlur={startFading}
    >
      <picture class={picture}>
        <source srcset="images/large/1.webp" media="(min-width: 768px)" />
        <img
          style={style()}
          class={`${img} ${imageVisibleClass(0)}`}
          src="/images/small/1.webp"
          alt="Luis Meyer"
        />
      </picture>

      <picture class={picture}>
        <source srcset="images/large/2.webp" media="(min-width: 768px)" />
        <img
          style={style()}
          class={`${img} ${imageVisibleClass(1)}`}
          src="/images/small/2.webp"
          alt="Luis Meyer"
        />
      </picture>

      <picture class={picture}>
        <source srcset="images/large/3.webp" media="(min-width: 768px)" />
        <img
          style={style()}
          class={`${img} ${imageVisibleClass(2)}`}
          src="/images/small/3.webp"
          alt="Luis Meyer"
        />
      </picture>
    </div>
  );
}
