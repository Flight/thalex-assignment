export const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured during the GET request: ${url}: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

export const post = async <T>(
  url: string,
  data: unknown
): Promise<T | string> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = `An error has occured during the POST request: ${url}: ${response.status}`;
    throw new Error(message);
  }

  // Server returns the answer in both formats (JSON if success and text string if not)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }

  return response.text();
};
