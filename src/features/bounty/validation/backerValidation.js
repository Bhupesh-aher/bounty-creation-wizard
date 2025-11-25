export function validateBacker(backer, termsAccepted) {
  const errors = {};

  if (backer.has_backer) {
    if (!backer.name.trim()) {
      errors.name = "Backer name is required";
    }
    if (!backer.logo) {
      errors.logo = "Backer logo is required";
    }
  }

  if (!termsAccepted) {
    errors.terms = "You must accept terms & conditions";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
