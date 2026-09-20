import { cn } from "@/src/lib/utils";

/**
 * Decorative QR pass placeholder.
 *
 * Issue #30 is frontend-only, so there is no registration service to mint a
 * real scannable code yet. Rather than pull in a QR dependency to encode
 * placeholder data, this renders a QR-shaped SVG derived deterministically
 * from the ticket code: the same code always produces the same pattern, on the
 * server and in the browser alike, so there is no hydration mismatch and
 * Storybook renders identically on every run.
 *
 * Swapping this for a real encoder later only needs to preserve the props.
 */

/** Module grid size. 21x21 matches a real QR version-1 symbol. */
const MODULE_COUNT = 21;
/** Finder squares occupy 7x7, plus a 1-module separator around them. */
const FINDER_SIZE = 7;
const RESERVED = FINDER_SIZE + 1;

/** FNV-1a — small, fast, and stable across runtimes. */
function hashTicketCode(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** xorshift32 — deterministic PRNG so the pattern is reproducible from the seed. */
function createRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0xffffffff;
  };
}

/** Corner zones are occupied by finder patterns and carry no data modules. */
function isReserved(x: number, y: number): boolean {
  const far = MODULE_COUNT - RESERVED;
  return (
    (x < RESERVED && y < RESERVED) ||
    (x >= far && y < RESERVED) ||
    (x < RESERVED && y >= far)
  );
}

function buildModules(ticketCode: string): Array<{ x: number; y: number }> {
  const random = createRandom(hashTicketCode(ticketCode));
  const modules: Array<{ x: number; y: number }> = [];

  for (let y = 0; y < MODULE_COUNT; y += 1) {
    for (let x = 0; x < MODULE_COUNT; x += 1) {
      // The PRNG is advanced for reserved cells too, so the data pattern does
      // not shift when the finder zones change size.
      const filled = random() > 0.5;
      if (filled && !isReserved(x, y)) {
        modules.push({ x, y });
      }
    }
  }

  return modules;
}

/** One finder square: filled 7x7, hollowed to 5x5, with a solid 3x3 centre. */
function FinderPattern({ x, y }: { x: number; y: number }) {
  return (
    <>
      <rect x={x} y={y} width={FINDER_SIZE} height={FINDER_SIZE} fill="currentColor" />
      <rect
        x={x + 1}
        y={y + 1}
        width={FINDER_SIZE - 2}
        height={FINDER_SIZE - 2}
        fill="var(--text-blush)"
      />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="currentColor" />
    </>
  );
}

interface QrPassProps {
  /** Pass code printed beneath the symbol, e.g. `RVCE-EVT-98213`. */
  ticketCode: string;
  className?: string;
}

export function QrPass({ ticketCode, className }: QrPassProps) {
  const modules = buildModules(ticketCode);
  const finderOffset = MODULE_COUNT - FINDER_SIZE;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="rounded-xl bg-[var(--text-blush)] p-3">
        <svg
          viewBox={`0 0 ${MODULE_COUNT} ${MODULE_COUNT}`}
          shapeRendering="crispEdges"
          aria-hidden="true"
          className="size-28 text-[var(--surface-dark)] sm:size-32"
        >
          <rect width={MODULE_COUNT} height={MODULE_COUNT} fill="var(--text-blush)" />
          {modules.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="currentColor" />
          ))}
          <FinderPattern x={0} y={0} />
          <FinderPattern x={finderOffset} y={0} />
          <FinderPattern x={0} y={finderOffset} />
        </svg>
      </div>
      <p className="font-[family-name:var(--font-space-grotesk)] text-xs font-semibold tracking-[0.14em] text-[var(--text-blush)]">
        {ticketCode}
      </p>
    </div>
  );
}
