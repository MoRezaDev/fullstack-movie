import { permanentRedirect, redirect } from "next/navigation";

export async function getSliderContent() {
  await new Promise((res) => setTimeout(res, 1000));
  const response = await fetch("http://localhost:3001/content/slider");

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }
  return data;
}

export async function getLastPostsByType(type: string) {
  await new Promise((res) => setTimeout(res, 2000));
  const response = await fetch(`http://localhost:3001/post/type/${type}`);

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

  const newData = data.map((dt: any) => {
    const content = dt.movie || dt.series || dt.anime;
    return { ...dt, content };
  });
  return newData;
}
export async function getPostBySlug(slug: string) {
  const response = await fetch(`http://localhost:3001/content/find-by-slug`, {
    method: "POST",
    body: JSON.stringify({ slug }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }

  if (data.redirect) {
    permanentRedirect(data.redirect);
  }

  return data;
}

export async function getAdvancedSearchQuery(searchQuery: any) {
  // remove the empty values or undefined
  const filteredQueries = Object.fromEntries(
    Object.entries(searchQuery).filter(
      ([_, val]) => val !== undefined && val !== null && val !== ""
    )
  );

  const queryString = new URLSearchParams(
    filteredQueries as Record<string, string>
  ).toString();

  const response = await fetch(
    `http://localhost:3001/content/s?${queryString}`
  );

  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    return {
      error: data.message ?? "error on fetch",
    };
  }

  return data;
}
