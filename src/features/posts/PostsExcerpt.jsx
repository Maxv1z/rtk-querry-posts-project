import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

import "./PostExcerpt.style.scss";

import {useDeletePostMutation, useUpdatePostMutation} from "../posts/postsSlice";

const PostsExcerpt = ({postId}) => {
    const post = useSelector((state) => selectPostById(state, postId));

    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const onDeletePost = async () => {
        try {
            await deletePost({id: post.id}).unwrap();
        } catch (err) {
            console.error("failed to delete the post", err);
        }
    };

    const [isEditing, setEditing] = useState(false);
    const titleInputRef = useRef(null);

    const handleTitleClick = () => {
        setEditing(true);
        titleInputRef.current?.focus();
    };

    const handleSaveClick = () => {
        setEditing(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (titleInputRef.current && !titleInputRef.current.contains(event.target)) {
                handleSaveClick();
            }
        };
        if (isEditing) {
            // Add event listener when isEditing is true
            document.addEventListener("mousedown", handleClickOutside);
        }
        // Cleanup the event listener when component unmounts or isEditing becomes false
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div className="container">
            <article key={post.id}>
                <Link to={`/post/${post.id}`}>View post</Link>
                <br />
                {isEditing ? (
                    <>
                        <div className="edit">
                            <input
                                type="text"
                                id={post.id}
                                value={post.title}
                                onChange={(e) =>
                                    updatePost({...post, title: e.target.value})
                                }
                                ref={titleInputRef}
                            />
                            <button onClick={handleSaveClick} className="save-button">
                                Save
                            </button>
                        </div>
                        <p>{post.body}...</p>
                        <button onClick={onDeletePost} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                            Delete post
                        </button>
                    </>
                ) : (
                    <>
                        <label htmlFor={post.id} onClick={handleTitleClick}>
                            {post.title}
                        </label>
                        <p>{post.body}...</p>
                        <button onClick={onDeletePost} className="delete-button">
                            <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                            Delete post
                        </button>
                    </>
                )}
            </article>
        </div>
    );
};

export default PostsExcerpt;
