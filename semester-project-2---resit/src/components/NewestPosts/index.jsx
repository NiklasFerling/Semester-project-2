import useApi from "../../hooks/useApi";

function NewestPosts() {
  const { data, loading, error } = useApi(
    "https://v2.api.noroff.dev/blog/posts/frekklas"
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  if (data.length === 0) {
    return <p>No posts yet</p>;
  }
  if (data) {
    console.log(data);
    return <div>posts loaded</div>;
  }
}
export default NewestPosts;
