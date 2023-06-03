// TODO: Types

interface FetcherProps {
    url: string;
    method: string;
    body: string;
    tags?: string[];
    json?: boolean;
}

interface UserRegisterData {

}

interface UserLoginData {

}

const fetcher = async ({ url, method, body, tags, json = true }: FetcherProps) => {
    const res = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: {tags}
    });
  
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();
      return data;
    }
  };
  
  export const register = async (user: UserRegisterData) => {
    return fetcher({
      url: "/api/register",
      method: "POST",
      body: user,
      json: false,
    });
  };
  
  export const signin = async (user: UserLoginData) => {
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
      body: { name },
    });
  };