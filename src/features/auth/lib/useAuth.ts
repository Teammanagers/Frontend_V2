export const useAuth = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};
