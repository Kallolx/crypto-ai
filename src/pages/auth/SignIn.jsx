import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiUserLine, RiLockPasswordLine, RiArrowRightUpLine, RiShieldCheckLine, RiCheckLine, RiLock2Line } from "react-icons/ri";
import AuthLayout from "./AuthLayout";
import Field from "@/components/ui/Field/Field";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Button from "@/components/ui/Button/Button";
import { signIn } from "@/services/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.id.trim()) next.id = "Enter your email or username.";
    if (!form.password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    await signIn({ ...form, remember });
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate("/"), 1400);
  };

  return (
    <AuthLayout>
      {done ? (
        <motion.div className="af-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <span className="af-done__icon"><RiCheckLine /></span>
          <h1>Welcome back</h1>
          <p>You're signed in. Taking you to your dashboard…</p>
        </motion.div>
      ) : (
        <form className="af" onSubmit={submit} noValidate>
          <div className="af__head">
            <span className="af__badge"><RiLock2Line />Secure sign in</span>
            <h1>Sign in</h1>
            <p>Welcome back. Access your investment portfolio.</p>
          </div>

          <Field label="Email or username" icon={RiUserLine} placeholder="you@example.com" autoComplete="username" value={form.id} onChange={set("id")} error={errors.id} />
          <Field
            label="Password"
            type="password"
            icon={RiLockPasswordLine}
            placeholder="Enter your password"
            autoComplete="current-password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            action={<Link to="/forgot-password">Forgot password?</Link>}
          />

          <Checkbox checked={remember} onChange={setRemember}>Keep me signed in on this device</Checkbox>

          <Button type="submit" size="lg" block className="af__submit" disabled={loading} icon={loading ? undefined : RiArrowRightUpLine}>
            {loading ? <span className="af__spin" aria-label="Signing in" /> : "Sign in"}
          </Button>

          <p className="af__note"><RiShieldCheckLine />Never share your password with anyone.</p>

          <div className="af__divider">New here?</div>
          <div className="af__alt">
            <span>Not a member yet?</span>
            <Button to="/signup" variant="glass" size="sm" icon={RiArrowRightUpLine}>Create account</Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
