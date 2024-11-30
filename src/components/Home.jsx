import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); 
  const pasteId = searchParams.get("pasteId"); 
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-6 items-start">
        {/* Title and Buttons */}
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } border rounded-md p-2 bg-[#1e293b] text-white text-lg focus:ring-2 focus:ring-[#3b82f6]`}
          />
          <button
           disabled={!title}
            className="text-white bg-[#3b82f6] hover:bg-[#2563eb] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={createPaste}
          >
            {pasteId ? "Update" : "Create"}
          </button>

          {pasteId && (
            <button
              className="text-white bg-[#ef4444] hover:bg-[#dc2626] focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-x-2"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
              Reset
            </button>
          )}
        </div>

        {/* Text Area Section */}
        <div className="w-full flex flex-col items-start relative rounded-md bg-[#1e293b] border border-[#334155]">
          {/* Toolbar */}
          <div className="w-full rounded-t flex items-center justify-between px-4 py-2 border-b border-[#334155]">
            <div className="w-full flex gap-x-[6px] items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-[#ef4444]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[#facc15]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[#22c55e]" />
            </div>
            <button
              className="text-gray-400 hover:text-[#3b82f6] transition-all"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", {
                  position: "top-right",
                });
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here..."
            className="w-full p-3 bg-[#0f172a] text-white text-lg focus-visible:ring-0 focus:outline-none placeholder-gray-500"
            style={{
              caretColor: "#3b82f6",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
