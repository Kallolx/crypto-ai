import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCheckLine } from "react-icons/ri";
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
    setTimeout(() => navigate("/dashboard-v2"), 1200);
  };

  return (
    <AuthLayout>
      {done ? (
        <div className="af-done">
          <span className="af-done__icon"><RiCheckLine /></span>
          <h1>Welcome back</h1>
          <p>You're signed in. Taking you to your dashboard…</p>
        </div>
      ) : (
        <form className="af" onSubmit={submit} noValidate>
          <div className="af__head">
            <h1>Sign in</h1>
            <p>Welcome back. Access your portfolio.</p>
          </div>

          <Field label="Email or username" placeholder="you@example.com" autoComplete="username" value={form.id} onChange={set("id")} error={errors.id} />
          <Field
            label="Password"
            type="password"
            placeholder="Your password"
            autoComplete="current-password"
            value={form.password}
            onChange={set("password")}
            error={errors.password}
            action={<Link to="/forgot-password">Forgot password?</Link>}
          />

          <Checkbox checked={remember} onChange={setRemember}>Keep me signed in</Checkbox>

          <Button type="submit" block className="af__submit" disabled={loading}>
            {loading ? <span className="af__spin" aria-label="Signing in" /> : "Sign in"}
          </Button>

          <p className="af__alt">New here? <Link to="/signup">Create an account</Link></p>
        </form>
      )}
    </AuthLayout>
  );
}
