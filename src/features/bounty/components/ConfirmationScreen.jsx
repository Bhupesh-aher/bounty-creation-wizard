import { useNavigate } from "react-router-dom";

export default function ConfirmationScreen() {
  const navigate = useNavigate();

  const handleViewResult = () => {
    navigate("/add-bounty/result");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-xl font-semibold mb-2">
          Bounty has been created successfully!
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          This simulates the confirmation screen. Next we&apos;ll show the full
          JSON payload.
        </p>

        <button
          type="button"
          onClick={handleViewResult}
          // 🔥 Hard-coded color so you SEE the button
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#1677ff] text-white hover:bg-[#125fd0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1677ff]"
        >
          View Result JSON
        </button>
      </div>
    </div>
  );
}
