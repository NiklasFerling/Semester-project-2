function load(key) {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : [];
}
export default load;
