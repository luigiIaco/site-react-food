const postService = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Qualcosa è andato storto");
  }
};

const getService = async (url) => {
  const api = await fetch(url);
  const data = await api.json();
  return data;
};

export { getService, postService };
