const items = [
  "Interior detailing",
  "Exterior detailing",
  "Paint correction",
  "Headlight restoration",
  "Mobile service",
  "San Francisco → San Jose",
];

/**
 * Seamless marquee: the list is rendered twice and the track scrolls exactly
 * half its width, so the loop has no visible seam.
 */
export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div className="ticker-group" key={copy}>
            {items.map((item) => (
              <span key={item} className="ticker-item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
