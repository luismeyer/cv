import { onCleanup, onMount } from "solid-js";

export const createResizeEffect = (callback: () => void) => {
  onMount(() => {
    window.addEventListener("resize", callback);
  });

  onCleanup(() => {
    window.removeEventListener("resize", callback);
  });
};
