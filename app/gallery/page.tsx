import type { Metadata } from "next";
import { listGalleryJobs } from "@/lib/aws/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "See detailing work completed by NOVA Detailing.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const jobs = await listGalleryJobs();

  return (
    <section className="section page-hero">
      <div className="site-shell">
        <div className="section-header">
          <p className="eyebrow enter">Gallery</p>
          <h1 className="enter" style={{ "--enter-delay": "100ms" } as React.CSSProperties}>
            Our <span className="shine-text">work</span>
          </h1>
          <p className="muted enter" style={{ "--enter-delay": "200ms" } as React.CSSProperties}>
            Real vehicles and before-and-after results uploaded by NOVA Detailing.
          </p>
        </div>

        {jobs.length ? (
          <div className="grid grid-3" data-reveal-stagger="110">
            {jobs.map((job) => (
              <article className="card" key={job.id} data-reveal="zoom">
                <h3>{job.title}</h3>
                {job.vehicle && <p>{job.vehicle}</p>}
                {job.description && <p className="muted">{job.description}</p>}
                <p className="form-help">
                  Image rendering/lightbox component comes in the gallery implementation pass.
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="card muted" data-reveal="zoom">
            No gallery entries are published yet.
          </div>
        )}
      </div>
    </section>
  );
}
