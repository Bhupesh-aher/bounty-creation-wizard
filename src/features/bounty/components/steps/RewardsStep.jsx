import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRewards, setStepValidity } from "../../redux/bountySlice";
import { validateRewards } from "../../validation/rewardsValidation";
import { SDG_OPTIONS } from "../../utils/sdgs";

import TextInput from "../../../../components/ui/TextInput";
import NumberInput from "../../../../components/ui/NumberInput";
import DateInput from "../../../../components/ui/DateInput";
import Toggle from "../../../../components/ui/Toggle";
import MultiSelectCheckbox from "../../../../components/ui/MultiSelectCheckbox";

export default function RewardsStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rewards = useSelector((state) => state.bounty.rewards);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // validation on every change
  useEffect(() => {
    const { errors: e, isValid } = validateRewards(rewards);
    setErrors(e);
    setIsValid(isValid);
    dispatch(setStepValidity({ step: "rewards", isValid }));
  }, [rewards, dispatch]);

  const handleReward = (field) => (value) => {
    dispatch(updateRewards({ reward: { [field]: value } }));
  };

  const handleTimeline = (field) => (value) => {
    dispatch(updateRewards({ timeline: { [field]: value } }));
  };

  const handleEstimate = (field) => (value) => {
    dispatch(
      updateRewards({
        timeline: {
          estimated_completion: { [field]: value },
        },
      })
    );
  };

  const toggleCertificate = (val) => {
    dispatch(updateRewards({ hasImpactCertificate: val }));
  };

  const updateSDGs = (list) => {
    dispatch(updateRewards({ sdgs: list }));
  };

  const handleBack = () => navigate("/add-bounty/basics");

  const handleNext = () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    navigate("/add-bounty/backer");
  };

  const perWinner =
    rewards.reward.amount && rewards.reward.winners
      ? Number(rewards.reward.amount) / Number(rewards.reward.winners || 1)
      : null;

  return (
    <>
      <h1 className="text-xl font-semibold mb-2">Bounty Reward</h1>
      <p className="text-sm text-gray-500 mb-6">
        Choose bounty reward token and set amount.
      </p>

      <div className="space-y-8">
        {/* Budget section */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            What is your budget for this bounty? *
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TextInput
              label="Currency"
              value={rewards.reward.currency}
              onChange={handleReward("currency")}
              placeholder="USD"
              error={showErrors ? errors.currency : ""}
            />
            <NumberInput
              label="Total Reward Amount"
              required
              value={rewards.reward.amount}
              onChange={handleReward("amount")}
              error={showErrors ? errors.amount : ""}
            />
            <NumberInput
              label="Number of Winners"
              required
              value={rewards.reward.winners}
              onChange={handleReward("winners")}
              error={showErrors ? errors.winners : ""}
            />
          </div>

          {/* Each winner amount */}
          <div className="mt-4">
            <TextInput
              label="Each winner will be awarded"
              value={
                perWinner && rewards.reward.currency
                  ? `${rewards.reward.currency} ${perWinner.toFixed(2)}`
                  : ""
              }
              onChange={() => {}}
              placeholder="Auto calculated"
              helperText="Calculated as total reward ÷ number of winners"
              disabled
            />
          </div>
        </div>

        {/* Max impact points + failure threshold */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            label="Maximum Impact Points allocated"
            value={rewards.maxImpactPoints}
            onChange={(value) =>
              dispatch(updateRewards({ maxImpactPoints: value }))
            }
            placeholder="Optional"
          />
          <NumberInput
            label="Set Failure Threshold (%)"
            value={rewards.failureThreshold}
            onChange={(value) =>
              dispatch(updateRewards({ failureThreshold: value }))
            }
            placeholder="Optional"
          />
        </div>

        {/* Expiration & estimated completion */}
        <DateInput
          label="Expiration Date"
          value={rewards.timeline.expiration_date}
          onChange={handleTimeline("expiration_date")}
          required
          error={showErrors ? errors.expiration_date : ""}
        />

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Estimated Completion Time *
          </p>
          <div className="grid grid-cols-3 gap-3">
            <NumberInput
              placeholder="Days"
              value={rewards.timeline.estimated_completion.days}
              onChange={handleEstimate("days")}
            />
            <NumberInput
              placeholder="Hours"
              value={rewards.timeline.estimated_completion.hours}
              onChange={handleEstimate("hours")}
            />
            <NumberInput
              placeholder="Minutes"
              value={rewards.timeline.estimated_completion.minutes}
              onChange={handleEstimate("minutes")}
            />
          </div>
          {showErrors && errors.estimated && (
            <p className="text-xs text-red-500 mt-1">{errors.estimated}</p>
          )}
        </div>

        {/* Impact Certificate */}
        <div>
          <Toggle
            label="Add Impact Certificate"
            checked={rewards.hasImpactCertificate}
            onChange={toggleCertificate}
            helperText="If enabled, hunters receive an impact certificate along with rewards."
          />

          {rewards.hasImpactCertificate && (
            <TextInput
              label="Impact Certificate Brief"
              value={rewards.impactBriefMessage}
              onChange={(e) =>
                dispatch(
                  updateRewards({ impactBriefMessage: e.target.value })
                )
              }
              error={showErrors ? errors.impactBriefMessage : ""}
              required
            />
          )}
        </div>

        {/* SDGs */}
        <MultiSelectCheckbox
          label="Choose up to 4 secondary SDGs (optional)"
          options={SDG_OPTIONS}
          values={rewards.sdgs}
          onChange={updateSDGs}
          max={4}
        />
      </div>

      {/* Actions */}
      <div className="mt-12 flex justify-between items-center">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#1677ff] text-white hover:bg-[#125fd0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1677ff]"
        >
          Next →
        </button>
      </div>
    </>
  );
}
