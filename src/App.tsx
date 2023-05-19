import { Component, createSignal, JSX, onCleanup, onMount } from "solid-js";

import { useLocation, useNavigate } from "@solidjs/router";

import { Education } from "./pages/education";
import { Github } from "./pages/github";
import { Jobs } from "./pages/jobs";
import { Person } from "./pages/person";

interface Page {
  pathname: string;
  Component: (props: PageProps) => JSX.Element;
}

export interface PageProps {
  isVisible: () => boolean;
  navigate: (pathname: string) => void;
}

// the scroll delta that needs to be exceeded before triggering a page update
const SCROLL_THRESHHOLD = 50;

export const App: Component = () => {
  const PAGES: Page[] = [
    { pathname: "/personal", Component: Person },
    { pathname: "/jobs", Component: Jobs },
    { pathname: "/education", Component: Education },
    { pathname: "/hobbies", Component: () => <div>Hobbies</div> },
    { pathname: "/github", Component: Github },
  ];

  const [scrolling, setScrolling] = createSignal(false);
  const [page, setPage] = createSignal(0);

  let app: HTMLDivElement | undefined;

  const navigate = useNavigate();
  const location = useLocation();

  // scroll to new page and update the location accordingly
  function navigateToPage(newPage: number) {
    if (!app) {
      return;
    }

    app.scrollTo({ top: newPage * window.innerHeight, behavior: "smooth" });

    const data = PAGES[newPage];

    if (data) {
      // persist page as path param
      const { pathname } = data;
      navigate(pathname);
    }

    setPage(newPage);
  }

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

    // scroll down
    if (event.deltaY > SCROLL_THRESHHOLD && page() < PAGES.length - 1) {
      blockScrolling();

      navigateToPage(page() + 1);

      clearScrolling();
    }

    // scroll up
    if (event.deltaY < -SCROLL_THRESHHOLD && page() > 0) {
      blockScrolling();

      navigateToPage(page() - 1);

      clearScrolling();
    }
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === "ArrowDown" && page() < PAGES.length - 1) {
      navigateToPage(page() + 1);
    }

    if (event.key === "ArrowUp" && page() > 0) {
      navigateToPage(page() - 1);
    }
  }

  function changePage(pathname: string) {
    const pageIndex = PAGES.findIndex((page) => page.pathname === pathname);

    if (pageIndex !== page()) {
      navigateToPage(pageIndex);
    }
  }

  onMount(() => {
    if (!app) {
      return;
    }

    app.addEventListener("wheel", handleWheel, { passive: true });

    document.addEventListener("keydown", handleKey);

    changePage(location.pathname);
  });

  onCleanup(() => {
    if (!app) {
      return;
    }

    app.removeEventListener("wheel", handleWheel);

    document.removeEventListener("keydown", handleKey);
  });

  return (
    <div class="h-screen overflow-hidden" ref={app}>
      {PAGES.map(({ Component }, index) => (
        <div class="w-screen h-screen flex items-center justify-center">
          <Component isVisible={() => page() === index} navigate={changePage} />
        </div>
      ))}
    </div>
  );
};
