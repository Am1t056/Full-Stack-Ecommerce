import React, { useEffect, useState } from "react";
import SummarApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../Components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummarApi.allUser.url, {
      method: SummarApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }

    console.log(dataResponse);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white p-4">
      <table className="w-full usertable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sn.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((a, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{a?.name}</td>
              <td>{a?.email}</td>
              <td>{a?.role}</td>
              {/* npm i moment to format this created at */}
              <td>{moment(a?.createdAt).format("LLL")}</td>
              <td>
                <button
                  className=" bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() =>{
                    setUpdateUserDetails(a)
                    setOpenUpdateModal(true)
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateModal && (
        <ChangeUserRole
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          onClose={() => setOpenUpdateModal(false)}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
