export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: "rgba(var(--plr),.12)", background: "var(--nk2)" }}>
      <div
        className="mx-auto flex max-w-[1760px] flex-wrap items-center justify-between gap-5 px-10 py-11 font-mono text-sm tracking-[.14em] uppercase max-[640px]:px-5"
        style={{ color: "var(--pl)" }}
      >
        <span>© {year} OBA Architectes Firm — Tous droits réservés</span>
        <span className="inline-flex items-center gap-2.5">
          <span
            className="h-[7px] w-[7px] rounded-full bg-[#EF8B12]"
            style={{ animation: "obaBlink 1.6s steps(1,end) infinite" }}
          />
          Cotonou, Bénin
        </span>
      </div>
    </footer>
  );
}
