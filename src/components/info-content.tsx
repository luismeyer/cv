import { ParentProps } from "solid-js";

interface IntoContentProps {
  index: number;
}

export function InfoContent({
  children,
  index,
}: ParentProps<IntoContentProps>) {
  return (
    <div class="border-l-2 pl-2 overflow-hidden">
      <div
        class="transition-all animate-slide -translate-x-full"
        style={{
          "animation-delay": `${index * 100}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
