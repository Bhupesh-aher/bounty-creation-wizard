import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PreviewPanel from "../components/PreviewPanel";

const steps = [
  { key: "basics", label: "Basics", path: "/add-bounty/basics" },
  { key: "rewards", label: "Rewards", path: "/add-bounty/rewards" },
  { key: "backer", label: "Backer", path: "/add-bounty/backer" },
];

function getStepIndexByPath(pathname) {
  const step = steps.find((s) => pathname.includes(s.key));
  return step ? steps.indexOf(step) : 0;
}

export default function BountyLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stepValidity } = useSelector((state) => state.bounty.meta);

  const currentIdx = getStepIndexByPath(location.pathname);

  const handleSidebarClick = (step, index) => {
    if (index <= currentIdx) {
      navigate(step.path);
      return;
    }
    const allPrevValid = steps
      .slice(0, index)
      .every((s) => stepValidity[s.key]);
    if (allPrevValid) navigate(step.path);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-50 border-r border-gray-200 p-6">
        <h2 className="text-xs font-semibold text-gray-500 tracking-wide mb-4">
          BOUNTY STEPS
        </h2>
        <ol className="space-y-3">
          {steps.map((step, index) => {
            const isActive = index === currentIdx;
            const isCompleted = stepValidity[step.key];
            return (
              <li
                key={step.key}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSidebarClick(step, index)}
              >
                <div
                  className={[
                    "w-6 h-6 flex items-center justify-center rounded-full border text-xs",
                    isActive
                      ? "border-primary bg-primary text-white"
                      : isCompleted
                      ? "border-primary text-primary"
                      : "border-gray-300 text-gray-400",
                  ].join(" ")}
                >
                  {isCompleted && !isActive ? "✓" : index + 1}
                </div>
                <span
                  className={[
                    "text-sm",
                    isActive
                      ? "text-primary font-medium"
                      : "text-gray-600",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Main + Preview */}
      <main className="flex-1 flex py-10 px-6 gap-8">
        {/* Center content */}
        <div className="flex-1 max-w-3xl flex flex-col">

          {/* Top progress dots */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => {
                const isActive = index === currentIdx;
                const isCompleted = stepValidity[step.key];
                return (
                  <div
                    key={step.key}
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm",
                      isActive
                        ? "border-primary text-primary bg-white"
                        : isCompleted
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 text-gray-400 bg-white",
                    ].join(" ")}
                  >
                    {isCompleted && !isActive ? "✓" : index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card with Outlet */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-8">
            <Outlet />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block w-80">
          <PreviewPanel />
        </div>
      </main>
    </div>
  );
}
