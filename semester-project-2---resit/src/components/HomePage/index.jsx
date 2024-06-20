import Logo from "../../assets/logo512.png";
import NewestPosts from "../NewestPosts";
import { PostsContext } from "../../contexts/postsContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";

function HomePage() {
  const { posts, setPosts } = useContext(PostsContext);
  const { register, handleSubmit } = useForm();

  async function onSearch(string) {
    const result = await fetch(
      `https://v2.api.noroff.dev/blog/posts/frekklas?_tag=${string.search}`
    );
    const json = await result.json();
    setPosts(json);
  }

  return (
    <div className="mb-20">
      <div className="text-center mt-10">
        <h1 className="text-6xl mb-5 text-white">Devpedia</h1>
        <h2 className="mb-10 text-white text-lg">A developer encyclopedia</h2>
        <img src={Logo} alt="Logo" className="w-72 m-auto mb-10" />
        <form
          onSubmit={handleSubmit(onSearch)}
          className="border border-neutral-700 rounded-md p-0 w-72 m-auto flex justify-between px-2"
        >
          <input
            {...register("search")}
            type="text"
            placeholder="Search for a topic"
            className="py-1 px-2 flex-1 focus:outline-none bg-neutral-800 text-white"
          />
          <button type="submit">
            <i className="fas fa-search text-white"></i>
          </button>
        </form>
      </div>
      <NewestPosts />
    </div>
  );
}
export default HomePage;
