/**
 * Vector SVG icons for lab materials - displayed when dropped in simulator zone.
 * Uses keyword matching for material names.
 */

export const LabIcon = ({ name, size = 64, className = "" }) => {
  const normalized = (name || "").toLowerCase();

  const EvaporatingDish = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <ellipse cx="24" cy="36" rx="18" ry="4" fill="#e8e8e8" stroke="#888" strokeWidth="1.5" />
      <path
        d="M6 36 Q6 18 24 8 Q42 18 42 36"
        fill="none"
        stroke="#888"
        strokeWidth="2"
      />
      <path
        d="M8 35 Q8 20 24 10 Q40 20 40 35"
        fill="#f5f5f5"
        stroke="#aaa"
        strokeWidth="1"
      />
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
      <rect x="22" y="4" width="4" height="40" rx="2" fill="#cce5ff" stroke="#88c" strokeWidth="1" />
    </svg>
  );

  const TestTube = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M20 4 L28 4 L32 44 L16 44 Z"
        fill="#cce5ff"
        stroke="#88c"
        strokeWidth="1.5"
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
      <path
        d="M24 4 L24 28 L16 40 L32 40 L24 28"
        fill="#cce5ff"
        stroke="#88c"
        strokeWidth="1.5"
      />
    </svg>
  );

  const Burette = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="20" y="4" width="8" height="36" rx="2" fill="#cce5ff" stroke="#88c" strokeWidth="1" />
      <rect x="22" y="38" width="4" height="6" fill="#cce5ff" stroke="#88c" strokeWidth="1" />
    </svg>
  );

  const Pipette = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M24 4 L24 32 L20 44 L28 44 L24 32"
        fill="#cce5ff"
        stroke="#88c"
        strokeWidth="1.5"
      />
    </svg>
  );

  const ConicalFlask = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M24 4 L32 4 L40 40 L8 40 L16 4 Z"
        fill="#cce5ff"
        stroke="#88c"
        strokeWidth="1.5"
      />
    </svg>
  );

  const Microscope = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <circle cx="24" cy="32" r="8" fill="#444" />
      <rect x="22" y="16" width="4" height="16" fill="#555" />
      <circle cx="24" cy="12" r="6" fill="#888" stroke="#666" strokeWidth="1" />
      <rect x="8" y="24" width="16" height="4" fill="#555" />
    </svg>
  );

  const GlassSlide = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="18" width="32" height="12" rx="2" fill="#e8f4ff" stroke="#88c" strokeWidth="1.5" />
    </svg>
  );

  const Lens = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <ellipse cx="24" cy="24" rx="18" ry="12" fill="none" stroke="#666" strokeWidth="2" />
      <ellipse cx="24" cy="24" rx="14" ry="9" fill="#e8e8e8" opacity="0.5" />
    </svg>
  );

  const Powder = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <circle cx="14" cy="32" r="4" fill="#d4a854" />
      <circle cx="24" cy="36" r="5" fill="#c49a4a" />
      <circle cx="34" cy="32" r="4" fill="#d4a854" />
      <circle cx="20" cy="28" r="3" fill="#e4b860" />
      <circle cx="30" cy="28" r="3" fill="#c49a4a" />
    </svg>
  );

  const PaperStrip = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="12" y="8" width="24" height="32" rx="2" fill="#fff5f5" stroke="#c66" strokeWidth="1.5" />
    </svg>
  );

  const Bottle = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path
        d="M18 8 L20 8 L22 20 L26 20 L28 8 L30 8 L28 44 L20 44 Z"
        fill="#cce5ff"
        stroke="#88c"
        strokeWidth="1.5"
      />
    </svg>
  );

  const Resistor = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="18" width="32" height="12" rx="2" fill="#c49a4a" stroke="#8b7355" strokeWidth="1" />
      <line x1="0" y1="24" x2="8" y2="24" stroke="#333" strokeWidth="2" />
      <line x1="40" y1="24" x2="48" y2="24" stroke="#333" strokeWidth="2" />
    </svg>
  );

  const Straw = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <line x1="8" y1="40" x2="40" y2="8" stroke="#88c" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );

  const Cloth = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="12" width="32" height="28" rx="2" fill="#8b7355" stroke="#6b5344" strokeWidth="1" />
    </svg>
  );

  const Bread = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <ellipse cx="24" cy="24" rx="18" ry="14" fill="#d4a574" stroke="#b8863c" strokeWidth="1.5" />
    </svg>
  );

  const Newspaper = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="6" y="6" width="36" height="36" rx="2" fill="#fff" stroke="#888" strokeWidth="1.5" />
      <line x1="24" y1="6" x2="24" y2="42" stroke="#ccc" strokeWidth="0.5" />
    </svg>
  );

  const Water = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <path d="M24 8 Q8 28 24 42 Q40 28 24 8" fill="#4fc3f7" opacity="0.7" stroke="#29b6f6" strokeWidth="1" />
    </svg>
  );

  const Tile = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="8" y="14" width="32" height="20" rx="2" fill="#f5f5f5" stroke="#888" strokeWidth="1.5" />
    </svg>
  );

  const Screen = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="6" y="8" width="36" height="28" rx="2" fill="#333" stroke="#555" strokeWidth="1" />
      <rect x="10" y="12" width="28" height="20" fill="#e8f5e9" />
    </svg>
  );

  const GenericLab = () => (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
      <rect x="16" y="12" width="16" height="24" rx="4" fill="#e8e8e8" stroke="#888" strokeWidth="2" />
    </svg>
  );

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

  return <GenericLab />;
};
