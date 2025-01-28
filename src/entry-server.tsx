// @refresh reload

import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />

          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta id="theme" name="theme-color" content="#ffffff" />
          <meta name="description" content="Luis Meyer's CV and more..." />
          <meta
            name="google-site-verification"
            content="BaHFTlT_5_0z5ym34XTCb35KSGMAphuM-3hrtQSCeYM"
          />

          <title>Luis Meyer</title>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
