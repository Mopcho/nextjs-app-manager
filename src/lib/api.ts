import getURL from "./utils";

interface FetcherProps {
    url: string;
    method: string;
    body?: string;
    tags?: string[];
    cookie?: string;
    json?: boolean;
}

const fetcher = async ({ url, method, body, tags, cookie, json = true }: FetcherProps) => {
  let res;
  if (cookie) {
    res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      credentials: 'include',
      headers: {
        Cookie: cookie,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: {tags}
    });
  } else {
    res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: {tags}
    });
  }
    
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    }
  };
  
  export const register = async (user: any) => {
    return await fetcher({
      url: getURL(`/api/register`),
      method: "POST",
      body: user,
      json: true,
    });
  };
  
  export const signin = async (user: any) => {
    return await fetcher({
      url: getURL(`/api/signin`),
      method: "POST",
      body: user,
      json: false,
    });
  };

  export const createNewProject = async (name: string) => {
    return await fetcher({
      url: getURL(`/api/project`),
      method: "POST",
      // @ts-ignore
      body: { name },
    });
  };

  export const getProjects = async (ownerId: string, authCookie: string) => {
    return await fetcher({
      url: getURL(`/api/project?ownerId=${ownerId}`),
      method: "GET",
      // @ts-ignore
      tags: ['projects'],
      cookie: authCookie,
    });
  };

  interface TaskCreateData {
    name: string,
    description: string,
    status: string,
    projectId: string,
  }

  export const createNewTask = async ({name, description, status, projectId}: TaskCreateData) => {
    return await fetcher({
      url: getURL(`/api/task`),
      method: "POST",
      // @ts-ignore
      body: { name, description, status, projectId },
    });
  };