const baseUrl = process.env.REACT_APP_BACKEND || '/';
export const url = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

export const routes = {
  dashboard: '/dashboard',
}
