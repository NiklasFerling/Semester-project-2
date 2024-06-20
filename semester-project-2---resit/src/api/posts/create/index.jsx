import load from "../../../storage/load";

async function createPost({ title, body, tags }) {
  try {
    const token = load("accessToken");
    const response = await fetch(
      "https://v2.api.noroff.dev/blog/posts/frekklas",
      {
        method: "POST",
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
    const json = await response.json();
  } catch (error) {
    console.log(error);
  }
}
export default createPost;
