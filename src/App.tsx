import { createSignal, JSX, onCleanup, onMount } from "solid-js";

import { useLocation, useNavigate } from "@solidjs/router";

import { NavigateContext } from "./context/navigation";
import { Education } from "./pages/education";
import { Github } from "./pages/github";
import { Internships } from "./pages/internships";
import { Jobs } from "./pages/jobs";
import { Person } from "./pages/person";

interface Page {
  pathname: string;
  Component: (props: PageProps) => JSX.Element;
}

export interface PageProps {
  isVisible: () => boolean;
}

// the scroll delta that needs to be exceeded before triggering a page update
const SCROLL_THRESHHOLD = 50;

// the time in milliseconds it takes to scroll to the next page
const SCROLL_TIME = 500;

export function App() {
  const PAGES: Page[] = [
    { pathname: "/personal", Component: Person },
    { pathname: "/jobs", Component: Jobs },
    { pathname: "/education", Component: Education },
    { pathname: "/hobbies", Component: Internships },
    { pathname: "/github", Component: Github },
  ];

  let scrollingUp = false;
  let scrollingDown = false;

  const [scrolling, setScrolling] = createSignal(false);
  const [page, setPage] = createSignal(0);

  let app: HTMLDivElement | undefined;

  const navigate = useNavigate();
  const location = useLocation();

  // scroll to new page and update the location accordingly
  function changePage(newPage: number) {
    if (!app || page() === newPage) {
      return;
    }

    const data = PAGES[newPage];

    if (data) {
      // persist page as path param
      const { pathname } = data;
      navigate(pathname);
    }

    setScrolling(true);

    if (newPage > page()) {
      // don't scroll if on last page
      if (page() >= PAGES.length - 1) {
        setScrolling(false);
        return;
      }

      scrollingDown = true;
    }

    if (newPage < page()) {
      // don't scroll if on first page
      if (page() <= 0) {
        setScrolling(false);
        return;
      }

      scrollingUp = true;
    }

    setPage(newPage);
  }

  function handleWheel(event: WheelEvent) {
    // because the wheel event is fired more than once when scrolling
    // the scrolling state blocks the wheelhandler, so we don't update
    // the page too often.
    if (!app || scrolling()) {
      return;
    }

    // scroll down
    if (event.deltaY > SCROLL_THRESHHOLD) {
      changePage(page() + 1);
    }

    // scroll up
    if (event.deltaY < -SCROLL_THRESHHOLD) {
      changePage(page() - 1);
    }
  }

  function handleKey(event: KeyboardEvent) {
    // scroll down
    if (event.key === "ArrowDown") {
      changePage(page() + 1);
    }

    // scroll up
    if (event.key === "ArrowUp") {
      changePage(page() - 1);
    }
  }

  let xDown: number | undefined;
  let yDown: number | undefined;

  function handleTouchStart(evt: TouchEvent) {
    const [firstTouch] = evt.touches;
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt: TouchEvent) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    const threshhold = 10;

    if (Math.abs(yDiff) > Math.abs(xDiff) && Math.abs(yDiff) > threshhold) {
      if (yDiff > 0) {
        // scroll down
        changePage(page() + 1);
      } else {
        // scroll up
        changePage(page() - 1);
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

    scrollingUp = false;
    scrollingDown = false;
  }

  function navigateToPage(pathname: string) {
    const pageIndex = PAGES.findIndex((page) => page.pathname === pathname);

    if (pageIndex > -1 && pageIndex !== page()) {
      changePage(pageIndex);
    }
  }

  onMount(function () {
    if (!app) {
      return;
    }

    app.addEventListener("wheel", handleWheel, { passive: true });
    app.addEventListener("transitionend", clearScrolling);

    app.addEventListener("touchstart", handleTouchStart, false);
    app.addEventListener("touchmove", handleTouchMove, false);

    document.addEventListener("keydown", handleKey);

    navigateToPage(location.pathname);

    // clear scrolling here because on first mount the page is
    // not scrolled into view and the 'transitionend' handler
    // is not taking care of the clean up
    clearScrolling();
  });

  onCleanup(function () {
    if (!app) {
      return;
    }

    app.removeEventListener("wheel", handleWheel);
    app.removeEventListener("transitionend", clearScrolling);

    document.removeEventListener("keydown", handleKey);
  });

  function isVisible(index: number) {
    return function () {
      if (scrolling() && scrollingUp) {
        // while scrolling up the next page should be still visible
        return index === page() || index === page() + 1;
      }

      if (scrolling() && scrollingDown) {
        // while scrolling down the previous page should be still visible
        return index === page() || index === page() - 1;
      }

      return index === page();
    };
  }

  return (
    <NavigateContext.Provider value={navigateToPage}>
      <div
        class="overflow-hidden absolute"
        ref={app}
        style={{
          "transition-property": "top",
          "transition-duration": `${SCROLL_TIME}ms`,
          top: `-${window.innerHeight * page()}px`,
        }}
      >
        {PAGES.map(({ Component }, index) => (
          <div class="w-screen h-screen flex items-center justify-center">
            <Component isVisible={isVisible(index)} />
          </div>
        ))}
      </div>
    </NavigateContext.Provider>
  );
}
