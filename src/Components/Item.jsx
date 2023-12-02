import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";

const Item = ({
  details,
  selectAll,
  saveHandler,
  deleteHandler,
  selectHandler,
  selectedList,
  setSelectedList,
}) => {
  const [name, setName] = useState(details.name);
  const [email, setEmail] = useState(details.email);
  const [role, setRole] = useState(details.role);
  const [edit, setEdit] = useState(false);

  return (
    <div
      className={`flex gap-x-3 w-full py-2 ${
        selectedList.includes(details.id) && "bg-gray-200"
      }`}
    >
      <input
        type="checkbox"
        onChange={(e) => {
          selectHandler(details.id);
          selectedList.includes(details.id);
        }}
        checked={selectedList.includes(details.id)}
        className="mx-5 cursor-pointer"
        name="selection"
      />
      <div className="headings grid grid-cols-10 gap-4 w-full">
        <div className="col-span-3">
          {edit ? (
            <input
              type="text"
              className="w-full border border-slate-500 outline-slate-500 rounded-md px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="username"
            />
          ) : (
            name
          )}
        </div>
        <div className="col-span-4">
          {edit ? (
            <input
              type="text"
              className="w-full border border-slate-500 outline-slate-500 rounded-md px-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          ) : (
            email
          )}
        </div>
        <div className="col-span-2">
          {edit ? (
            <select
              className="w-full border border-slate-500 outline-slate-500 rounded-md px-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              name="role"
            >
              <option value="admin">
                admin
              </option>
              <option value="member">
                member
              </option>
            </select>
          ) : (
            role
          )}
        </div>
        <div className="col-span-1 flex gap-7">
          {/* edit / save */}
          {edit ? (
            <VscSaveAs
              className="save cursor-pointer"
              onClick={() => {
                saveHandler(details.id, name, email, role);
                setEdit(false);
              }}
            />
          ) : (
            <FaRegEdit
              className="edit cursor-pointer"
              onClick={() => setEdit(true)}
            />
          )}
          {/* delete */}
          <AiOutlineDelete
            className="delete cursor-pointer"
            onClick={() => deleteHandler(details.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
