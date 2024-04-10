import { Show } from "solid-js";

import { GithubLogo } from "../components/github-logo";
import { Headline } from "../components/headline";
import { Portrait } from "../components/potrait";
import { LinkedInLogo } from "../components/linkedin-logo";
import { PageProps } from "../routes/[page]";
import { Link } from "../components/link";

export function Person(props: PageProps) {
  return (
    <div class="grid grid-cols-2 grid-rows-2 max-w-5xl p-8">
      <Portrait />

      <div class="col-span-2 md:col-span-1 self-end mt-2 md:mt-0">
        <span>Hi, i'm</span>

        <Show when={props.isVisible()}>
          <Headline
            gradientColors="from-cyan-500 to-blue-500"
            initialText="Luis Meyer"
          />
        </Show>
      </div>

      <div class="flex gap-4 flex-col col-span-2 md:col-span-1">
        <p>
          I'm a motivated <b>Product Engineer</b> that is passionate for Full
          Stack Development, Serverless Computing, building high quality
          Software and always keeping up with the bleeding edge of web
          technologies. I'm a team player that loves challenging tasks and
          learning new things everyday.
        </p>

        <div class="flex gap-8">
          <Link to="/github" icon={GithubLogo}>
            Github
          </Link>

          <Link
            to="https://www.linkedin.com/in/luis-meyer-030227232/"
            icon={LinkedInLogo}
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  );
}
