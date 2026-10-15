// Lets the admin pick which point of a cover photo must stay visible when a
// public card crops it (object-fit: cover). The value is a CSS
// object-position string such as "50% 25%", or null for the default centre.
const parsePosition = (value) => {
  const match = /^(\d{1,3})% (\d{1,3})%$/.exec(value || "");
  return match ? [Number(match[1]), Number(match[2])] : [50, 50];
};

const toPercent = (offset, size) =>
  Math.min(100, Math.max(0, Math.round((offset / size) * 100)));

const FocalPointPicker = ({ src, value, onChange, previews }) => {
  const [x, y] = parsePosition(value);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onChange(
      `${toPercent(e.clientX - rect.left, rect.width)}% ${toPercent(
        e.clientY - rect.top,
        rect.height,
      )}%`,
    );
  };

  return (
    <div className="mb-3">
      <p className="text-muted small mb-2">
        Klikněte do fotky na místo, které má při ořezu zůstat vždy vidět (např.
        obličeje).
      </p>
      <div className="d-flex flex-wrap gap-4 align-items-start">
        <div className="focal-picker-image" onClick={handleClick}>
          <img src={src} alt="" draggable={false} />
          <span
            className="focal-picker-marker"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        </div>
        <div>
          <div className="small mb-1">Náhled ořezu:</div>
          <div className="d-flex flex-wrap gap-3 align-items-start">
            {previews.map((preview) => (
              <div key={preview.label}>
                <img
                  src={src}
                  alt=""
                  className="focal-picker-preview"
                  style={{
                    width: preview.width,
                    height: preview.height,
                    objectPosition: `${x}% ${y}%`,
                  }}
                />
                <div className="small text-muted">{preview.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-light border-dark btn-sm mt-2"
        onClick={() => onChange(null)}
        disabled={!value}
      >
        Vycentrovat
      </button>
    </div>
  );
};

export default FocalPointPicker;
