import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMailSendLine, RiArrowLeftLine } from "react-icons/ri";
import AuthLayout from "./AuthLayout";
import Field from "@/components/ui/Field/Field";
import Button from "@/components/ui/Button/Button";
import { requestPasswordReset } from "@/services/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout>
      {sent ? (
        <div className="af-done">
          <span className="af-done__icon"><RiMailSendLine /></span>
          <h1>Check your inbox</h1>
          <p>If an account exists for <b>{email}</b>, a reset link is on its way. It expires in 30 minutes.</p>
          <Button to="/login" variant="glass" size="sm" icon={RiArrowLeftLine}>Back to sign in</Button>
        </div>
      ) : (
        <form className="af" onSubmit={submit} noValidate>
          <div className="af__head">
            <h1>Forgot password?</h1>
            <p>Enter your email and we'll send you a reset link.</p>
          </div>
          <Field label="Email" type="email" placeholder="you@example.com" autoComplete="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(undefined); }} error={error} />
          <Button type="submit" block className="af__submit" disabled={loading}>
            {loading ? <span className="af__spin" aria-label="Sending" /> : "Send reset link"}
          </Button>
          <p className="af__alt">Remembered it? <Link to="/login">Sign in</Link></p>
        </form>
      )}
    </AuthLayout>
  );
}
