import "./Auth.css";

/* Shell shared by sign in, sign up and password reset: a compact centred card under the site header. */
export default function AuthLayout({ children }) {
  return (
    <div className="auth">
      <div className="auth__card">{children}</div>
    </div>
  );
}
