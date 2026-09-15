import type { ReactNode } from "react";
import { AirVent, Car, Factory, Flame, Plane, Wind } from "lucide-react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Diagram({ id }: { id: string }) {
  switch (id) {
    case "applications":
      return <Applications />;
    case "system-boundary":
      return <SystemBoundary />;
    case "closed-piston":
      return <ClosedPiston />;
    case "isolated-adiabatic":
      return <IsolatedAdiabatic />;
    case "open-flow":
      return <OpenFlow />;
    case "system-choice":
      return <SystemChoice />;
    default:
      return null;
  }
}

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-cream text-ink shadow-[var(--shadow-paper)] ${className}`}>
      {children}
    </div>
  );
}

function Applications() {
  const items = [
    { icon: Wind, label: "Αντλίες" },
    { icon: Flame, label: "Θερμικοί κινητήρες" },
    { icon: AirVent, label: "Κομπρεσέρ" },
    { icon: Factory, label: "Εργοστάσια" },
    { icon: Car, label: "Οχήματα" },
    { icon: Plane, label: "Αεροσκάφη" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl bg-cream px-3 py-3 shadow-[var(--shadow-paper)]"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-copper/10 text-copper">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
          <span className="text-sm font-medium">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SystemBoundary() {
  return (
    <Frame>
      <svg viewBox="0 0 360 200" className="h-auto w-full" aria-hidden>
        <text x="24" y="28" className="fill-muted" fontSize="12" fontFamily="var(--font-sans)">
          Περιβάλλον
        </text>
        <path
          d="M70 58c22-22 70-28 110-18s78 8 108 28c28 18 42 52 18 78-22 24-70 32-118 28-48-4-96 4-128-22-30-24-22-68 10-94z"
          className="fill-copper/10 stroke-copper"
          strokeWidth="2"
          strokeDasharray="7 5"
        />
        <text x="148" y="112" className="fill-ink" fontSize="14" fontFamily="var(--font-serif)">
          Σύστημα
        </text>
        <text x="210" y="168" className="fill-copper" fontSize="11" fontFamily="var(--font-sans)">
          Όριο
        </text>
        <path d="M196 156l14-18" className="stroke-copper" strokeWidth="1.2" />
      </svg>
    </Frame>
  );
}

function ClosedPiston() {
  return (
    <Frame>
      <svg viewBox="0 0 360 200" className="h-auto w-full" aria-hidden>
        <rect x="108" y="36" width="144" height="128" rx="4" {...stroke} className="stroke-ink" />
        <rect x="118" y="92" width="124" height="14" className="fill-copper/80" />
        <rect x="172" y="92" width="16" height="86" className="fill-ink-soft" />
        <circle cx="180" cy="186" r="8" className="fill-ink" />
        <path
          d="M128 48h104v36H128z"
          className="fill-copper/10 stroke-copper"
          strokeWidth="1.4"
          strokeDasharray="4 3"
        />
        <text x="150" y="70" className="fill-copper" fontSize="11" fontFamily="var(--font-sans)">
          αέριο, m = σταθ.
        </text>
        <text x="118" y="28" className="fill-muted" fontSize="11" fontFamily="var(--font-sans)">
          κύλινδρος — έμβολο
        </text>
      </svg>
    </Frame>
  );
}

function IsolatedAdiabatic() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Frame>
        <svg viewBox="0 0 220 180" className="h-auto w-full" aria-hidden>
          <rect x="54" y="28" width="112" height="124" rx="56" className="fill-none stroke-ink" strokeWidth="10" />
          <rect x="70" y="44" width="80" height="92" rx="40" className="fill-copper/10 stroke-copper" strokeWidth="1.4" />
          <text x="78" y="96" className="fill-ink" fontSize="12" fontFamily="var(--font-serif)">
            θερμός
          </text>
          <text x="62" y="168" className="fill-muted" fontSize="11" fontFamily="var(--font-sans)">
            μονωμένο · E = σταθ.
          </text>
        </svg>
      </Frame>
      <Frame>
        <svg viewBox="0 0 220 180" className="h-auto w-full" aria-hidden>
          <rect x="48" y="36" width="124" height="100" rx="8" className="fill-none stroke-ink" strokeWidth="8" />
          <circle cx="110" cy="84" r="14" className="fill-copper/20 stroke-copper" strokeWidth="1.4" />
          <path d="M110 70v28M96 84h28" className="stroke-copper" strokeWidth="1.4" />
          <path d="M158 56h22v24h-12" className="stroke-ink" strokeWidth="1.6" />
          <text x="54" y="158" className="fill-muted" fontSize="11" fontFamily="var(--font-sans)">
            αδιαβατικό + έργο
          </text>
        </svg>
      </Frame>
    </div>
  );
}

function OpenFlow() {
  return (
    <div className="grid gap-2">
      <Frame>
        <svg viewBox="0 0 360 140" className="h-auto w-full" aria-hidden>
          <path
            d="M70 40c40-18 90-18 130 0s90 22 130 4"
            className="fill-none stroke-copper"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <path
            d="M70 108c40 14 90 18 130 0s90-20 130-4"
            className="fill-none stroke-copper"
            strokeWidth="1.6"
            strokeDasharray="6 4"
          />
          <path d="M36 74h70" className="stroke-ink" strokeWidth="2" />
          <polygon points="106,74 94,68 94,80" className="fill-ink" />
          <path d="M254 74h70" className="stroke-ink" strokeWidth="2" />
          <polygon points="324,74 312,68 312,80" className="fill-ink" />
          <text x="40" y="60" className="fill-muted" fontSize="11">
            μάζα
          </text>
          <text x="148" y="78" className="fill-ink" fontSize="13" fontFamily="var(--font-serif)">
            σύστημα
          </text>
          <text x="268" y="60" className="fill-muted" fontSize="11">
            μάζα
          </text>
        </svg>
      </Frame>
      <Frame>
        <svg viewBox="0 0 360 120" className="h-auto w-full" aria-hidden>
          <ellipse cx="150" cy="60" rx="70" ry="34" className="fill-copper/10 stroke-copper" strokeWidth="1.6" strokeDasharray="6 4" />
          <rect x="210" y="46" width="70" height="28" rx="4" className="fill-none stroke-ink" strokeWidth="1.6" />
          <path d="M280 60h40" className="stroke-ink" strokeWidth="2" />
          <polygon points="320,60 308,54 308,66" className="fill-ink" />
          <text x="122" y="64" className="fill-ink" fontSize="12" fontFamily="var(--font-serif)">
            φιάλη
          </text>
          <text x="286" y="48" className="fill-muted" fontSize="11">
            μάζα
          </text>
        </svg>
      </Frame>
    </div>
  );
}

function SystemChoice() {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {[
        { title: "Λάθος", note: "Το όριο κόβει την τριβή", ok: false },
        { title: "Σωστό", note: "Και οι δύο επιφάνειες μέσα", ok: true },
        { title: "Σωστό", note: "Και οι δύο επιφάνειες έξω", ok: true },
      ].map((card) => (
        <Frame key={card.note}>
          <div className="px-3 pt-3">
            <p className={`text-xs font-semibold uppercase tracking-wider ${card.ok ? "text-copper" : "text-wrong"}`}>
              {card.title}
            </p>
            <p className="mt-1 text-sm text-muted">{card.note}</p>
          </div>
          <svg viewBox="0 0 180 110" className="h-auto w-full" aria-hidden>
            <path
              d="M24 24c20-10 50-10 72 2s50 8 64 22c12 12 8 36-10 46-22 12-56 10-84 4s-50 2-62-14c-10-14-2-48 20-60z"
              className={card.ok ? "stroke-copper fill-copper/10" : "stroke-wrong fill-wrong/10"}
              strokeWidth="1.6"
              strokeDasharray="5 4"
            />
            {card.ok === false ? (
              <>
                <circle cx="78" cy="56" r="8" className="fill-ink/70" />
                <circle cx="108" cy="56" r="8" className="fill-none stroke-ink" strokeWidth="1.5" />
              </>
            ) : card.note.includes("μέσα") ? (
              <>
                <circle cx="78" cy="56" r="8" className="fill-ink/70" />
                <circle cx="102" cy="56" r="8" className="fill-ink/40" />
              </>
            ) : (
              <>
                <circle cx="78" cy="56" r="8" className="fill-none stroke-ink" strokeWidth="1.5" />
                <circle cx="150" cy="28" r="7" className="fill-ink/50" />
                <circle cx="166" cy="28" r="7" className="fill-none stroke-ink" strokeWidth="1.4" />
              </>
            )}
          </svg>
        </Frame>
      ))}
    </div>
  );
}

export function ShuttleMark({ className = "h-40 w-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 180" className={className} aria-hidden>
      <path d="M60 8c18 22 22 48 22 78 0 14-2 36-6 54H44c-4-18-6-40-6-54 0-30 4-56 22-78z" className="fill-cream stroke-ink" strokeWidth="2" />
      <rect x="48" y="70" width="24" height="18" rx="9" className="fill-ink" />
      <path d="M38 86l-18 38 22-10" className="fill-copper" />
      <path d="M82 86l18 38-22-10" className="fill-copper" />
      <path d="M50 140h20l6 22H44l6-22z" className="fill-copper-dim" />
      <path d="M52 164c2 8 6 12 8 14 2-2 6-6 8-14" className="stroke-copper fill-none" strokeWidth="3" />
    </svg>
  );
}
