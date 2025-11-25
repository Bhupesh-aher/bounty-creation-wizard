import { useSelector } from "react-redux";

export default function PreviewPanel() {
  const basics = useSelector((state) => state.bounty.basics);
  const rewards = useSelector((state) => state.bounty.rewards);
  const backer = useSelector((state) => state.bounty.backer);

  const perWinner =
    rewards.reward.amount && rewards.reward.winners
      ? Number(rewards.reward.amount) / Number(rewards.reward.winners || 1)
      : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-full flex flex-col">
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Impact Miner Preview
      </h2>

      <div className="border rounded-2xl p-3 flex-1 flex flex-col bg-gray-50">
        {/* Fake phone frame */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col p-4">
          <p className="text-[10px] font-semibold text-gray-500 mb-1 uppercase">
            Bounty Preview
          </p>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {basics.title || "Your bounty title will appear here"}
          </h3>

          {/* Project */}
          {basics.projectTitle && (
            <p className="text-[11px] text-gray-500 mt-0.5 truncate">
              Project: {basics.projectTitle}
            </p>
          )}

          {/* Description */}
          <p className="text-[11px] text-gray-600 mt-2 line-clamp-3">
            {basics.description ||
              "This is where your bounty description will be visible to hunters."}
          </p>

          {/* Type + Core */}
          <div className="flex flex-wrap gap-1 mt-3">
            {basics.type && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {basics.type}
              </span>
            )}
            {basics.dominant_core && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {basics.dominant_core}
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              {basics.mode === "physical" ? "Physical" : "Digital"}
            </span>
          </div>

          {/* Reward summary */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <p className="text-[11px] font-semibold text-gray-700">
              Reward
            </p>
            {rewards.reward.amount ? (
              <p className="text-[11px] text-gray-800">
                {rewards.reward.currency} {rewards.reward.amount} ·{" "}
                {rewards.reward.winners || 1} winner
                {Number(rewards.reward.winners || 1) > 1 ? "s" : ""}
              </p>
            ) : (
              <p className="text-[11px] text-gray-400">
                Set the reward amount in the Rewards step.
              </p>
            )}
            {perWinner && (
              <p className="text-[10px] text-gray-500">
                ≈ {rewards.reward.currency} {perWinner.toFixed(2)} per
                winner
              </p>
            )}
          </div>

          {/* Backer */}
          {backer.has_backer && (
            <div className="mt-3 border-t border-gray-100 pt-3">
              <p className="text-[11px] font-semibold text-gray-700">
                Sponsored by
              </p>
              <p className="text-[11px] text-gray-800 truncate">
                {backer.name || "Backer name"}
              </p>
              {backer.message && (
                <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">
                  {backer.message}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
