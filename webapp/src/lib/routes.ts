const getRouteParams = (x: any) => x

export const getAllMemoriesRoute = () => '/'

export const viewMemoryRouteParams = {memoryId: ':memoryId'}
export type viewMemoryRouteTypes = {memoryId: string}
export const getViewMemoryRoute = ({memoryId} : {memoryId: string}) => `/ideas/${memoryId}`