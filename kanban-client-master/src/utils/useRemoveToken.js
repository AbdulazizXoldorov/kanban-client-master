export default () => {
  const removeToken = () => {
    window.localStorage.removeItem("token");
    // window.location.reload();
  };

  return {
    removeToken,
  };
};
