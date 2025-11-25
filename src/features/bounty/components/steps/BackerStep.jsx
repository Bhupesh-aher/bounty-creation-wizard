import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateBacker,
  setTermsAccepted,
  setStepValidity,
  setSubmitting,
  setFinalPayload,
} from "../../redux/bountySlice";
import { validateBacker } from "../../validation/backerValidation";

import Toggle from "../../../../components/ui/Toggle";
import TextInput from "../../../../components/ui/TextInput";
import Checkbox from "../../../../components/ui/Checkbox";
import { mapPayload } from "../../utils/payloadMapper";

export default function BackerStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backer = useSelector((state) => state.bounty.backer);
  const termsAccepted = useSelector(
    (state) => state.bounty.meta.terms_accepted
  );
  const bountyState = useSelector((state) => state.bounty);

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // validation on change
  useEffect(() => {
    const { errors: e, isValid } = validateBacker(backer, termsAccepted);
    setErrors(e);
    setIsValid(isValid);
    dispatch(setStepValidity({ step: "backer", isValid }));
  }, [backer, termsAccepted, dispatch]);

  const handleToggle = (val) => {
    dispatch(updateBacker({ has_backer: val }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    dispatch(updateBacker({ logo: file }));
  };

  const handleSubmit = () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }

    dispatch(setSubmitting(true));

    const finalPayload = mapPayload(bountyState);

    setTimeout(() => {
      dispatch(setSubmitting(false));
      dispatch(setFinalPayload(finalPayload));
      navigate("/add-bounty/confirmation");
    }, 1500);
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-6">Backer Information</h1>

      <div className="space-y-8">
        {/* Toggle */}
        <Toggle
          label="Does the bounty have a sponsor or backer?"
          checked={backer.has_backer}
          onChange={handleToggle}
        />

        {/* Backer fields if toggle ON */}
        {backer.has_backer && (
          <div className="space-y-6">
            <TextInput
              label="Backer Name"
              value={backer.name}
              onChange={(e) =>
                dispatch(updateBacker({ name: e.target.value }))
              }
              required
              error={showErrors ? errors.name : ""}
            />

            {/* Logo Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Backer Logo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mt-1 text-sm"
              />
              {backer.logo && (
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {backer.logo.name || backer.logo}
                </p>
              )}
              {showErrors && errors.logo && (
                <p className="text-xs text-red-500 mt-1">{errors.logo}</p>
              )}
            </div>

            <TextInput
              label="Enter sponsor message"
              value={backer.message}
              onChange={(e) =>
                dispatch(updateBacker({ message: e.target.value }))
              }
              placeholder="Optional"
              maxLength={80}
              helperText={`${backer.message.length}/80 characters`}
            />
          </div>
        )}

        {/* Terms */}
        <Checkbox
          label="I agree to the Terms & Conditions"
          checked={termsAccepted}
          onChange={(val) => dispatch(setTermsAccepted(val))}
        />
        {showErrors && errors.terms && (
          <p className="text-xs text-red-500 -mt-5">{errors.terms}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-12 flex justify-between items-center">
        <button
          type="button"
          onClick={() => navigate("/add-bounty/rewards")}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium bg-[#1677ff] text-white hover:bg-[#125fd0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1677ff]"
        >
          Publish Bounty
        </button>
      </div>
    </>
  );
}
