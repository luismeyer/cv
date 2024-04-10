import { createSignal, onMount } from "solid-js";

interface MorphProps {
  texts: string[];
}

export function Morph(props: MorphProps) {
  let hasAnimated = false;

  const [textIndex, setTextIndex] = createSignal(0);

  let text1: HTMLSpanElement;
  let text2: HTMLSpanElement;
  let container: HTMLSpanElement;

  let startTimeStamp: number | undefined;
  let previousTimeStamp: number;
  let running = false;

  function setMorph(fraction: number) {
    fraction = Math.cos(fraction * Math.PI) / -2 + 0.5;

    text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
  }

  function step(timeStamp: number) {
    // first execution
    if (startTimeStamp === undefined) {
      startTimeStamp = timeStamp;
    }

    const elapsed = timeStamp - startTimeStamp;

    if (previousTimeStamp !== timeStamp) {
      setMorph(elapsed / 1000);
    }

    if (elapsed < 1000) {
      previousTimeStamp = timeStamp;
      requestAnimationFrame(step);
    } else {
      text2.style.filter = "";
      text2.style.opacity = "100%";

      text1.style.filter = "";
      text1.style.opacity = "0%";

      startTimeStamp = undefined;
      running = false;
    }
  }

  function start() {
    hasAnimated = true;

    if (running) {
      return;
    }

    setTextIndex((prevValue) => prevValue + 1);
    running = true;

    requestAnimationFrame(step);
  }

  onMount(() => {
    setInterval(() => {
      if (hasAnimated) {
        return;
      }

      container.style.animationPlayState = "running";

      setTimeout(() => {
        container.style.animationPlayState = "paused";
      }, 1000);
    }, 5000);
  });

  return (
    <span
      ref={(el) => {
        container = el;
      }}
      class="text-3xl font-bold cursor-pointer w-28 animate-shake"
      style={{ filter: "url(#threshold)" }}
      onClick={start}
    >
      <span
        class="absolute select-none opacity-0 w-full text-4xl"
        ref={(el) => {
          text1 = el;
        }}
      >
        {props.texts[textIndex() % props.texts.length]}
      </span>

      <span
        class="absolute select-none w-full text-4xl"
        ref={(el) => {
          text2 = el;
        }}
      >
        {props.texts[(textIndex() + 1) % props.texts.length]}
      </span>

      <svg id="filters" class="hidden">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -60"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
