import { createSignal, createMemo, createRoot } from "solid-js";

function createHeadlines() {
  const [headlines, setHeadlines] = createSignal<string[]>([]);

  function add(headline: string) {
    setHeadlines((prev) => [...prev, headline]);
  }

  function exists(headline: string) {
    return headlines().includes(headline);
  }

  return {
    add,
    exists,
  };
}

export const headlines = createRoot(createHeadlines);
