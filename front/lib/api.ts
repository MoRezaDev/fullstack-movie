export async function getSliderContent() {
  const response = await fetch("http://localhost:3001/content/slider");

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }
  return data;
}
