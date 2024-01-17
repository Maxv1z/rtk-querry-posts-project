import React, {useState} from "react";
import {nanoid} from "nanoid";
import {useAddPostMutation} from "../posts/postsSlice";

function PostForm() {
    const [addPost] = useAddPostMutation();

    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addPost({
            userId: 1,
            title: newPost.title,
            body: newPost.body,
            id: nanoid(),
            date: Date.now(),
        });
        setNewPost({title: "", body: ""});
    };
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
                <label>Body:</label>
                <input
                    type="text"
                    value={newPost.body}
                    onChange={(e) => setNewPost({...newPost, body: e.target.value})}
                />
                <button type="submit">Add Todo</button>
            </form>
        </section>
    );
}

export default PostForm;
