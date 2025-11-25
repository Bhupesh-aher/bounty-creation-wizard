import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBasics, setStepValidity } from "../../redux/bountySlice";
import { validateBasics } from "../../validation/basicsValidation";

import TextInput from "../../../../components/ui/TextInput";
import TextArea from "../../../../components/ui/TextArea";
import Select from "../../../../components/ui/Select";
import RadioGroup from "../../../../components/ui/RadioGroup";

const BOUNTY_TYPES = [
  { value: "Content", label: "Content" },
  { value: "Design", label: "Design" },
  { value: "Development", label: "Development" },
  { value: "Marketing", label: "Marketing" },
  { value: "Other", label: "Other" },
];

const IMPACT_CORES = [
  { value: "Water", label: "Water" },
  { value: "Earth", label: "Earth" },
  { value: "Social", label: "Social" },
  { value: "Energy", label: "Energy" },
];

export default function BasicsStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basics = useSelector((state) => state.bounty.basics);

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false); // <- controls when to show red

  // run validation whenever data changes
  useEffect(() => {
    const { errors: e, isValid } = validateBasics(basics);
    setErrors(e);
    setIsValid(isValid);
    dispatch(setStepValidity({ step: "basics", isValid }));
  }, [basics, dispatch]);

  const handleChange = (field) => (eOrValue) => {
    const value =
      typeof eOrValue === "string" ? eOrValue : eOrValue.target.value;

    dispatch(updateBasics({ [field]: value }));
  };

  const handleModeChange = (modeValue) => {
    dispatch(updateBasics({ mode: modeValue }));
  };

  const handleNext = () => {
    // on first invalid click, show all relevant errors
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    navigate("/add-bounty/rewards");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-xl font-semibold mb-6">Bounty Brief</h1>

      <div className="space-y-6">
        {/* Title */}
        <TextInput
          label="Bounty Title"
          name="title"
          required
          value={basics.title}
          onChange={handleChange("title")}
          placeholder="Type your bounty's title"
          error={showErrors ? errors.title : ""}
          helperText={`${basics.title.length}/40 characters`}
        />

        {/* Description */}
        <TextArea
          label="Bounty Description"
          name="description"
          required
          value={basics.description}
          onChange={handleChange("description")}
          placeholder="Briefly describe what the bounty does"
          rows={4}
          error={showErrors ? errors.description : ""}
          helperText={`${basics.description.length}/1000 characters`}
        />

        {/* Project */}
        <TextInput
          label="Project"
          name="projectTitle"
          value={basics.projectTitle}
          onChange={handleChange("projectTitle")}
          placeholder="Choose a project to link the bounty"
          helperText="Optional: link this bounty to a project"
        />

        {/* Type + Impact core */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Bounty Type"
            name="type"
            required
            value={basics.type}
            onChange={handleChange("type")}
            options={BOUNTY_TYPES}
            placeholder="Choose category"
            error={showErrors ? errors.type : ""}
          />
          <Select
            label="Dominant Impact Core"
            name="dominant_core"
            required
            value={basics.dominant_core}
            onChange={handleChange("dominant_core")}
            options={IMPACT_CORES}
            placeholder="Choose core"
            error={showErrors ? errors.dominant_core : ""}
          />
        </div>

        {/* Mode */}
        <RadioGroup
          label="Bounty Mode"
          name="mode"
          required
          value={basics.mode}
          onChange={handleModeChange}
          options={[
            { value: "digital", label: "Digital Bounty" },
            { value: "physical", label: "Physical Bounty" },
          ]}
          error={showErrors ? errors.mode : ""}
        />

        {/* Location (if physical) */}
        {basics.mode === "physical" && (
          <TextInput
            label="Enter Location"
            name="location"
            required
            value={basics.location}
            onChange={handleChange("location")}
            placeholder="City/Town where the bounty is live"
            error={showErrors ? errors.location : ""}
          />
        )}
      </div>

      {/* Actions */}
      <div className="mt-12 flex justify-between items-center">
        <button
          type="button"
          disabled
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium border border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#1677ff] text-white hover:bg-[#125fd0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1677ff]"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
