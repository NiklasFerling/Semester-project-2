import { useState } from "react";
import deletePost from "../../api/posts/delete";
import { useForm } from "react-hook-form";
import updatePost from "../../api/posts/update";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function Article(post) {
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  function handleEdit() {
    setIsEditing(!isEditing);
  }

  function onUpdate(body) {
    const payload = {
      title: body.title,
      body: body.body,
      tags: body.tags.split(" "),
    };
    updatePost(post.post.id, payload);
  }

  const tagsString = post.post.tags.toString().replaceAll(",", " ");

  return (
    <div className="flex flex-col justify-center mx-20">
      <div key={post.post.id} className="rounded-md p-5 bg-neutral-700 mb-10">
        {isEditing ? (
          <form>
            <div className="flex justify-between">
              <input
                {...register("title")}
                defaultValue={post.post.title}
                className="flex-1 rounded-md focus:outline-none px-2 py-1 text-black mb-2 mr-4"
              />
              <div>
                <button onClick={() => handleEdit()}>
                  <i className="fas fa-edit text-white mr-4"></i>
                </button>
                <button onClick={() => deletePost(post.post.id)}>
                  <i className="fas fa-trash text-white"></i>
                </button>
              </div>
            </div>
            <textarea
              {...register("body")}
              rows={5}
              defaultValue={post.post.body}
              className="w-full rounded-md focus:outline-none px-2 py-1"
            ></textarea>
            <input
              className="w-full rounded-md focus:outline-none px-2 py-1"
              {...register("tags")}
              defaultValue={tagsString}
            />
            <button
              onClick={handleSubmit(onUpdate)}
              type="submit"
              className="bg-green-500 text-white rounded-md px-2 py-1 mt-2"
            >
              Update
            </button>
          </form>
        ) : (
          <>
            <div className="flex justify-between">
              <h3 className="text-xl mb-2 text-white">{post.post.title}</h3>
              {isLoggedIn ? (
                <div>
                  <button onClick={() => handleEdit()}>
                    <i className="fas fa-edit text-white mr-4"></i>
                  </button>
                  <button onClick={() => deletePost(post.post.id)}>
                    <i className="fas fa-trash text-white"></i>
                  </button>
                </div>
              ) : null}
            </div>

            <p className="text-white mb-2">{post.post.body}</p>
            {post.post.tags.map((tag) => (
              <span
                key={tag}
                className="text-white bg-neutral-500 rounded-md px-2 py-1 mr-2"
              >
                {tag}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default Article;
