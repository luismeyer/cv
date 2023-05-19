import { createEffect, createSignal } from "solid-js";

import { PageProps } from "../App";
import image from "../assets/image.jpeg";
import { createTypewriterText } from "../utils/create-typewriter-text";
import { Link } from "@solidjs/router";

export function Person({ isVisible, navigate }: PageProps) {
  const [title, setTitle] = createSignal("");

  createEffect(() => {
    if (!isVisible()) {
      return;
    }

    createTypewriterText("Luis Meyer", title, setTitle);
  });

  return (
    <div class="grid grid-cols-2 grid-rows-2 max-w-5xl gap-2 p-8">
      <img
        class="rounded-full w-96 h-96 object-cover row-span-2 "
        src={image}
        alt="Picture of Luis Meyer"
      />

      <div class="self-end">
        <span>Hi, i'm</span>
        <h1 class="text-8xl font-bold">{title()}</h1>
      </div>

      <div class="flex gap-2 flex-col">
        <p>
          I'm a motivated <b>Product Engineer</b> that is passionate for Full
          Stack Development, Serverless Computing, building high quality
          Software and always keeping up with the bleeding edge of web
          technologies. I'm a team player that loves challenging tasks and
          learning new things everyday.
        </p>

        <Link
          // updates the state of the app
          onClick={() => navigate("/github")}
          // doesn't actually do anything
          href="/github"
          class="bg-purple-900 p-2 w-fit rounded text-white"
        >
          Github
        </Link>
      </div>
    </div>
  );
}
