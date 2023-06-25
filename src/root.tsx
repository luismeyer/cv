// @refresh reload
import "./index.css";

import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta id="theme" name="theme-color" content="#ffffff" />
        <Meta name="description" content="Luis Meyer's CV and more..." />

        <Title>Luis Meyer</Title>

        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link
          rel="shortcut icon"
          type="image/ico"
          href="/src/assets/favicon.ico"
        />
      </Head>

      <Body>
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
