import { Diagram } from "@/components/diagrams";
import type { Block, CalloutKind } from "@/content/sections";
import { cn } from "@/lib/utils";

const calloutStyle: Record<CalloutKind, string> = {
  def: "border-copper/40 bg-copper/8",
  example: "border-line bg-cream",
  remember: "border-ink/15 bg-ink/4",
};

const calloutLabel: Record<CalloutKind, string> = {
  def: "Ορισμός",
  example: "Παράδειγμα",
  remember: "Θυμήσου",
};

export function NotesBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-base leading-7 text-ink-soft">{block.text}</p>;
    case "h":
      return (
        <h2 className="mt-4 font-serif text-2xl text-ink">{block.text}</h2>
      );
    case "ul":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-7 text-ink-soft">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-copper" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "formula":
      return (
        <figure className="rounded-2xl bg-cream px-4 py-4 text-center shadow-[var(--shadow-paper)]">
          <div
            className="font-serif text-xl text-ink sm:text-2xl"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-muted">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "callout": {
      const label = calloutLabel[block.kind];
      const extra = block.title && block.title !== label ? block.title : null;
      return (
        <aside className={cn("rounded-2xl border px-4 py-3", calloutStyle[block.kind])}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
            {label}
            {extra ? <span className="text-muted"> · {extra}</span> : null}
          </p>
          <p className="mt-1 text-base leading-7">{block.text}</p>
        </aside>
      );
    }
    case "table":
      return (
        <figure className="overflow-x-auto rounded-2xl bg-cream shadow-[var(--shadow-paper)]">
          {block.caption ? (
            <figcaption className="border-b border-line px-4 py-2 text-sm text-muted">
              {block.caption}
            </figcaption>
          ) : null}
          <table className="w-full min-w-80 text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {block.headers.map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-line/70 last:border-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-ink-soft">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "diagram":
      return (
        <figure>
          <Diagram id={block.id} />
          {block.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}
