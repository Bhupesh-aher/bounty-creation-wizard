export function validateBasics(basics) {
  const errors = {};

  if (!basics.title.trim()) {
    errors.title = "Title is required";
  } else if (basics.title.trim().length > 40) {
    errors.title = "Title must be at most 40 characters";
  }

  if (!basics.description.trim()) {
    errors.description = "Description is required";
  }

  if (!basics.type) {
    errors.type = "Bounty type is required";
  }

  if (!basics.dominant_core) {
    errors.dominant_core = "Dominant impact core is required";
  }

  if (!basics.mode) {
    errors.mode = "Bounty mode is required";
  }

  if (basics.mode === "physical" && !basics.location.trim()) {
    errors.location = "Location is required for physical bounties";
  }

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}
