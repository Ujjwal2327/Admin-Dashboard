import React, { useEffect, useState } from "react";
import Item from "./Item";

const Table = ({
  list,
  setList,
  deletedList,
  setDeletedList,
  selectedList,
  setSelectedList,
  currPage,
  itemsPerPage,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [currPageList, setCurrPageList] = useState([]);

  useEffect(() => {
    setCurrPageList(
      list.filter(
        (item, index) =>
          index >= (currPage - 1) * itemsPerPage &&
          index < currPage * itemsPerPage
      )
    );
  }, [list, currPage, itemsPerPage]);

  // console.log(currPageList);

  const saveHandler = (id, name, email, role) => {
    let newList = list.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.email = email;
        item.role = role;
      }
      return item;
    });
    setList(newList);
  };

  const deleteHandler = (id) => {
    setDeletedList([...deletedList, id]);
    let newList = list.filter((item) => item.id !== id);
    setList(newList);
    let newSelectedList = selectedList.filter((item) => {
      return item !== id;
    });
    setSelectedList(newSelectedList);
  };

  const selectHandler = (id) => {
    if (selectedList.includes(id)) {
      let newList = selectedList.filter((item) => item !== id);
      setSelectedList(newList);
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const selectAllHandler = () => {
    if (selectedList.length === currPageList.length) {
      setSelectAll(false);
      setSelectedList([]);
    } else {
      let newList = currPageList.map((item) => item.id);
      setSelectedList(newList);
      setSelectAll(true);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 pb-16">
      {/* table head */}
      <div
        className={`flex gap-x-3 w-full py-2 ${
          currPageList.length !== 0 &&
          selectedList.length === currPageList.length &&
          "bg-gray-200"
        }`}
      >
        {/* {console.log(selectedList.length, list.length)} */}
        <input
          type="checkbox"
          onChange={selectAllHandler}
          checked={
            currPageList.length !== 0 &&
            selectedList.length === currPageList.length
          }
          className="mx-5 cursor-pointer"
          name="selectAll"
        />
        <div className="headings grid grid-cols-10 gap-4 w-full">
          <div className="col-span-3 text-slate-500 font-bold text-lg">
            Name
          </div>
          <div className="col-span-4 text-slate-500 font-bold text-lg">
            Email
          </div>
          <div className="col-span-2 text-slate-500 font-bold text-lg">
            Role
          </div>
          <div className="col-span-1 text-slate-500 font-bold text-lg">
            Actions
          </div>
        </div>
      </div>

      {/* table body */}
      <div>
        {currPageList.length > 0 ? (
          currPageList.map((item) => (
            <Item
              key={item.id}
              details={item}
              selectAll={selectAll}
              saveHandler={saveHandler}
              deleteHandler={deleteHandler}
              selectHandler={selectHandler}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          ))
        ) : (
          <div className="w-11/12 mx-auto py-2 absolute top-1/2 text-center font-extrabold text-5xl">
            No Data Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
