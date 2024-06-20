import { createContext, useState } from "react";

export const PostsContext = createContext({
  posts: [],
  setPosts: () => {},
});

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
