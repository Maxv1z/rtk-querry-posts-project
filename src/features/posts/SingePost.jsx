import {useSelector} from "react-redux";
import {selectPostById, useGetPostsQuery} from "./postsSlice";

import {useParams} from "react-router-dom";

const SinglePostPage = () => {
    const {postId} = useParams();

    const {isLoading, isError, error} = useGetPostsQuery();

    const post = useSelector((state) => selectPostById(state, postId));

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Post not found: {error}</p>;
    }
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
    );
};

export default SinglePostPage;
