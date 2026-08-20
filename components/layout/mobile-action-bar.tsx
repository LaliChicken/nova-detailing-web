import Link from "next/link";
import { callHref, smsHref } from "@/lib/site";

export function MobileActionBar() {
  return (
    <div className="mobile-action-bar">
      <a href={smsHref}>Text</a>
      <Link href="/quote" className="primary">
        Quote
      </Link>
      <a href={callHref}>Call</a>
    </div>
  );
}
