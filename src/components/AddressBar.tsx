import { site } from "@/data/site";

export function AddressBar() {
  return (
    <div className="border-t border-line/70 bg-bg-elevated/80 py-4 text-center">
      <p className="text-[11px] uppercase tracking-[0.22em] text-cream-muted">
        {site.address}
      </p>
    </div>
  );
}
