export const loadTokenFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    return token ? token : '';
  } catch (err) {
    console.error('Could not load token', err);
    return '';
  }
};
