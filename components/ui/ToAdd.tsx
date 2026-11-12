/** Visible marker for a fact that has not been supplied yet. Fill it in `content/site.ts` to remove it. */
export function ToAdd({ what }: { what: string }) {
  return (
    <span className="to-add" title="Placeholder — set this in content/site.ts">
      {what} — to add
    </span>
  );
}
