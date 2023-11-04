import React, { useState, useEffect, useContext } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Comments from '../components/Comments';
import axios from 'axios';
import { URL, IF } from '../Url';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
} from '@mui/material';

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + '/api/posts/' + postId);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoader(true);
    }
  };

  const handleDeleteConfirmationOpen = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + '/api/posts/' + postId, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate('/');
      setDeleteConfirmationOpen(false);
      setDeleteSnackbarOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + '/api/comments/post/' + postId);
      setComments([...comments, res.data]);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + '/api/comments/create',
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      // console.log(res);
      fetchPostComments();
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate('/edit/' + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeleteConfirmationOpen}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.userName}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img
            src={post.photo ? IF + post.photo : 'fallback-image-url.jpg'}
            className="w-full mx-auto mt-8"
            alt=""
          />
          <div dangerouslySetInnerHTML={{ __html: post.desc }}></div>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comments key={c._id} c={c} post={post} />
          )  )}
          </div>
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
              onClick={postComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            No
          </Button>
          <Button onClick={handleDeletePost} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        message="Post deleted successfully."
      />
    </>
  );
};

export default PostDetails;
