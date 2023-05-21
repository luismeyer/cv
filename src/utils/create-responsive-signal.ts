import { createSignal, onCleanup, onMount } from "solid-js";

export function createResponsiveSignal<T>(calcValue: () => T) {
  const [signal, setSignal] = createSignal(calcValue());

  function updateSignal() {
    setSignal(calcValue);
  }

  onMount(function () {
    window.addEventListener("resize", updateSignal);
  });

  onCleanup(function () {
    window.removeEventListener("resize", updateSignal);
  });

  return signal;
}
