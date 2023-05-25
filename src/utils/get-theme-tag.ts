export function getThemeTag() {
  const theme = document.getElementById("theme");

  if (!theme) {
    throw new Error("Missing theme");
  }

  return theme;
}
