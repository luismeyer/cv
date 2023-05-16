import {
  Component,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

import { Person } from "./pages/person";
import { Jobs } from "./pages/jobs";
import { Education } from "./pages/education";

interface Page {
  pathname: string;
  Component: (props: PageProps) => JSX.Element;
}

export interface PageProps {
  isVisible: () => boolean;
}

// the scroll delta that needs to be exceeded before triggering a page update
const SCROLL_THRESHHOLD = 50;

export const App: Component = () => {
  const PAGES: Page[] = [
    { pathname: "/personal", Component: Person },
    { pathname: "/jobs", Component: Jobs },
    { pathname: "/education", Component: Education },
    { pathname: "/hobbies", Component: Person },
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

  function handleWheel(event: WheelEvent) {
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

  function handleKey(event: KeyboardEvent) {
    if (event.key === "ArrowDown" && page() < PAGES.length - 1) {
      setPage((prev) => prev + 1);
    }

    if (event.key === "ArrowUp" && page() > 0) {
      setPage((prev) => prev - 1);
    }
  }

  onMount(() => {
    if (!app) {
      return;
    }

    app.addEventListener("wheel", handleWheel, { passive: true });

    document.addEventListener("keydown", handleKey);

    // scroll to persisted page
    const { pathname } = window.location;
    const pageIndex = PAGES.findIndex((page) => page.pathname === pathname);

    if (pageIndex > 0) {
      setPage(pageIndex);
    }
  });

  onCleanup(() => {
    if (!app) {
      return;
    }

    app.removeEventListener("wheel", handleWheel);
  });

  createEffect(() => {
    if (!app) {
      return;
    }

    const newPage = page();

    app.scrollTo({ top: newPage * window.innerHeight, behavior: "smooth" });

    const data = PAGES[newPage];

    if (data) {
      // persist page as path param
      const { pathname } = data;
      window.history.pushState(pathname, "Title", pathname);
    }
  });

  return (
    <div class="h-screen overflow-hidden" ref={app}>
      {PAGES.map(({ Component }, index) => (
        <div class="w-screen h-screen flex items-center justify-center">
          <Component isVisible={() => page() === index} />
        </div>
      ))}
    </div>
  );
};
