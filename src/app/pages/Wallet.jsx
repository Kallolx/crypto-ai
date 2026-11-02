import { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiDashboardLine, RiDownload2Line, RiUpload2Line, RiArrowLeftRightLine, RiFileList3Line, RiShieldCheckLine,
  RiMailLockLine, RiMapPinLine, RiWallet3Line, RiHandCoinLine, RiShakeHandsLine, RiBankLine, RiCoinsLine,
  RiSafe2Line, RiCheckLine, RiCloseLine, RiSendPlaneLine, RiHistoryLine, RiAlertLine, RiArrowDownLine, RiArrowUpLine,
} from "react-icons/ri";
import { Panel, SubNav, Card, IChip, Tabs, CopyField, CopyButton, Steps, Table, KV, Meter, Field, AmountInput, Banner, Empty, usd } from "../ui";
import { Donut } from "../charts";
import Qr from "../Qr";
import DrawBanner from "./DrawBanner";
import {
  usdWallets, tokenWallets, totalUsd, ledger, deposit, withdrawFees, withdrawRules, depositHistory, withdrawHistory,
  transferHistory, user, TOKEN,
} from "../data";
import { BASE } from "../nav";

const W = `${BASE}/wallet`;
const icons = { deposit: RiWallet3Line, profit: RiHandCoinLine, affiliate: RiShakeHandsLine, withdraw: RiBankLine, staking: RiCoinsLine, "token-withdraw": RiSafe2Line };
const tones = { deposit: "blue", profit: "green", affiliate: "violet", withdraw: "cyan", staking: "gold", "token-withdraw": "gold" };
const colors = ["#3b82f6", "#34d399", "#a5b4fc", "#22d3ee"];

function WalletNav() {
  return (
    <SubNav items={[
      ["Overview", W, RiDashboardLine], ["Deposit", `${W}/deposit`, RiDownload2Line], ["Withdraw", `${W}/withdraw`, RiUpload2Line],
      ["Transfer", `${W}/transfer`, RiArrowLeftRightLine], ["Transactions", `${W}/transactions`, RiFileList3Line],
    ]} />
  );
}

/* "New" vs "History" toggle used on deposit, withdraw and transfer */
function ModeTabs({ mode, setMode, label }) {
  return <Tabs label={label} value={mode} onChange={setMode} tabs={[["new", `New ${label.toLowerCase()}`, null, RiSendPlaneLine], ["history", "History", null, RiHistoryLine]]} />;
}

function WalletCard({ w, unit }) {
  const fmt = (n) => (unit ? `${n.toLocaleString("en-US")} ${unit}` : usd(n));
  const used = w.credited ? (w.debited / w.credited) * 100 : 0;
  return (
    <div className="card wcard">
      <div className="wcard__top">
        <IChip icon={icons[w.id]} tone={tones[w.id]} />
        <div><b>{w.label}</b><small>{unit || "USD"}</small></div>
      </div>
      <span className="wcard__bal num">{fmt(w.balance)}</span>
      <div className="wcard__flow">
        <span><RiArrowDownLine className="positive" />Credited<b className="num">{fmt(w.credited)}</b></span>
        <span><RiArrowUpLine className="negative" />Debited<b className="num">{fmt(w.debited)}</b></span>
      </div>
      <Meter pct={used} />
      <small className="note">{used.toFixed(0)}% used · {w.use}</small>
    </div>
  );
}

export function WalletOverview() {
  const alloc = usdWallets.map((w, i) => ({ label: w.label.replace(" wallet", ""), value: w.balance, color: colors[i] }));
  return (
    <div className="pg">
      <WalletNav />
      <Panel
        chips={[[RiWallet3Line, "Wallet Center"], [RiShieldCheckLine, "Secured vault"]]}
        eyebrow="Total balance"
        value={usd(totalUsd)}
        sub={`Across Deposit, Withdraw, Profit and Affiliate wallets · ${tokenWallets[0].balance.toLocaleString("en-US")} ${TOKEN}`}
        tiles={usdWallets.map((w) => [w.label.replace(" wallet", ""), usd(w.balance), icons[w.id]])}
        actions={<>
          <Link className="ui-btn ui-btn--cyan" to={`${W}/deposit`}><RiDownload2Line />Deposit</Link>
          <Link className="ui-btn" to={`${W}/transfer`}><RiArrowLeftRightLine />Transfer</Link>
          <Link className="ui-btn" to={`${W}/withdraw`}><RiUpload2Line />Withdraw</Link>
        </>}
        aside={
          <>
            <span className="xp__aside-title">USD allocation</span>
            <div className="mini-donut">
              <div className="mini-donut__ring"><Donut data={alloc} /><span className="num">{usd(totalUsd / 1000, 1)}K</span></div>
              <ul>
                {alloc.map((a) => <li key={a.label}><i style={{ background: a.color }} />{a.label}<b className="num">{Math.round((a.value / totalUsd) * 100)}%</b></li>)}
              </ul>
            </div>
          </>
        }
      >
        <div className="xp__chips xp__chips--foot">
          <span className="xp__chip"><RiShieldCheckLine />USDT · BEP20 only</span>
          <span className="xp__chip"><RiMailLockLine />Email code on transfers</span>
          <span className="xp__chip"><RiMapPinLine />Personal deposit address</span>
        </div>
      </Panel>

      <div className="sec-head"><div><h3>USD wallets</h3><small>Balance, money in and out, and share used</small></div><Link className="card__link" to={`${W}/transactions`}>All transactions</Link></div>
      <div className="grid-4">{usdWallets.map((w) => <WalletCard key={w.id} w={w} />)}</div>

      <div className="sec-head"><div><h3>Token wallets</h3><small>Balances in {TOKEN}</small></div></div>
      <div className="grid-4">{tokenWallets.map((w) => <WalletCard key={w.id} w={w} unit={TOKEN} />)}</div>
    </div>
  );
}

export function Deposit() {
  const [mode, setMode] = useState("new");
  return (
    <div className="pg">
      <WalletNav />
      <div className="card">
        <ModeTabs mode={mode} setMode={setMode} label="Deposit" />
        {mode === "history" ? (
          <Table cols={["Date", "From", "Amount", "Txn hash", "Status"]} rows={depositHistory}
            empty={<Empty icon={RiDownload2Line} title="No deposits yet" text="Deposits show up here as soon as they reach your wallet." />} />
        ) : (
          <div className="card__body">
            <div className="grid-main">
              <div className="deposit">
                <div className="deposit__qr">
                  <Qr value={deposit.address} />
                  <span className="badge badge--ok">USDT BEP20 only</span>
                </div>
                <div className="vstack">
                  <div className="net">
                    <IChip icon={RiCoinsLine} tone="gold" />
                    <div><span className="copy__label">Network</span><b>BNB Smart Chain (BSC)</b><small>BEP20</small></div>
                  </div>
                  <CopyField label="Deposit address" value={deposit.address} />
                  <Banner icon={RiAlertLine} tone="warn" title="Send only USDT on BNB Smart Chain" text="Other tokens or networks can't be recovered." />
                </div>
              </div>
              <div className="vstack">
                <Card title="Deposit details">
                  <KV rows={[["Deposit to", "Deposit wallet"], ["Minimum deposit", usd(deposit.min)], ["Asset", "USDT"], ["Network", "BSC (BEP20)"], ["Confirmations", "12"], ["Usually arrives", "~5 minutes"]]} />
                </Card>
                <Card title="How to deposit">
                  <Steps items={[["Copy your address", "Scan the QR code or copy the address."], ["Send USDT (BEP20)", "Withdraw from your exchange using BNB Smart Chain."], ["Receive in Deposit wallet", "Credited after 12 network confirmations."]]} />
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
      <DrawBanner title="Your deposit can enter the draw" text="Once your deposit lands, tickets are one tap away from any page." />
    </div>
  );
}

export function Withdraw() {
  const [mode, setMode] = useState("new");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("0x7a3F9c2B41d8E6f05A97c3b2De4417aC0f5c91E");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);
  const available = usdWallets[3].balance;
  const amt = Number(amount) || 0;
  const fees = withdrawFees.map(([k, pct]) => [k, pct, (amt * pct) / 100]);
  const receive = amt - fees.reduce((a, f) => a + f[2], 0);
  const valid = amt >= 10 && amt <= available && amt % 10 === 0 && code.length === 6 && address.startsWith("0x");

  return (
    <div className="pg">
      <WalletNav />
      <div className="card">
        <ModeTabs mode={mode} setMode={setMode} label="Withdrawal" />
        {mode === "history" ? (
          <Table cols={["Date", "To address", "Requested", "Received", "Status"]} rows={withdrawHistory} />
        ) : done ? (
          <div className="card__body"><Banner icon={RiCheckLine} tone="ok" title="Withdrawal requested" text={`${usd(receive)} will be sent to ${address.slice(0, 6)}…${address.slice(-4)} within 96 hours.`} /></div>
        ) : (
          <div className="card__body">
            <div className="grid-main">
              <form className="fieldset" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <Field label="USDT (BEP20) wallet address" required hint="Crypto transfers can't be reversed. Check the address carefully.">
                  <div className="inline-input"><input value={address} onChange={(e) => setAddress(e.target.value)} /><CopyButton text={address} label="Copy" /></div>
                </Field>
                <div className="f">
                  <span className="f__row"><span>Amount to withdraw<em> *</em></span><span className="badge badge--ok">Available {usd(available)}</span></span>
                  <AmountInput value={amount} onChange={setAmount} placeholder="Enter amount" />
                  <div className="chips">
                    {[50, 100, 500].map((v) => <button type="button" key={v} className="chip" aria-pressed={amt === v} onClick={() => setAmount(String(v))}>${v}</button>)}
                    <button type="button" className="chip" onClick={() => setAmount(String(Math.floor(available / 10) * 10))}>Max</button>
                  </div>
                  <small>Multiples of $10 · Min $10 · Max {usd(available)}</small>
                </div>
                <Field label="Email verification code" required>
                  <div className="inline-input">
                    <input inputMode="numeric" maxLength={6} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
                    <button type="button" className="ui-btn ui-btn--sm" onClick={() => setSent(true)}><RiSendPlaneLine />{sent ? "Resend" : "Send code"}</button>
                  </div>
                  {sent && <small className="positive">Code sent to {user.email}</small>}
                </Field>
                <button className="ui-btn ui-btn--primary ui-btn--lg" disabled={!valid}><RiUpload2Line />Request withdrawal</button>
              </form>

              <div className="vstack">
                <div className="receipt">
                  <span className="xp__aside-title">Withdraw wallet balance</span>
                  <b className="receipt__bal num">{usd(available)}</b>
                  <div className="receipt__route"><span><RiBankLine />Withdraw wallet</span><RiArrowLeftRightLine /><span>USDT BEP20</span></div>
                  <ul className="receipt__rows">
                    {fees.map(([k, pct, v]) => <li key={k}><span>{k} <em>{pct}%</em></span><b className="num">−{usd(v)}</b></li>)}
                  </ul>
                  <div className="receipt__total"><span>You receive</span><b className="num">{usd(Math.max(0, receive))}</b></div>
                  <small className="note">Deductions update as you type. Total fees: 20% of the amount.</small>
                </div>
                <Card title="Before you withdraw" sub="These checks decide whether a request can go through">
                  <ul className="checklist">
                    {withdrawRules.map(([k, ok]) => <li key={k} className={ok ? "is-ok" : ""}>{ok ? <RiCheckLine /> : <RiCloseLine />}{k}</li>)}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Transfer() {
  const [mode, setMode] = useState("new");
  const [from, setFrom] = useState("affiliate");
  const [amount, setAmount] = useState("");
  const [code, setCode] = useState("");
  const [done, setDone] = useState(false);
  const source = usdWallets.find((w) => w.id === from);
  const amt = Number(amount) || 0;
  const valid = amt >= 5 && amt <= source.balance && code.length === 6;

  return (
    <div className="pg">
      <WalletNav />
      <div className="card">
        <ModeTabs mode={mode} setMode={setMode} label="Transfer" />
        {mode === "history" ? (
          <Table cols={["Date", "From", "To", "Amount", "Status"]} rows={transferHistory} />
        ) : done ? (
          <div className="card__body"><Banner icon={RiCheckLine} tone="ok" title="Transfer complete" text={`${usd(amt)} moved from ${source.label} to Withdraw wallet.`} /></div>
        ) : (
          <div className="card__body">
            <div className="grid-main">
              <form className="fieldset" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <div className="f">
                  <span>From wallet</span>
                  <div className="opts">
                    {usdWallets.filter((w) => w.id === "affiliate" || w.id === "profit").map((w) => (
                      <button type="button" key={w.id} className="opt opt--row" aria-pressed={from === w.id} onClick={() => setFrom(w.id)}>
                        <IChip icon={icons[w.id]} tone={tones[w.id]} size="sm" />
                        <span><b>{w.label}</b><span>{usd(w.balance)} available</span></span>
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="To wallet"><input value="Withdraw wallet" disabled /></Field>
                <Field label="Transfer amount" hint={`Minimum $5.00 · Available ${usd(source.balance)}`}>
                  <AmountInput value={amount} onChange={setAmount} placeholder="Min $5.00" />
                </Field>
                <Field label="Email code">
                  <div className="inline-input">
                    <input inputMode="numeric" maxLength={6} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
                    <button type="button" className="ui-btn ui-btn--sm"><RiSendPlaneLine />Send code</button>
                  </div>
                </Field>
                <button className="ui-btn ui-btn--primary ui-btn--lg" disabled={!valid}><RiArrowLeftRightLine />Transfer {amt ? usd(amt) : ""}</button>
              </form>
              <div className="vstack">
                <div className="receipt">
                  <span className="xp__aside-title">Transfer summary</span>
                  <div className="receipt__route"><span>{source.label}</span><RiArrowLeftRightLine /><span>Withdraw wallet</span></div>
                  <ul className="receipt__rows">
                    <li><span>Amount</span><b className="num">{usd(amt)}</b></li>
                    <li><span>Fee</span><b className="num">$0.00</b></li>
                    <li><span>{source.label} after</span><b className="num">{usd(Math.max(0, source.balance - amt))}</b></li>
                  </ul>
                  <div className="receipt__total"><span>Arrives</span><b>Instantly</b></div>
                </div>
                <Card title="Good to know">
                  <Steps items={[["Only to Withdraw wallet", "Profit and affiliate income move to the Withdraw wallet before payout."], ["Email confirmation", "Every transfer needs a one-time code sent to your email."]]} />
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const walletFilter = ["All wallets", "Deposit wallet", "Profit wallet", "Affiliate wallet", "Withdraw wallet"];
const amountOf = (s) => (s.startsWith("−") ? -1 : 1) * Number(s.replace(/[^\d.]/g, ""));

export function Transactions() {
  const [wallet, setWallet] = useState("All wallets");
  const rows = ledger.filter((r) => wallet === "All wallets" || r[2] === wallet);
  const inSum = rows.filter((r) => r[3].startsWith("+")).reduce((a, r) => a + amountOf(r[3]), 0);
  const outSum = rows.filter((r) => !r[3].startsWith("+")).reduce((a, r) => a - amountOf(r[3]), 0);

  return (
    <div className="pg">
      <WalletNav />
      <Panel
        eyebrow={wallet}
        value={`${rows.length} transactions`}
        tiles={[["Money in", `+${usd(inSum)}`, RiArrowDownLine], ["Money out", `−${usd(outSum)}`, RiArrowUpLine], ["Net", usd(inSum - outSum), RiFileList3Line]]}
        aside={
          <>
            <span className="xp__aside-title">Browse by wallet</span>
            <div className="chips">
              {walletFilter.map((w) => <button key={w} className="chip" aria-pressed={wallet === w} onClick={() => setWallet(w)}>{w}</button>)}
            </div>
          </>
        }
      />
      <Card title="Transactions" sub={`Showing ${rows.length} of ${ledger.length}`} body={false} icon={RiFileList3Line} tone="cyan">
        <Table cols={["Date", "Type", "Wallet", "Amount", "Status"]} rows={rows}
          empty={<Empty icon={RiFileList3Line} title="No transactions yet" text="Credits and debits across your wallets will appear here." action={<Link className="ui-btn ui-btn--primary" to={`${W}/deposit`}>Make a deposit</Link>} />} />
      </Card>
    </div>
  );
}
