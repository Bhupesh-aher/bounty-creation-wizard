export function validateRewards(rewards) {
  const errors = {};

  if (!rewards.reward.currency) {
    errors.currency = "Currency is required";
  }

  if (!rewards.reward.amount || Number(rewards.reward.amount) <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (!rewards.reward.winners || Number(rewards.reward.winners) < 1) {
    errors.winners = "Number of winners must be at least 1";
  }

  if (!rewards.timeline.expiration_date) {
    errors.expiration_date = "Expiration date is required";
  }

  // 👉 Estimated completion is now OPTIONAL.
  // If you want to keep a soft rule, you can just warn, but we won't block the step.
  const { days, hours, minutes } = rewards.timeline.estimated_completion;
  const totalTime = Number(days) + Number(hours) + Number(minutes);
  if (totalTime <= 0) {
    // Optional: you can still set a warning, but it won't affect isValid.
    // errors.estimated = "Consider adding an estimated completion time";
  }

  if (rewards.hasImpactCertificate && !rewards.impactBriefMessage.trim()) {
    errors.impactBriefMessage = "Impact brief is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
