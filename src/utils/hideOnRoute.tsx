export const hideOnRoute = (hideNavBars: string[], path: string): boolean => {
  return !(hideNavBars.includes(path))
}