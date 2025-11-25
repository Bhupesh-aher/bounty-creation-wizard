import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ResultScreen() {
  const payload = useSelector((state) => state.bounty.meta.finalPayload);
  const navigate = useNavigate();

  if (!payload) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            No payload found. Please create a bounty first.
          </p>
          <button
            type="button"
            onClick={() => navigate("/add-bounty/basics")}
            className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#1677ff] text-white hover:bg-[#125fd0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1677ff]"
          >
            Go to Add Bounty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Bounty JSON Payload</h1>
          <button
            type="button"
            onClick={() => navigate("/add-bounty/basics")}
            className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Create another bounty
          </button>
        </div>

        <pre className="bg-gray-900 text-green-200 text-xs rounded-xl p-4 overflow-auto max-h-[60vh]">
{JSON.stringify(payload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
