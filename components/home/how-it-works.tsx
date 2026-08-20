const steps = [
  {
    number: "01",
    title: "Request",
    text: "Send your vehicle, service, and location details. Photos are optional but helpful.",
  },
  {
    number: "02",
    title: "Confirm",
    text: "NOVA contacts you directly to confirm the request and exact availability.",
  },
  {
    number: "03",
    title: "We come to you",
    text: "Provide access to water and electricity at your location and NOVA handles the detail.",
  },
  {
    number: "04",
    title: "Pay",
    text: "Payment is accepted through Zelle, Venmo, or cash.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="site-shell">
        <div className="section-header" data-reveal="up">
          <p className="eyebrow">Process</p>
          <h2>How it works</h2>
          <p className="muted">Four steps from first text to a finished vehicle.</p>
        </div>

        <div className="process-rail" data-reveal="wipe" data-reveal-duration="1400" />

        <div className="grid grid-4" data-reveal-stagger="120">
          {steps.map((step) => (
            <article className="card step-card" key={step.number} data-reveal="up">
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
