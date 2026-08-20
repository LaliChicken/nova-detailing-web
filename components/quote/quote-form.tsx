"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { addOns, services } from "@/data/services";
import { MAX_QUOTE_PHOTOS, MAX_QUOTE_PHOTO_BYTES, quotePhotoTypeSet } from "@/lib/upload-policy";

export function QuoteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedService = searchParams.get("service") || "";
  const initialService = useMemo(
    () => services.some((service) => service.id === requestedService) ? requestedService : "",
    [requestedService]
  );

  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function uploadPhotos(selectedFiles: File[]) {
    return Promise.all(
      selectedFiles.map(async (file) => {
        const presignResponse = await fetch("/api/uploads/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType: file.type, size: file.size }),
        });

        if (!presignResponse.ok) {
          const payload = await presignResponse.json().catch(() => ({}));
          throw new Error(payload.error || `Unable to prepare ${file.name} for upload.`);
        }

        const { key, url } = await presignResponse.json();
        const uploadResponse = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Unable to upload ${file.name}.`);
        }

        return key as string;
      })
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const form = new FormData(event.currentTarget);
      const photoKeys = await uploadPhotos(files);

      const payload = {
        name: String(form.get("name") || ""),
        phone: String(form.get("phone") || ""),
        email: String(form.get("email") || ""),
        vehicle: String(form.get("vehicle") || ""),
        service: String(form.get("service") || ""),
        addOns: form.getAll("addOns").map(String),
        location: String(form.get("location") || ""),
        message: String(form.get("message") || ""),
        preferredContact: String(form.get("preferredContact") || "text"),
        photoKeys,
        companyWebsite: String(form.get("companyWebsite") || ""),
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Unable to submit your request.");
      }

      router.push("/quote/success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your request.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleFiles(selected: FileList | null) {
    setError("");
    if (!selected) return;

    const nextFiles = Array.from(selected).slice(0, MAX_QUOTE_PHOTOS);
    const invalid = nextFiles.find(
      (file) => !quotePhotoTypeSet.has(file.type) || file.size > MAX_QUOTE_PHOTO_BYTES
    );

    if (invalid) {
      setError("Photos must be JPEG, PNG, WebP, HEIC, or HEIF and 10 MB or smaller each.");
      return;
    }

    setFiles(nextFiles);
  }

  return (
    <form className="stack max-w-2xl" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Your name *</label>
        <input id="name" name="name" autoComplete="name" required minLength={2} />
      </div>

      <div className="grid grid-2">
        <div className="form-field">
          <label htmlFor="phone">Phone number *</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address *</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="vehicle">Vehicle *</label>
        <input id="vehicle" name="vehicle" placeholder="e.g. 2022 Tesla Model 3" required />
      </div>

      <div className="form-field">
        <label htmlFor="service">Service *</label>
        <select id="service" name="service" defaultValue={initialService} required>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} — ${service.price}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="card">
        <legend className="field-label px-1">Optional add-ons</legend>
        <div className="stack">
          {addOns.map((addOn) => (
            <label key={addOn.id} className="flex items-center gap-3">
              <input type="checkbox" name="addOns" value={addOn.id} />
              <span>{addOn.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="location">City / location *</label>
        <input id="location" name="location" placeholder="e.g. Palo Alto" required />
      </div>

      <div className="form-field">
        <label htmlFor="message">Anything we should know?</label>
        <textarea
          id="message"
          name="message"
          maxLength={1500}
          placeholder="Problem areas, heavy dirt, stains, special requests, or anything else that would help us understand the job."
        />
      </div>

      <div className="form-field">
        <label htmlFor="photos">Vehicle photos</label>
        <input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
        />
        <p className="form-help">
          Optional. Upload up to {MAX_QUOTE_PHOTOS} photos. Photos are especially useful for heavily dirty vehicles, problem areas, or unusual requests.
        </p>
        {files.length > 0 && (
          <p className="form-help">
            Selected: {files.map((file) => file.name).join(", ")}
          </p>
        )}
      </div>

      <fieldset className="card">
        <legend className="field-label px-1">Preferred contact method *</legend>
        <div className="flex flex-wrap gap-5">
          {[
            ["text", "Text"],
            ["phone", "Phone"],
            ["email", "Email"],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="preferredContact"
                value={value}
                defaultChecked={value === "text"}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="companyWebsite">Company website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-help">
        Submitting a request does not book an appointment. NOVA will contact you to confirm the details and availability.
      </p>

      {error && <p className="error-text" role="alert">{error}</p>}

      <button className="button" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Request Quote"}
      </button>
    </form>
  );
}
