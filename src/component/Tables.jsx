import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";;
// import NotFoundPage from "./Unauthorized";
// import { editUser } from "../../../backend/controller/auth.controller";




const Tables = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const navigate = useNavigate();


  const fetchUsersData = async () => {
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)uid\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
  
      const response = await axios.get('http://localhost:5000/auth/users', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched users data:', response.data.users); // Debug log
      setUsers(response.data.users); // Set the users data in state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  useEffect(() => {
    fetchUsersData();
  }, []);
  
  const fetchCurrentUser = async () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)uid\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  
    const response = await axios.get("http://localhost:5000/auth/me", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorDetail,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersData,
    retry: false,
    onError: (err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          console.error("Unauthorized access:", err.response.data);
          navigate("/not-found");
        } else {
          console.error("Error fetching users:", err.response.data);
          navigate("/not-found");
        }
      }
    },
    onSuccess: (data) => {
      console.log("Users fetched successfully:", data); // Debug log
      setUsers(data); // Set the users state
    },
  });

  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isError: currentUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    onError: (err) => {
      console.error("Error fetching current user:", err);
    },
  });

  const isAdmin = currentUser?.role === "admin";

  

 


  // const USerTable=()=>{

  //   const naviage =useNavigate();
  //   const toast=useToast();

  // }
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/auth/users", {
  //       withCredentials: true,
  //     });
  //     console.log(response.data);

  //     const currentUserResponse = await axios.get(
  //       "http://localhost:5000/auth/me",
  //       { withCredentials: true }
  //     );
  //     setIsAdmin(currentUserResponse.data.role === "admin");

  //     if (response.data && Array.isArray(response.data.users)) {
  //       setUsers(response.data.users);
  //     } else {
  //       console.error("Unexpected response structure:", response.data);
  //       setError("Unexpected response structure");
  //       navigate("/not-found");
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // Handle specific error status codes
  //       if (error.response.status === 401) {
  //         console.error("Unauthorized access:", error.response.data);
  //         navigate("/not-found");
  //       } else if (error.response.status === 403) {
  //         console.error("Forbidden access:", error.response.data);
  //         navigate("/not-found");
  //       } else {
  //         console.error("Error fetching users:", error.response.data);
  //         setError("An error occurred while fetching users");
  //         navigate("/not-found");
  //       }
  //     } else {
  //       console.error("Error fetching users:", error);
  //       setError(error.message || "Error fetching users");
  //       navigate("/not-found");
  //     }
  //   } finally {
  //     setLoading(false); // Ensure loading is set to false in finally block
  //   }
  // };

  // useEffect(() => {
  //   fetchUsersData  }, []);

  const editUser = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/auth/edit/${editingUser.id}`,
        data,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${document.cookie.replace(
              /(?:(?:^|.*;\s*)uid\s*=\s*([^;]*).*$)|^.*$/,
              "$1"
            )}`,
          },
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? response.data.user : user
        )
      );
      setEditingUser(null);
      reset();
      onClose();
    } catch (error) {
      console.error("Error editing user:", error);
      setError(error.message || "Error editing user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/auth/delete/${id}`, {
        withCredentials: true,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.message || "Error deleting user");
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setValue("username", user.username);
    setValue("password", user.password);
    setValue("email", user.email);
    setValue("role", user.role);
    onOpen();
  };

  // if (usersLoading || currentUserLoading) return <p>Loading...</p>;
  if (usersError) return <p>Error: {usersErrorDetail.message}</p>;
  // if (currentUserError) return <p>Error: {currentUserError.message}</p>;

  if (!isAdmin) {
    return (
      <div className="text-4xl text-red-600 text-center mt-5">
        You do not have permission to view this page
      </div>
    );
  }
  return (
    <div className="table-maib">
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Team members
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {users.length}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-[#f5f5f5]">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />
                          <span>Name</span>
                        </div>
                      </th>
                      {/* <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Status</span>
                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.1"
                            />
                            <path
                              d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="0.3"
                            />
                          </svg>
                        </button>
                      </th> */}
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email address
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white">
                                  {user.username} ddd
                                </h2>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {user.role}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {user.email}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <button
                            onClick={() => openEditModal(user)}
                            colorScheme="blue"
                            size="sm"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            colorScheme="red"
                            size="sm"
                            ml={4}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(editUser)}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  {...register("username")}
                  placeholder="Username"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} placeholder="Email" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role</FormLabel>
                <Input {...register("role")} placeholder="Role" />
              </FormControl>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Tables;
