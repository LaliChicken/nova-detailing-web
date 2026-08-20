import Link from "next/link";

const cities = [
  "San Francisco",
  "Daly City",
  "San Mateo",
  "Redwood City",
  "Palo Alto",
  "Mountain View",
  "Sunnyvale",
  "Santa Clara",
  "San Jose",
];

export function ServiceArea() {
  return (
    <section className="section">
      <div className="site-shell grid grid-2 items-center">
        <div data-reveal="left">
          <p className="eyebrow">Mobile service</p>
          <h2>Serving the Bay Area from San Francisco to San Jose.</h2>
          <p className="muted">
            Exact availability depends on your location and schedule. Send your city through the
            quote form and NOVA will confirm service availability.
          </p>

          <ul className="city-list" data-reveal-stagger="60">
            {cities.map((city) => (
              <li key={city} data-reveal="zoom">
                {city}
              </li>
            ))}
          </ul>

          <div className="button-row">
            <Link href="/quote" className="button">
              Check Availability
            </Link>
          </div>
        </div>

        <div className="card requirements-card" data-reveal="right">
          <p className="eyebrow">On site</p>
          <h3>At your service location</h3>
          <p className="muted">Customers must provide access to:</p>
          <ul className="feature-list">
            <li>Water</li>
            <li>Electricity</li>
          </ul>
          <p className="muted" style={{ marginBottom: 0 }}>
            Most services take approximately 1–4 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
