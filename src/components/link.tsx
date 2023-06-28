import { JSXElement, ParentProps, Show } from "solid-js";

import { Link as SolidLink } from "@solidjs/router";

interface LinkProps extends ParentProps {
  to: string;
  icon?: () => JSXElement;
}

export function Link(props: LinkProps) {
  return (
    <SolidLink
      href={props.to}
      target={props.to.startsWith("http") ? "blank" : undefined}
    >
      <span
        class={`flex gap-1 items-center hover:underline transition-all text-gray-600 fill-gray-600 hover:text-blue-600 hover:fill-blue-600`}
      >
        <Show when={props.icon}>
          <div class="h-6">{props.icon && props.icon()}</div>
        </Show>

        {props.children}
      </span>
    </SolidLink>
  );
}
