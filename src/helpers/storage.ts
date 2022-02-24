const TOKEN_KEY = 'token';

export function clearAll() {
  sessionStorage.clear();
  localStorage.clear();
}

export function setToken(value: string) {
  localStorage.setItem(TOKEN_KEY, value);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
