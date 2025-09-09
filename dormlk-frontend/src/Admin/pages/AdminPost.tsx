import { getAllPostsAdmin, updatePostStatus } from "@/Redux/Admin/AdminPostAction.ts";
import { DeleteByPostId } from "@/Redux/Post/PostAction.ts";
import { AppDispatch, RootState } from "@/Redux/store.ts";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPost() {
  const dispatch = useDispatch<AppDispatch>();
  const { allAdminPost } = useSelector((state: RootState) => state.AdminPost);
  const { loginUser } = useSelector((state: RootState) => state.User);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [posts, setPosts] = useState(allAdminPost);
  const navigate = useNavigate()
  console.log("USSS ",loginUser?.userType);
  // if(loginUser?.userType==='REGULAR'){
  //   navigate('/')
  // }
console.log("HOME ",allAdminPost);


  useEffect(() => {
    dispatch(getAllPostsAdmin());
  }, [dispatch]);

  const handleStatusChange = (postId: string, newStatus: string) => {
    console.log("Post ID:", postId);
    console.log("New Status:", newStatus);
    dispatch(updatePostStatus({ postId, newStatus }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  // Filter posts based on the selected status
  const filteredPosts = posts.filter((post) =>
    filterStatus ? post.postStatus === filterStatus : true
  );
  const handleDelete = async(postId: string) => {
    await dispatch(DeleteByPostId(postId));
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));// Ensure deletePost action is dispatched
  };
  return (
    <div>
      <div className="">
        <div className="mx-auto max-w-screen-lg px-2">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
            <p className="flex-1 text-base font-bold text-gray-900">
              Latest Payments
            </p>

            <div className="mt-4 sm:mt-0">
              <p>.</p>
              <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                  <label
                    htmlFor="filterStatus"
                    className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                  >
                    Filter by Status:
                  </label>
                  <select
                    id="filterStatus"
                    className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="PENDING">PENDING</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                >
                  <svg
                    className="mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      className=""
                    ></path>
                  </svg>
                  Export to CSV
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    PostId
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Title
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Date
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Change Status
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Status
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                    Delete
                  </td>
                </tr>
              </thead>

              <tbody className="lg:border-gray-300">
                {
                  filteredPosts.map((post) => (
                    <tr key={post._id} className="">
                      <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                        {post._id}
                      </td>
                      <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                        {post.title}
                      </td>

                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                        07 February, 2022
                      </td>

                      <td>
                      <select
                          className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm"
                          onChange={(e) => handleStatusChange(post._id, e.target.value)}
                          value={post.postStatus}
                        >
                          <option value="PENDING" className="whitespace-no-wrap text-sm">
                            PENDING
                          </option>
                          <option value="ACCEPTED" className="whitespace-no-wrap text-sm">
                            ACCEPTED
                          </option>
                          <option value="REJECTED" className="whitespace-no-wrap text-sm">
                            REJECTED
                          </option>
                        </select>
                      </td>
                      <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div
                          className={`inline-flex items-center rounded-full py-2 px-3 text-xs text-white ${
                            post.postStatus === "ACCEPTED"
                              ? "bg-green-600"
                              : post.postStatus === "REJECTED"
                              ? "bg-red-600"
                              : "bg-gray-400"
                          }`}
                        >
                          {post.postStatus}
                        </div>
                      </td>
                      <td>
                      <Button
                       style={{
                        backgroundColor: '#f12905', // Emerald 600
                        borderColor: '#f12905', // Emerald 600
                        color: '#ffffff', // White text
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#d60000'; // Emerald 700
                        e.currentTarget.style.borderColor = '#d60000'; // Emerald 700
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f12905'; // Emerald 600
                        e.currentTarget.style.borderColor = '#f12905'; // Emerald 600
                      }}
                        onClick={() => handleDelete(post._id)} // Add onClick handler
                        className="bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                      >
                        Delete Post
                      </Button>
                      <Link to={`/admin/post/${post._id}`}>
                      <Button
                       
                        className="bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                      >
                        View Post
                      </Button>
                      </Link>
                    </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
