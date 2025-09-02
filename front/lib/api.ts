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

export async function getPostsByType(type: string) {
  await new Promise((res) => setTimeout(res, 2000));
  const response = await fetch(`http://localhost:3001/post?type=${type}`);

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }
  return data;
}

export async function getAllPosts() {
  await new Promise((res) => setTimeout(res, 2000));
  const response = await fetch(`http://localhost:3001/post`);

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }

  const newData = data.map((dt : any) => {
    const content = dt.movie || dt.series || dt.anime;
    return { ...dt, content };
  });

  return newData;
}
