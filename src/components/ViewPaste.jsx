import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  console.log(id);

  const pastes = useSelector((state) => state.paste.pastes);

  // Filter pastes based on ID
  const paste = pastes.filter((paste) => paste._id === id)[0];

  console.log("Paste->", paste);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 text-gray-100">
      <div className="flex flex-col gap-y-5 items-start">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={paste?.title || ""}
          disabled
          className="w-full bg-[#1e1e2e] text-gray-200 border border-gray-600 rounded-lg p-3 shadow-md focus:outline-none"
        />

        {/* Content Area */}
        <div
          className="w-full flex flex-col items-start bg-gradient-to-b from-[#181824] to-[#111111] border border-gray-700 rounded-lg shadow-lg"
        >
          {/* Header with Buttons */}
          <div
            className="w-full rounded-t flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gradient-to-r from-[#23232f] to-[#1d1d26]"
          >
            {/* Traffic Light Dots */}
            <div className="flex gap-x-2 items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-red-500 shadow-inner" />
              <div className="w-[13px] h-[13px] rounded-full bg-yellow-400 shadow-inner" />
              <div className="w-[13px] h-[13px] rounded-full bg-green-500 shadow-inner" />
            </div>

            {/* Copy Button */}
            <button
              className="flex justify-center items-center bg-[#2c2c3e] border border-[#3a3a4f] p-2 rounded-lg hover:bg-[#3b3b52] hover:shadow-md transition duration-200 group"
              onClick={() => {
                navigator.clipboard.writeText(paste?.content || "");
                toast.success("Copied to Clipboard", {
                  style: { background: "#1e1e2e", color: "#a6e3a1" },
                });
              }}
            >
              <Copy className="text-[#a6e3a1] group-hover:text-[#b9fbc0]" size={20} />
            </button>
          </div>

          {/* Content TextArea */}
          <textarea
            value={paste?.content || ""}
            disabled
            placeholder="Write Your Content Here..."
            className="w-full p-4 text-gray-300 bg-transparent resize-none focus:outline-none rounded-b-lg"
            style={{
              caretColor: "#a6e3a1",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
