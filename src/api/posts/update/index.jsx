import load from "../../../storage/load";

async function updatePost(id, { title, body, tags }) {
  const token = load("accessToken");
  const response = await fetch(
    `https://v2.api.noroff.dev/blog/posts/Niklas/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
        tags,
      }),
    }
  );
  return response;
}
export default updatePost;
