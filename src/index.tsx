/* @refresh reload */
import "./index.css";

import { render } from "solid-js/web";

import { Navigate, Route, Router, Routes } from "@solidjs/router";

import { App } from "./App";

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate href="/personal" />} />
        <Route path="/:page" component={App} />
      </Routes>
    </Router>
  ),
  root
);
