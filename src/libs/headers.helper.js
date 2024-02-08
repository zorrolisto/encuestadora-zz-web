export const getHeadersFromLs = () => {
  try {
    const token = localStorage.getItem("authorization");
    if (!token) return null;
    return { headers: { authorization: token } };
  } catch (e) {
    return null;
  }
};
