export function mapPayload(state) {
  const payload = {
    title: state.basics.title,
    description: state.basics.description,
    projectTitle: state.basics.projectTitle,
    type: state.basics.type,
    dominant_core: state.basics.dominant_core,
    mode: state.basics.mode,
    reward: {
      currency: state.rewards.reward.currency,
      amount: Number(state.rewards.reward.amount),
      winners: Number(state.rewards.reward.winners),
    },
    timeline: {
      expiration_date: new Date(state.rewards.timeline.expiration_date)
        .toISOString(),
      estimated_completion: {
        days: Number(state.rewards.timeline.estimated_completion.days),
        hours: Number(state.rewards.timeline.estimated_completion.hours),
        minutes: Number(state.rewards.timeline.estimated_completion.minutes),
      },
    },
    hasImpactCertificate: state.rewards.hasImpactCertificate,
    has_backer: state.backer.has_backer,
    terms_accepted: state.meta.terms_accepted,
  };

  if (state.basics.mode === "physical") {
    payload.location = state.basics.location;
  }

  if (state.rewards.hasImpactCertificate) {
    payload.impactBriefMessage = state.rewards.impactBriefMessage;
  }

  if (state.backer.has_backer) {
    payload.backer = {
      name: state.backer.name,
      logo: state.backer.logo instanceof File
        ? state.backer.logo.name
        : state.backer.logo,
      message: state.backer.message,
    };
  }

  return payload;
}
