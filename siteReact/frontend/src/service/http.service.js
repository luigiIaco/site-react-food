const getService = async (url) => {
  const api = await fetch(url);
  const data = await api.json();
  return data;
};

export { getService };
