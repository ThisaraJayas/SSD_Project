import { getUser } from '@/Redux/Auth/AuthAction.ts';
import { DeleteByPostId, fetchPostsByUserId } from '@/Redux/Post/PostAction.ts';
import { AppDispatch, RootState } from '@/Redux/store.ts';
import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MyPosts() {
  const dispatch = useDispatch<AppDispatch>();
  const { loginUser } = useSelector((state: RootState) => state.User);
  const { allPostByUserId } = useSelector((state: RootState) => state.Post);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (loginUser?._id) {
      const userId: string = loginUser._id.valueOf();
      dispatch(fetchPostsByUserId(userId));
    }
  }, [dispatch, loginUser?._id]);

  console.log(allPostByUserId);

  const filteredPosts = filterStatus
    ? allPostByUserId.filter(post => post.postStatus === filterStatus)
    : allPostByUserId;

  const handleFilterClick = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleFilterOptionClick = (status: string | null) => {
    setFilterStatus(status);
    setIsDropdownOpen(false);
  };

  const handleDelete = async (postId: string) => {
    try {
      await dispatch(DeleteByPostId(postId));
      const userId: string = loginUser._id.valueOf();
      dispatch(fetchPostsByUserId(userId));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="w-auto bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-2">
        <div className="w-full flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:justify-between">
          <form className="relative flex w-full max-w-2xl items-center">
            <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" name="search" className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2" placeholder="Search by Order ID, Date, Customer" />
          </form>

          <div className="relative flex items-center">
            <button
              type="button"
              onClick={handleFilterClick}
              className="inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow"
            >
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              <svg
                className="mr-2 h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 flex flex-col bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleFilterOptionClick(null)}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-200"
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterOptionClick('PENDING')}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-200"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleFilterOptionClick('ACCEPTED')}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-200"
                >
                  Accepted
                </button>
                <button
                  onClick={() => handleFilterOptionClick('REJECTED')}
                  className="px-4 py-2 text-sm text-left hover:bg-gray-200"
                >
                  Rejected
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr>
                <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                  Post Date
                  <svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Post ID</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Title</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Delete Post</td>
              </tr>
            </thead>

            <tbody className="bg-white lg:border-gray-300">
              {filteredPosts.map((post, index) => (
                <tr key={index}>
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    <div className="mt-1 flex flex-col text-xs font-medium lg:hidden">
                      <div className="flex items-center">
                        {/* <div className=" whitespace-no-wrap">
                          <span className="mr-2">Post Date:</span>
                          <span>{formatDate(post.createdDateTime)}</span>
                        </div> */}
                      </div>
                      <div className="whitespace-no-wrap">
                        <span className="mr-2">Post ID:</span> {post._id}
                      </div>
                      <div className="whitespace-no-wrap">
                        <span className="mr-2">Title:</span> {post.title}
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{String(post._id)}</td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{post.title}</td>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
                    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-center text-xs ${
                      post.postStatus === 'PENDING' ? 'bg-purple-100 text-purple-800' :
                      post.postStatus === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.postStatus}
                    </span>
                  </td>

                  <td className="whitespace-no-wrap py-4 text-sm font-medium text-gray-600 sm:px-3 lg:table-cell">
                    <Button
                      onClick={() => handleDelete(post._id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}







