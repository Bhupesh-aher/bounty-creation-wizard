import Button from "../../../components/ui/Button";


export default function FooterActions({ currentIdx, stepValidity, navigate }) {
  const isBasics = currentIdx === 0;
  const isRewards = currentIdx === 1;
  const isBacker = currentIdx === 2;

  // Navigation
  const goBack = () => {
    if (isRewards) navigate("/add-bounty/basics");
    if (isBacker) navigate("/add-bounty/rewards");
  };

  const goNext = () => {
    if (isBasics) navigate("/add-bounty/rewards");
    if (isRewards) navigate("/add-bounty/backer");
  };

  // Disable logic depends on validity
  const isDisabled =
    (isBasics && !stepValidity.basics) ||
    (isRewards && !stepValidity.rewards) ||
    (isBacker && !stepValidity.backer);

  return (
    <div className="flex justify-between gap-4 px-8 py-5 border-t bg-white">
      {/* Back */}
      <Button
        variant="secondary"
        onClick={goBack}
        disabled={isBasics}
      >
        ← Back
      </Button>

      {/* Next or Publish */}
      {!isBacker && (
        <Button
          variant="primary"
          onClick={goNext}
          disabled={isDisabled}
        >
          Next →
        </Button>
      )}

      {isBacker && (
        <Button
          variant="primary"
          onClick={() => window.publishBounty?.()}
          disabled={isDisabled}
        >
          Publish Bounty
        </Button>
      )}
    </div>
  );
}
