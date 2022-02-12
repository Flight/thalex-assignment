export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, { mode: "no-cors" });

  if (!response.ok) {
    const message = `An error has occured during the GET request: ${url}: ${response.status}`;
    throw new Error(message);
  }

  const body = await response.json();
  return body;
};

export const post = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "no-cors",
  });

  if (!response.ok) {
    const message = `An error has occured during the POST request: ${url}: ${response.status}`;
    throw new Error(message);
  }

  const body = await response.json();
  return body;
};
