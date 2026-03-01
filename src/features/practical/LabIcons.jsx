/**
 * Vector SVG icons for lab materials - displayed when dropped in simulator zone.
 * Uses keyword matching for material names.
 */

export const LabIcon = ({ name, size = 64, className = "" }) => {
  const normalized = (name || "").toLowerCase();

  const EvaporatingDish = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M6 36 Q6 18 24 8 Q42 18 42 36 Z"
        fill="none"
        stroke="#555"
        strokeWidth="2"
      />
      <path d="M8 36 Q8 22 24 12 Q40 22 40 36" fill="none" stroke="#888" strokeWidth="1.5" />
    </svg>
  );

  const TripodStand = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <circle cx="24" cy="12" r="6" fill="#666" stroke="#444" strokeWidth="1" />
      <line x1="24" y1="18" x2="10" y2="46" stroke="#666" strokeWidth="2" />
      <line x1="24" y1="18" x2="38" y2="46" stroke="#666" strokeWidth="2" />
      <line x1="24" y1="18" x2="24" y2="46" stroke="#666" strokeWidth="2" />
    </svg>
  );

  const HorseshoeMagnet = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M12 8 L12 20 Q24 28 36 20 L36 8 L28 8 L28 16 Q24 20 20 16 L20 8 Z"
        fill="#333"
        stroke="#222"
        strokeWidth="1"
      />
    </svg>
  );

  const BunsenBurner = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="18" y="28" width="12" height="16" rx="2" fill="#666" stroke="#444" />
      <ellipse cx="24" cy="28" rx="6" ry="2" fill="#888" />
      <path d="M20 28 L20 18 L28 18 L28 28" fill="none" stroke="#888" strokeWidth="2" />
      <path d="M22 14 Q24 10 26 14" fill="none" stroke="#f90" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="24" cy="12" rx="4" ry="2" fill="#fc0" opacity="0.9" />
    </svg>
  );

  const GlassRod = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <line x1="24" y1="4" x2="24" y2="44" stroke="#4a90e2" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  const TestTube = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M20 4 L28 4 L32 44 L16 44 Z"
        fill="none"
        stroke="#4a90e2"
        strokeWidth="2"
      />
    </svg>
  );

  const TestTubeStand = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="18" y="38" width="12" height="6" fill="#666" />
      <line x1="24" y1="38" x2="24" y2="8" stroke="#666" strokeWidth="3" />
      <circle cx="24" cy="12" r="4" fill="#555" />
    </svg>
  );

  const Dropper = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M24 4 L24 28 L16 40 L32 40 Z" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const Burette = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M20 4 L28 4 L28 40 L24 46 L20 40 Z" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const Pipette = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M24 4 L24 32 L20 44 L28 44 Z" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const ConicalFlask = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M24 4 L32 4 L40 40 L8 40 L16 4 Z" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const Microscope = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <circle cx="24" cy="32" r="8" fill="none" stroke="#555" strokeWidth="2" />
      <line x1="24" y1="16" x2="24" y2="24" stroke="#555" strokeWidth="2" />
      <circle cx="24" cy="12" r="5" fill="none" stroke="#666" strokeWidth="2" />
      <rect x="8" y="22" width="16" height="4" fill="none" stroke="#555" strokeWidth="2" />
    </svg>
  );

  const GlassSlide = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="18" width="32" height="12" rx="1" fill="none" stroke="#4a90e2" strokeWidth="2" />
    </svg>
  );

  const Lens = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <ellipse cx="24" cy="24" rx="18" ry="12" fill="none" stroke="#555" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="14" ry="9" fill="none" stroke="#888" strokeWidth="1" strokeDasharray="4 2" />
    </svg>
  );

  const Powder = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <circle cx="14" cy="32" r="4" fill="none" stroke="#c49a4a" strokeWidth="1.5" />
      <circle cx="24" cy="36" r="5" fill="none" stroke="#c49a4a" strokeWidth="1.5" />
      <circle cx="34" cy="32" r="4" fill="none" stroke="#c49a4a" strokeWidth="1.5" />
      <circle cx="20" cy="28" r="3" fill="none" stroke="#d4a854" strokeWidth="1.5" />
      <circle cx="30" cy="28" r="3" fill="none" stroke="#d4a854" strokeWidth="1.5" />
    </svg>
  );

  const Forceps = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M16 8 L12 28 L20 42" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 8 L36 28 L28 42" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const BlottingPaper = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="10" y="10" width="28" height="32" rx="1" fill="none" stroke="#8b7355" strokeWidth="2" />
    </svg>
  );

  const Container = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="10" y="12" width="28" height="30" rx="1" fill="none" stroke="#888" strokeWidth="2" />
    </svg>
  );

  const PaperStrip = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="12" y="8" width="24" height="32" rx="1" fill="none" stroke="#c66" strokeWidth="2" />
    </svg>
  );

  const Bottle = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M18 8 L20 8 L22 20 L26 20 L28 8 L30 8 L28 44 L20 44 Z" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const Resistor = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M8 24 L16 24 L20 18 L24 30 L28 18 L32 24 L40 24" fill="none" stroke="#8b7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Straw = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <line x1="8" y1="40" x2="40" y2="8" stroke="#88c" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );

  const Cloth = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="12" width="32" height="28" rx="1" fill="none" stroke="#6b5344" strokeWidth="2" />
    </svg>
  );

  const Bread = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="16" width="32" height="20" rx="3" fill="none" stroke="#b8863c" strokeWidth="2" />
      <path d="M12 20 Q24 16 36 20" fill="none" stroke="#b8863c" strokeWidth="1" opacity="0.7" />
    </svg>
  );

  const Newspaper = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="6" y="6" width="36" height="36" rx="1" fill="none" stroke="#555" strokeWidth="2" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="#888" strokeWidth="1" />
    </svg>
  );

  const Water = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M24 8 Q8 28 24 42 Q40 28 24 8" fill="none" stroke="#29b6f6" strokeWidth="2" />
    </svg>
  );

  const Tile = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="14" width="32" height="20" rx="1" fill="none" stroke="#888" strokeWidth="2" />
    </svg>
  );

  const Screen = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="6" y="8" width="36" height="28" rx="1" fill="none" stroke="#555" strokeWidth="2" />
      <rect x="10" y="12" width="28" height="20" fill="none" stroke="#888" strokeWidth="1" />
    </svg>
  );

  /* Lab beaker – vector outline style, not cookie-like */
  const LabBeaker = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M16 8 L18 8 L20 32 L28 32 L30 8 L32 8 L30 42 L18 42 Z"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );

  const GenericLab = () => <LabBeaker />;

  // Keyword-based icon selection
  if (normalized.includes("evaporat")) return <EvaporatingDish />;
  if (normalized.includes("tripod")) return <TripodStand />;
  if (normalized.includes("magnet")) return <HorseshoeMagnet />;
  if (normalized.includes("bunsen") || normalized.includes("burner")) return <BunsenBurner />;
  if (normalized.includes("glass rod")) return <GlassRod />;
  if (normalized.includes("test tube stand")) return <TestTubeStand />;
  if (normalized.includes("test tube")) return <TestTube />;
  if (normalized.includes("dropper")) return <Dropper />;
  if (normalized.includes("burette")) return <Burette />;
  if (normalized.includes("pipette")) return <Pipette />;
  if (normalized.includes("conical") || normalized.includes("flask")) return <ConicalFlask />;
  if (normalized.includes("microscope")) return <Microscope />;
  if (normalized.includes("coverslip")) return <GlassSlide />;
  if (normalized.includes("slide")) return <GlassSlide />;
  if (normalized.includes("lens") || normalized.includes("convex")) return <Lens />;
  if (normalized.includes("iron") || normalized.includes("sulphur") || normalized.includes("sulfur") || normalized.includes("powder")) return <Powder />;
  if (normalized.includes("litmus") || normalized.includes("ph paper")) return <PaperStrip />;
  if (normalized.includes("bottle")) return <Bottle />;
  if (normalized.includes("resistor")) return <Resistor />;
  if (normalized.includes("straw")) return <Straw />;
  if (normalized.includes("woollen") || normalized.includes("cloth")) return <Cloth />;
  if (normalized.includes("bread")) return <Bread />;
  if (normalized.includes("newspaper")) return <Newspaper />;
  if (normalized.includes("water")) return <Water />;
  if (normalized.includes("tile")) return <Tile />;
  if (normalized.includes("screen")) return <Screen />;
  if (normalized.includes("forceps")) return <Forceps />;
  if (normalized.includes("blotting")) return <BlottingPaper />;
  if (normalized.includes("container")) return <Container />;

  return <GenericLab />;
};
