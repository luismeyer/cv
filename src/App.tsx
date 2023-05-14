import {
  Component,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import { Person } from "./pages/person";

interface Page {
  pathname: string;
  component: JSX.Element;
}

// the scroll delta that needs to be exceeded before triggering a page update
const SCROLL_THRESHHOLD = 50;

export const App: Component = () => {
  const PAGES: Page[] = [
    { pathname: "/personal", component: <Person /> },
    { pathname: "/jobs", component: <Person /> },
    { pathname: "/education", component: <Person /> },
    { pathname: "/hobbies", component: <Person /> },
  ];

  const [scrolling, setScrolling] = createSignal(false);
  const [page, setPage] = createSignal(0);

  let app: HTMLDivElement | undefined;

  // unblock the scroll method after timeout which clears after
  // the last wheel event was fired if only doing on scroll
  function clearScrolling() {
    setTimeout(() => setScrolling(false), 1000);
  }

  // because the wheel event is fired more than once when scrolling
  // the scrolling state blocks the scroll method, so we don't update
  // the page too often.
  function blockScrolling() {
    setScrolling(true);
  }

  function scroll(event: WheelEvent) {
    if (!app || scrolling()) {
      return;
    }

    if (event.deltaY > SCROLL_THRESHHOLD && page() < PAGES.length - 1) {
      blockScrolling();

      setPage((prev) => prev + 1);

      clearScrolling();
    }

    if (event.deltaY < -SCROLL_THRESHHOLD && page() > 0) {
      blockScrolling();

      setPage((prev) => prev - 1);

      clearScrolling();
    }
  }

  onMount(() => {
    if (!app) {
      return;
    }

    app.addEventListener("wheel", scroll, { passive: true });

    // scroll to persisted page
    const { pathname } = window.location;
    const pageIndex = PAGES.findIndex((page) => page.pathname === pathname);
    setPage(pageIndex);
  });

  onCleanup(() => {
    if (!app) {
      return;
    }

    app.removeEventListener("wheel", scroll);
  });

  createEffect(() => {
    if (!app) {
      return;
    }

    app.scrollTo({ top: page() * window.innerHeight, behavior: "smooth" });

    // persist page as path param
    const { pathname } = PAGES[page()];
    window.history.pushState(pathname, "Title", pathname);
  });

  return (
    <div class="h-screen overflow-hidden" ref={app}>
      {PAGES.map(({ component }) => component)}
    </div>
  );
};
