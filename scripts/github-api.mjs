const defaultApiUrl = process.env.GITHUB_API_URL ?? "https://api.github.com";

function buildHeaders(token, extraHeaders = {}) {
  if (!token) {
    throw new Error("GITHUB_TOKEN is required for GitHub API automation.");
  }

  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    ...extraHeaders,
  };
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}

export function getRepoContext() {
  const repository = process.env.GITHUB_REPOSITORY ?? "";
  const [owner, repo] = repository.split("/");

  if (!owner || !repo) {
    throw new Error("GITHUB_REPOSITORY must be set as owner/repo.");
  }

  return { owner, repo };
}

export function createGitHubClient({
  token = process.env.GITHUB_TOKEN,
  apiUrl = defaultApiUrl,
} = {}) {
  async function request(path, { method = "GET", body, headers } = {}) {
    const response = await fetch(`${apiUrl}${path}`, {
      method,
      headers: buildHeaders(token, {
        "Content-Type": "application/json",
        ...headers,
      }),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 404) {
      return null;
    }

    const parsed = await parseResponse(response);

    if (!response.ok) {
      const message =
        parsed && typeof parsed === "object" && "message" in parsed
          ? parsed.message
          : `GitHub API request failed with status ${response.status}.`;

      throw new Error(message);
    }

    return parsed;
  }

  return {
    delete: (path) => request(path, { method: "DELETE" }),
    get: (path) => request(path),
    patch: (path, body) => request(path, { method: "PATCH", body }),
    post: (path, body) => request(path, { method: "POST", body }),
  };
}
