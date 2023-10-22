import { Link } from "react-router-dom";
import "./post.css";
import avatar from "../../images/avatar.svg";

export default function Post({post}) {
  const PF = "http://localhost:8080/images/";
  return (
    <div className="post">
       {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
       <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
        <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
      <span className="singlePostAuthor allPostAuthor">
            
        <Link to={`/?user=${post.username}`} className="link authorImg">
          <img
            className="topImg"
            //src={PF + user.profilePic}
            src = {avatar}
            alt=""
          />
          <div>
          <b> {post.username}</b>
          <br/>
          3 mins read
          </div>
          
        </Link>
      </span>
    </div>
  );
}