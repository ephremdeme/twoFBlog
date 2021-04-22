export const persistChart = (chart: any) => {
  localStorage.setItem("chart", chart)
}

export const persistTheme = (theme: string) => {
  localStorage.setItem("theme", theme)
}