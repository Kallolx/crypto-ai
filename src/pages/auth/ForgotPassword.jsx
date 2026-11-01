import { useState } from "react";
import { motion } from "framer-motion";
import { RiMailLine, RiMailSendLine, RiArrowRightUpLine, RiLockUnlockLine, RiArrowLeftLine } from "react-icons/ri";
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
        <motion.div className="af-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="af-done__icon"><RiMailSendLine /></span>
          <h1>Check your inbox</h1>
          <p>If an account exists for <b>{email}</b>, a reset link is on its way. It expires in 30 minutes.</p>
          <Button to="/login" variant="glass" icon={RiArrowLeftLine}>Back to sign in</Button>
        </motion.div>
      ) : (
        <form className="af" onSubmit={submit} noValidate>
          <div className="af__head">
            <span className="af__badge"><RiLockUnlockLine />Account recovery</span>
            <h1>Forgot password?</h1>
            <p>Enter the email on your account and we'll send you a link to set a new password.</p>
          </div>
          <Field label="Email" type="email" icon={RiMailLine} placeholder="you@example.com" autoComplete="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError(undefined); }} error={error} />
          <Button type="submit" size="lg" block className="af__submit" disabled={loading} icon={loading ? undefined : RiArrowRightUpLine}>
            {loading ? <span className="af__spin" aria-label="Sending" /> : "Send reset link"}
          </Button>
          <div className="af__alt">
            <span>Back to your account?</span>
            <Button to="/login" variant="glass" size="sm">Sign in</Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
