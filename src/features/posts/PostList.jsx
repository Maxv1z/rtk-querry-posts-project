import {useSelector} from "react-redux";
import PostsExcerpt from "../posts/PostsExcerpt";
import {useGetPostsQuery, selectPostIds} from "../posts/postsSlice";

import PostForm from "./PostForm";

function PostList() {
    const {isLoading, isSuccess, isError, error} = useGetPostsQuery();

    const posts = useSelector(selectPostIds);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = posts.map((postId) => <PostsExcerpt key={postId} postId={postId} />);
    } else if (isError) {
        content = <p>{error.message}</p>;
    } else {
        content = <p>No data available.</p>;
    }

    return (
        <section>
            <PostForm />
            {content}
        </section>
    );
}

export default PostList;
