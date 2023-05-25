import { Link } from "@solidjs/router";

import { PageProps } from "../App";
import { GithubLogo } from "../components/github-logo";
import { Headline } from "../components/headline";
import { Portrait } from "../components/potrait";
import { useNavigate } from "../context/navigation";

export function Person({ isVisible }: PageProps) {
  const navigate = useNavigate();

  function openGithub() {
    navigate("/github");
  }

  return (
    <div class="grid grid-cols-2 grid-rows-2 max-w-5xl p-8">
      <Portrait />

      <div class="col-span-2 md:col-span-1 self-end mt-2 md:mt-0">
        <span>Hi, i'm</span>

        {isVisible() && <Headline input="Luis Meyer" />}
      </div>

      <div class="flex gap-2 flex-col col-span-2 md:col-span-1">
        <p>
          I'm a motivated <b>Product Engineer</b> that is passionate for Full
          Stack Development, Serverless Computing, building high quality
          Software and always keeping up with the bleeding edge of web
          technologies. I'm a team player that loves challenging tasks and
          learning new things everyday.
        </p>

        <Link
          // updates the state of the app
          onClick={openGithub}
          // doesn't actually do anything
          href="/github"
          class="bg-main px-3 py-2 w-fit rounded text-white flex gap-2 items-center"
        >
          <div class="w-6 h-6">
            <GithubLogo />
          </div>

          <span>Github</span>
        </Link>
      </div>
    </div>
  );
}
