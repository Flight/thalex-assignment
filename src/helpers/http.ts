import { debug } from "./debug";

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      debug.error(
        "HTTP helper",
        `An error has occured during the GET request: ${url}: ${response.status}`
      );

      return null;
    }

    return response.json();
  } catch (error) {
    debug.error(
      "HTTP helper",
      `An error has occured during the GET request: ${url}: ${error}`
    );

    return null;
  }
};

export const post = async <T>(
  url: string,
  data: unknown
): Promise<T | string> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      debug.error(
        "HTTP helper",
        `An error has occured during the POST request: ${url}: ${response.status}`
      );

      return null;
    }

    // Server returns the answer in both formats (JSON if success and text string if not)
    // Better to use the Rest API format on the server side part to prevent this logic
    // https://www.baeldung.com/rest-api-error-handling-best-practices
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    debug.error(
      "HTTP helper",
      `An error has occured during the POST request: ${url}: ${error}`
    );

    return null;
  }
};
