import Link from "next/link";
import { nGage } from "@/app/fonts";

export default function Logo() {
  return (
    <Link href="/" aria-label="ITFACT - DevSecOps + AI Solutions" className="flex items-end gap-3">
      <span className={`${nGage.className} text-[2.34375rem] tracking-[0.08em] text-white`}>
        ITFACT
      </span>
      <span className="pb-1 text-sm font-semibold tracking-wide text-muted">
        DEVSECOPS + AI SOLUTIONS
      </span>
    </Link>
  );
}
