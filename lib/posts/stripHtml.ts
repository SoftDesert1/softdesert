export function stripHtml(
  html: string
) {

  return html

    .replace(/<[^>]*>/g, "")

    .slice(0, 180);
}