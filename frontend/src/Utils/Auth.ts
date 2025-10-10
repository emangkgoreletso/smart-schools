//export const isAuthenticated = () => !!localStorage.getItem("token");
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

export const getUserRole = (): string | null => {
  return localStorage.getItem("role");
};

export const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
