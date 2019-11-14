import NavigationManager from "./navigationManager";

export interface NavigationPath {
  readonly path: string;
  readonly params: any;
  readonly isClosed: boolean;
}

export function combineNavigationPath(base: string | undefined, path: string) {
  if (base) {
    return path ? base + NavigationManager.pathDelimiter + path : base;
  } else {
    return path;
  }
}

export function splitNavigationPath(path: string): [string, string] {
  if (path.startsWith(NavigationManager.pathDelimiter)) {
    path = path.substr(1);
  }

  const delimiterIndex = path.indexOf(NavigationManager.pathDelimiter);
  if (delimiterIndex < 0 || delimiterIndex === path.length - 1) {
    return [path, undefined];
  } else {
    return [path.substring(0, delimiterIndex), path.substring(delimiterIndex + 1)];
  }
}
