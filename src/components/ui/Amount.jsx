/* Formatted number, e.g. <Amount to={1234.5} prefix="$" decimals={2} /> */
export default function Amount({ to, decimals = 0, prefix = "", suffix = "", locale = true, className }) {
  const text = locale
    ? to.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : to.toFixed(decimals);
  return <span className={className}>{prefix + text + suffix}</span>;
}
