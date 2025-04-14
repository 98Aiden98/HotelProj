export const getAllMemoriesRoute = () => "/";

export const editMemoryRouteParams = { memoryId: ":memoryId" };
export type EditMemoryRouteParams = { memoryId: string };
export const getEditMemoryRoute = ({ memoryId }: EditMemoryRouteParams) =>
  `/memories/${memoryId}/edit`;

export const viewMemoryRouteParams = { memoryId: ":memoryId" };
export type viewMemoryRouteTypes = { memoryId: string };
export const getViewMemoryRoute = ({ memoryId }: viewMemoryRouteTypes) =>
  `/memories/${memoryId}`;

export const getNewMemoryRoute = () => `/memories/new`;
export const getSignUpRoute = () => `/sign-up`;
export const getSignInRoute = () => `/sign-in`;
export const getSignOutRoute = () => `/sign-out`;
