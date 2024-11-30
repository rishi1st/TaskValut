import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully", {
      style: { background: "#1e1e2e", color: "#f38ba8" },
    });
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 text-gray-100">
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 bg-gradient-to-r from-[#242635] to-[#1a1c2b] rounded-[0.5rem] border border-gray-700 shadow-md">
          <input
            type="search"
            placeholder="Search paste here..."
            className="focus:outline-none w-full bg-transparent text-gray-300 placeholder:text-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-gray-700 bg-gradient-to-b from-[#1a1c2b] to-[#121318] py-4 rounded-[0.5rem] shadow-lg">
          <h2 className="px-4 text-4xl font-bold text-gray-200 border-b border-gray-700 pb-4">
            All Notes
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-gray-700 bg-gradient-to-r from-[#2b2d3c] to-[#20232f] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.5rem] shadow-md"
                >
                  {/* Heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-2xl font-semibold text-gray-200">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-gray-400">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.3rem] bg-[#3b4252] border border-[#4c566a] hover:bg-[#4c566a] group transition duration-200"
                      >
                        {/* <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-[#88c0d0] group-hover:text-[#81a1c1]"
                            size={20}
                          />
                        </a> */}

                        <Link to={`/?pasteId=${paste?._id}`}>
                        <PencilLine
                            className="text-[#88c0d0] group-hover:text-[#81a1c1]"
                            size={20}
                          />
                        </Link>

                      </button>
                      <button
                        className="p-2 rounded-[0.3rem] bg-[#bf616a] border border-[#a54248] hover:bg-[#a54248] group transition duration-200"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-white group-hover:text-gray-200"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.3rem] bg-[#ebcb8b] border border-[#d5ae63] hover:bg-[#d5ae63] group transition duration-200">
                        {/* <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye
                            className="text-gray-800 group-hover:text-gray-900"
                            size={20}
                          />
                        </a> */}
                        <Link to={`/pastes/${paste?._id}`} >
                        <Eye
                            className="text-gray-800 group-hover:text-gray-900"
                            size={20}
                          />
                        </Link>
                      </button>
                      <button
                        className="p-2 rounded-[0.3rem] bg-[#a3be8c] border border-[#8fa773] hover:bg-[#8fa773] group transition duration-200"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard", {
                            style: { background: "#1e1e2e", color: "#a6e3a1" },
                          });
                        }}
                      >
                        <Copy
                          className="text-gray-800 group-hover:text-gray-900"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex text-gray-400">
                      <Calendar size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-[#bf616a]">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
