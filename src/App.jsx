import "./App.css";
import PostList from "./features/posts/PostList";
import SinglePost from "./features/posts/SingePost"; // Corrected the import statement

import {Routes, Route} from "react-router";

function App() {
    return (
        <Routes>
            <Route index element={<PostList />} />
            <Route path="post">
                <Route path=":postId" element={<SinglePost />} />
            </Route>
        </Routes>
    );
}

export default App;
