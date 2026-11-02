import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RiCheckLine, RiArrowRightUpLine } from "react-icons/ri";
import AuthLayout from "./AuthLayout";
import PasswordStrength, { scorePassword } from "./PasswordStrength";
import Field from "@/components/ui/Field/Field";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Button from "@/components/ui/Button/Button";
import { signUp } from "@/services/auth";
import { site } from "@/config/site";

// Countries where the platform is available (US, Canada and UAE are excluded)
const dial = [["+44", "UK"], ["+370", "LT"], ["+49", "DE"], ["+33", "FR"], ["+34", "ES"], ["+39", "IT"], ["+31", "NL"], ["+91", "IN"], ["+61", "AU"], ["+65", "SG"], ["+90", "TR"], ["+234", "NG"]];

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export default function SignUp() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ first: "", last: "", email: "", code: "+44", phone: "", referral: params.get("ref") || "", password: "", repeat: "" });
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: undefined });
  };

  const submit = async (e) => {
    e.preventDefault();
    const n = {};
    if (!form.first.trim()) n.first = "Required.";
    if (!form.last.trim()) n.last = "Required.";
    if (!emailOk(form.email)) n.email = "Enter a valid email address.";
    if (form.phone.replace(/\D/g, "").length < 6) n.phone = "Enter a valid phone number.";
    if (scorePassword(form.password) < 3) n.password = "Choose a stronger password.";
    if (form.repeat !== form.password || !form.repeat) n.repeat = "Passwords do not match.";
    if (!accept) n.accept = "You must accept the terms to continue.";
    setErrors(n);
    if (Object.keys(n).length) return;

    setLoading(true);
    await signUp(form);
    setLoading(false);
    setDone(true);
  };

  return (
    <AuthLayout>
      {done ? (
        <div className="af-done">
          <span className="af-done__icon"><RiCheckLine /></span>
          <h1>Account created</h1>
          <p>Welcome to {site.name}, {form.first}. We sent a confirmation link to <b>{form.email}</b>.</p>
          <Button size="lg" icon={RiArrowRightUpLine} onClick={() => navigate("/login")}>Continue to sign in</Button>
        </div>
      ) : (
        <form className="af" onSubmit={submit} noValidate>
          <div className="af__head">
            <h1>Create account</h1>
            <p>Start your investment journey in a few minutes.</p>
          </div>

          <div className="af__row af__row--keep">
            <Field label="First name" autoComplete="given-name" value={form.first} onChange={set("first")} error={errors.first} />
            <Field label="Last name" autoComplete="family-name" value={form.last} onChange={set("last")} error={errors.last} />
          </div>

          <div className="af__row">
            <Field label="Email" type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
            <Field
              label="Phone"
              type="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={set("phone")}
              error={errors.phone}
              prefix={
                <select className="fld__prefix" aria-label="Country code" value={form.code} onChange={set("code")}>
                  {dial.map(([c, n]) => <option key={c} value={c}>{n} {c}</option>)}
                </select>
              }
            />
          </div>

          <Field label="Referral" hint="optional" placeholder="Sponsor ID" value={form.referral} onChange={set("referral")} />

          <div className="af__row">
            <Field label="Password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} error={errors.password} />
            <Field label="Repeat password" type="password" autoComplete="new-password" value={form.repeat} onChange={set("repeat")} error={errors.repeat} />
          </div>
          <PasswordStrength value={form.password} />

          <Checkbox checked={accept} onChange={(v) => { setAccept(v); setErrors({ ...errors, accept: undefined }); }} error={errors.accept}>
            I accept the <Link to="/terms">Terms &amp; Conditions</Link>, <Link to="/privacy">Privacy Policy</Link> and <Link to="/risk">Risk Disclosure</Link>.
          </Checkbox>

          <Button type="submit" block className="af__submit" disabled={loading}>
            {loading ? <span className="af__spin" aria-label="Creating account" /> : "Create account"}
          </Button>

          <p className="af__alt">Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="af__note">Not available to residents of the {site.restricted}.</p>
        </form>
      )}
    </AuthLayout>
  );
}
