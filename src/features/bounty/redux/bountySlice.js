import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basics: {
    title: "",
    description: "",
    projectTitle: "",
    type: "",
    dominant_core: "",
    mode: "digital", // "digital" | "physical"
    location: "",
  },
  rewards: {
    reward: {
      currency: "USD",
      amount: "",
      winners: "",
    },
    timeline: {
      expiration_date: "",
      estimated_completion: {
        days: "",
        hours: "",
        minutes: "",
      },
    },
    hasImpactCertificate: false,
    impactBriefMessage: "",
    sdgs: [],
    maxImpactPoints: "",
    failureThreshold: "",
  },
  backer: {
    has_backer: false,
    name: "",
    logo: null, // can be URL string or File
    message: "",
  },
  meta: {
    terms_accepted: false,
    stepValidity: {
      basics: false,
      rewards: false,
      backer: false,
    },
    isSubmitting: false,
    finalPayload: null,
  },
};

const bountySlice = createSlice({
  name: "bounty",
  initialState,
  reducers: {
    updateBasics(state, action) {
      state.basics = { ...state.basics, ...action.payload };
    },
    updateRewards(state, action) {
      state.rewards = {
        ...state.rewards,
        ...action.payload,
        reward: {
          ...state.rewards.reward,
          ...(action.payload.reward || {}),
        },
        timeline: {
          ...state.rewards.timeline,
          ...(action.payload.timeline || {}),
          estimated_completion: {
            ...state.rewards.timeline.estimated_completion,
            ...(action.payload.timeline?.estimated_completion || {}),
          },
        },
      };
    },
    updateBacker(state, action) {
      state.backer = { ...state.backer, ...action.payload };
    },
    setTermsAccepted(state, action) {
      state.meta.terms_accepted = action.payload;
    },
    setStepValidity(state, action) {
      const { step, isValid } = action.payload;
      state.meta.stepValidity[step] = isValid;
    },
    setSubmitting(state, action) {
      state.meta.isSubmitting = action.payload;
    },
    setFinalPayload(state, action) {
      state.meta.finalPayload = action.payload;
    },
    resetBountyState() {
      return initialState;
    },
  },
});

export const {
  updateBasics,
  updateRewards,
  updateBacker,
  setTermsAccepted,
  setStepValidity,
  setSubmitting,
  setFinalPayload,
  resetBountyState,
} = bountySlice.actions;

export default bountySlice.reducer;
