import React, { useEffect, useState } from "react";
import data from "./Data/jsondata";
import Table from "./Components/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import fastForward from "./assets/fast-forward.png";
import fastBackward from "./assets/fast-backward.png";

const App = () => {
  const [query, setQuery] = useState("");

  const [list, setList] = useState(data);
  const [deletedList, setDeletedList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setTotalPages(Math.ceil(list.length / itemsPerPage));
    if (currPage > Math.ceil(list.length / itemsPerPage))
      setCurrPage(Math.ceil(list.length / itemsPerPage));
    else if (currPage === 0) setCurrPage(1);
  }, [list, itemsPerPage]);
  // eslint-disable-next-line

  const queryHandler = (e) => {
    e.preventDefault();
    let newList = data.filter((item) => !deletedList.includes(item.id));

    if (e.target.value === "") {
      setList(newList);
      return;
    }

    let filteredList = newList.filter((item) => {
      const { name, email, role } = item;
      return (
        name.toLowerCase().includes(query.toLowerCase()) ||
        email.toLowerCase().includes(query.toLowerCase()) ||
        role.toLowerCase().includes(query.toLowerCase())
      );
    });
    setList(filteredList);
  };

  const multideleteHandler = () => {
    let newList = list.filter((item) => !selectedList.includes(item.id));
    setList(newList);
    setDeletedList([...deletedList, ...selectedList]);
    setSelectedList([]);
  };

  const currPageHandler = (page) => {
    if (page > totalPages) setCurrPage(totalPages);
    else setCurrPage(page);
    setSelectedList([]);
  };

  return (
    <div className=" w-[97vw] h-screen mx-auto flex flex-col items-center px-4 gap-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="w-full flex justify-between items-center px-5">
        <form
          className="searchbox flex gap-x-3 w-full max-w-[70%]"
          onSubmit={(e) => queryHandler(e)}
          id='searchbox'
        >
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="searchbox-input w-full h-8 px-5 rounded-lg border-slate-500 outline-slate-500"
            name="query"
          />
          <button className="search-icon p-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold">
            Search
          </button>
        </form>

        <button
          className="flex /*gap-x-4*/ justify-center items-center aspect-square bg-red-500 py-2 px-2 text-white rounded-lg"
          onClick={multideleteHandler}
        >
          {/* <span>Delete Selected</span> */}
          <AiOutlineDelete />
        </button>
      </div>

      <Table
        list={list}
        setList={setList}
        deletedList={deletedList}
        setDeletedList={setDeletedList}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        currPage={currPage}
        itemsPerPage={itemsPerPage}
      />

      <div className="flex justify-between items-center fixed bottom-0 z-10 bg-white w-full py-4 px-5 px-10">
        {/* rows selection count */}
        <div className="flex gap-5 justify-center items-center">
          <div>
            {selectedList.length} of {list.length} row(s) selected
          </div>
          {/* <button
            className="flex gap-x-4 justify-center items-center bg-red-500 py-2 px-3 text-white rounded-lg"
            onClick={multideleteHandler}
          >
            <span>Delete Selected</span>
            <AiOutlineDelete />
          </button> */}
        </div>

        {/* pagination box */}
        <div className="flex justify-center items-center gap-5">
          {/* currpage */}
          <div>
            Page {currPage} of {totalPages}
          </div>

          {/* pagination */}
          <div className="flex justify-center items-center">
            {/* first-page */}
            <div
              className="first-page w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => currPageHandler(1)}
            >
              <img src={fastBackward} alt="fast backward" className="h-2" />
            </div>

            {/* previous-page */}
            {currPage > 1 && (
              <div
                className="previous-page w-10 h-10 flex justify-center items-center cursor-pointer"
                onClick={() => currPageHandler(currPage - 1)}
              >
                <GrFormPrevious className="" />
              </div>
            )}

            {/* page numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index + 1.1}
                className={`${
                  index + 1
                } w-10 h-10 flex justify-center items-center cursor-pointer`}
                onClick={() => currPageHandler(index + 1)}
              >
                {index + 1}
              </div>
            ))}

            {/* next-page */}
            {currPage < totalPages && (
              <div
                className="next-page w-10 h-10 flex justify-center items-center cursor-pointer"
                onClick={() => currPageHandler(currPage + 1)}
              >
                <GrFormNext />
              </div>
            )}

            {/* last-page */}
            <div
              className="last-page w-10 h-10 flex justify-center items-center cursor-pointer"
              onClick={() => currPageHandler(totalPages)}
            >
              <img src={fastForward} alt="fast forward" className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
