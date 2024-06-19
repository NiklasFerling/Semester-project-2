import Logo from "../../assets/logo512.png";
import NewestPosts from "../NewestPosts";

function HomePage() {
  return (
    <div className="mb-20">
      <div className="text-center mt-10">
        <h1 className="text-6xl mb-5 text-white">Devpedia</h1>
        <h2 className="mb-10 text-white text-lg">A developer encyclopedia</h2>
        <img src={Logo} alt="Logo" className="w-72 m-auto mb-10" />
        <form className="border border-neutral-700 rounded-md p-0 w-72 m-auto flex justify-between px-2">
          <input
            type="text"
            placeholder="Search for a topic"
            className="py-1 px-2 flex-1 focus:outline-none bg-neutral-800 text-white"
          />
          <button type="submit">
            <i className="fas fa-search text-white"></i>
          </button>
        </form>
      </div>
      <h2 className="text-2xl mt-20 mb-5 text-center text-white">
        Newest articles
      </h2>
      <div className="flex justify-center mx-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="rounded-md p-5 bg-neutral-700">
            <h3 className="text-xl mb-2 text-white">JavaScript</h3>
            <p className="text-white">
              JavaScript is a programming language that is run by most browsers.
              It allows you to dynamically update the content of your web page.
            </p>
          </div>
          <div className="rounded-md p-5 bg-neutral-700">
            <h3 className="text-xl mb-2 text-white">React</h3>
            <p className="text-white">
              React is a JavaScript library for building user interfaces. It is
              maintained by Facebook and a community of individual developers
              and companies.
            </p>
          </div>
          <div className="rounded-md p-5 bg-neutral-700">
            <h3 className="text-xl mb-2 text-white">Node.js</h3>
            <p className="text-white">
              Node.js is an open-source, cross-platform, back-end JavaScript
              runtime environment that runs on the V8 engine and executes
              JavaScript code outside a web browser.
            </p>
          </div>
        </div>
      </div>
      <NewestPosts />
    </div>
  );
}
export default HomePage;
