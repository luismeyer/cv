import type { ParentProps } from "solid-js";

interface IntoContentProps {
  index: number;
}

export function InfoContent(props: ParentProps<IntoContentProps>) {
  return (
    <div class="border-l-2 pl-2 overflow-hidden">
      <div
        class="transition-all animate-slide -translate-x-full"
        style={{
          "animation-delay": `${props.index * 100}ms`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
