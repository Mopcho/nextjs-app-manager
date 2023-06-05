// TODO: Types

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

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
      return data;
    }
  };
  
  export const register = async (user: any) => {
    return fetcher({
      url: "/api/register",
      method: "POST",
      body: user,
      json: false,
    });
  };
  
  export const signin = async (user: any) => {
    return fetcher({
      url: "/api/signin",
      method: "POST",
      body: user,
      json: false,
    });
  };

  export const createNewProject = (name: string) => {
    return fetcher({
      url: "/api/project",
      method: "POST",
      // @ts-ignore
      body: { name },
    });
  };

  export const getProjects = (ownerId: string, authCookie: string) => {
    return fetcher({
      url: `http://localhost:3000/api/project?ownerId=${ownerId}`,
      method: "GET",
      // @ts-ignore
      tags: ['projects'],
      cookie: authCookie,
    });
  };

