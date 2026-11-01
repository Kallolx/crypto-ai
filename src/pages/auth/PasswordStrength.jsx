/* 0-4 score: length, mixed case, number, symbol */
export function scorePassword(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

export default function PasswordStrength({ value }) {
  const score = scorePassword(value);
  return (
    <div className="pws" aria-live="polite">
      <div className="pws__bars">
        {[1, 2, 3, 4].map((n) => (
          <i key={n} className={score >= n ? `on-${score}` : ""} />
        ))}
      </div>
      <div className="pws__hint">
        <span>Use 8+ characters with upper and lower case, numbers and symbols.</span>
        <b>{value ? labels[score] : ""}</b>
      </div>
    </div>
  );
}
