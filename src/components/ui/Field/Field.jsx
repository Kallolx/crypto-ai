import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiEyeLine, RiEyeOffLine, RiErrorWarningLine } from "react-icons/ri";
import "./Field.css";

/* Labelled input with leading icon, password reveal, optional prefix (e.g. country code) and animated error. */
export default function Field({ label, hint, icon: Icon, error, type = "text", action, prefix, className = "", ...rest }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPw = type === "password";

  return (
    <div className={`fld ${error ? "has-error" : ""} ${className}`}>
      <div className="fld__top">
        <label htmlFor={id}>
          {label}
          {hint && <small>{hint}</small>}
        </label>
        {action}
      </div>
      <div className="fld__box">
        {Icon && <Icon className="fld__icon" aria-hidden="true" />}
        {prefix}
        <input id={id} type={isPw && show ? "text" : type} aria-invalid={!!error} {...rest} />
        {isPw && (
          <button type="button" className="fld__eye" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} data-cursor="hover">
            {show ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p className="fld__error" role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
            <RiErrorWarningLine />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
