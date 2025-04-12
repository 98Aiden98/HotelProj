export const getAllMemoriesRoute = () => "/";

export const viewMemoryRouteParams = { memoryId: ":memoryId" };
export type viewMemoryRouteTypes = { memoryId: string };
export const getViewMemoryRoute = ({ memoryId }: { memoryId: string }) =>
  `/memories/${memoryId}`;
export const getNewMemoryRoute = () => `/memories/new`;
export const getSignUpRoute = () => `/sign-up`;
export const getSignInRoute = () => `/sign-in`;
export const getSignOutRoute = () => `/sign-out`;
