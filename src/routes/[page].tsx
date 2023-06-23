import { createSignal, For, JSX, onCleanup, onMount } from "solid-js";

import { useLocation, useNavigate } from "@solidjs/router";

import { Education } from "../pages/education";
import { Github } from "../pages/github";
import { Internships } from "../pages/internships";
import { Jobs } from "../pages/jobs";
import { Person } from "../pages/person";
import { Skills } from "../pages/skills";

interface Page {
  pathname: string;
  Component: (props: PageProps) => JSX.Element;
}

export interface PageProps {
  isVisible: () => boolean;
}

// the scroll delta that needs to be exceeded before triggering a page update
const WHEEL_THRESHHOLD = 50;

// the touch move delta that needs to be exceeded before triggering a page update
const TOUCH_THRESHHOLD = 10;

// the time in milliseconds it takes to scroll to the next page
const SCROLL_TIME = 500;

const PAGES: Page[] = [
  { pathname: "/personal", Component: Person },
  { pathname: "/jobs", Component: Jobs },
  { pathname: "/skills", Component: Skills },
  { pathname: "/education", Component: Education },
  { pathname: "/hobbies", Component: Internships },
  { pathname: "/github", Component: Github },
];

export default function App() {
  const [scrolling, setScrolling] = createSignal(false);

  const location = useLocation();

  function pageIndex() {
    return PAGES.findIndex((page) => page.pathname === location.pathname);
  }

  let app: HTMLDivElement | undefined;

  const navigate = useNavigate();

  // scroll to new page and update the location accordingly
  function changePage(newPage: number) {
    if (pageIndex() === newPage) {
      return;
    }

    setScrolling(true);

    if (newPage > pageIndex()) {
      // don't scroll if on last page
      if (pageIndex() >= PAGES.length - 1) {
        setScrolling(false);
        return;
      }
    }

    if (newPage < pageIndex()) {
      // don't scroll if on first page
      if (pageIndex() <= 0) {
        setScrolling(false);
        return;
      }
    }

    const { pathname } = PAGES[newPage] ?? {};
    if (pathname) {
      navigate(pathname);
    }
  }

  function handleWheel(event: WheelEvent) {
    // because the wheel event is fired more than once when scrolling
    // the scrolling state blocks the wheelhandler, so we don't update
    // the page too often.
    if (scrolling()) {
      return;
    }

    // scroll down
    if (event.deltaY > WHEEL_THRESHHOLD) {
      changePage(pageIndex() + 1);
    }

    // scroll up
    if (event.deltaY < -WHEEL_THRESHHOLD) {
      changePage(pageIndex() - 1);
    }
  }

  function handleKey(event: KeyboardEvent) {
    // scroll down
    if (event.key === "ArrowDown") {
      changePage(pageIndex() + 1);
    }

    // scroll up
    if (event.key === "ArrowUp") {
      changePage(pageIndex() - 1);
    }
  }

  let xDown: number | undefined;
  let yDown: number | undefined;

  function handleTouchStart(evt: TouchEvent) {
    const [firstTouch] = evt.touches;
    xDown = firstTouch?.clientX;
    yDown = firstTouch?.clientY;
  }

  function handleTouchMove(evt: TouchEvent) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0]?.clientX ?? 0;
    const yUp = evt.touches[0]?.clientY ?? 0;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (
      Math.abs(yDiff) > Math.abs(xDiff) &&
      Math.abs(yDiff) > TOUCH_THRESHHOLD
    ) {
      if (yDiff > 0) {
        // scroll down
        changePage(pageIndex() + 1);
      } else {
        // scroll up
        changePage(pageIndex() - 1);
      }
    }

    /* reset values */
    xDown = undefined;
    yDown = undefined;
  }

  // clear all scrolling states and vars
  function clearScrolling() {
    if (!scrolling()) {
      return;
    }

    setScrolling(false);
  }

  const abortController = new AbortController();

  onMount(function () {
    const options = {
      passive: true,
      signal: abortController.signal,
    };

    app?.addEventListener("wheel", handleWheel, options);
    app?.addEventListener("transitionend", clearScrolling, options);
    app?.addEventListener("touchstart", handleTouchStart, options);
    app?.addEventListener("touchmove", handleTouchMove, options);

    document.addEventListener("keydown", handleKey, options);
  });

  onCleanup(function () {
    abortController.abort();
  });

  return (
    <div
      class="fixed"
      ref={app}
      style={{
        "transition-property": "top",
        "transition-duration": `${SCROLL_TIME}ms`,
        top: `calc(100svh * -${pageIndex()})`,
      }}
    >
      <For each={PAGES}>
        {({ Component }, index) => (
          <div class="w-screen h-screen flex items-center justify-center relative">
            <Component
              isVisible={function () {
                if (scrolling()) {
                  // while scrolling the surrounding pages should still visible
                  return (
                    index() === pageIndex() ||
                    index() === pageIndex() - 1 ||
                    index() === pageIndex() + 1
                  );
                }

                return index() === pageIndex();
              }}
            />
          </div>
        )}
      </For>
    </div>
  );
}
