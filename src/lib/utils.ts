type ErrorWithMessage = {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    )
  }

  function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError
  
    try {
      return new Error(JSON.stringify(maybeError))
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError))
    }
  }
  

export function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message;
}

export class Timeout {
  time;
  callback;
  startedTime?: number;
  timeout?: ReturnType<typeof setTimeout>;
  constructor(callbackFunction: () => void, time: number) {
      this.time = time; 
      this.callback = callbackFunction; 
      this.run();
  }
  run() {
      this.startedTime = new Date().getTime();
      if (this.time > 0) {
          this.timeout = setTimeout(this.callback, this.time);
      }
  }
  pause() {
      if (!this.startedTime) {
        return;
      }
      let currentTime = new Date().getTime();
      this.time = this.time - (currentTime - this.startedTime);
      clearTimeout(this.timeout);
  }
}

const IS_SERVER = typeof window === "undefined";
export default function getURL(path: string) {
  const baseURL = IS_SERVER
    ? process.env.SERVER_URL!
    : window.location.origin;
  return new URL(path, baseURL).toString();
}