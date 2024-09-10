import { useEffect, useState } from "react";
import deletePost from "../../api/posts/delete";
import Article from "../Article";
import { useContext } from "react";
import { PostsContext } from "../../contexts/postsContext";

function NewestPosts() {
  const { posts, setPosts } = useContext(PostsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetch("https://v2.api.noroff.dev/blog/posts/Niklas");
        const json = await data.json();
        setPosts(json);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [setPosts]);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }
  if (error) {
    return <p className="text-white text-center">An error occurred</p>;
  }
  if (posts.data.length === 0) {
    return <p className="text-white text-center mt-10">No posts found</p>;
  }
  return (
    <>
      <h2 className="text-center text-white text-3xl my-10">
        Articles: ({posts.data.length})
      </h2>
      {posts.data.map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </>
  );
}
export default NewestPosts;
