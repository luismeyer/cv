import image from "../assets/image.jpeg";

export function Person() {
  return (
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="grid grid-cols-2 grid-rows-2 max-w-4xl">
        <img
          class="rounded-full row-span-2 w-96 h-96 object-cover"
          // src={image}
          alt="Headshot of Luis Meyer"
        />

        <h1 class="text-8xl self-end">Luis Meyer</h1>
        <p>
          texttexttexttexttexttexttext
          texttexttexttexttexttexttexttexttexttexttexttexttext
          texttexttexttexttext texttexttexttexttext texttexttexttexttext
          texttexttexttexttext
        </p>
      </div>
    </div>
  );
}
