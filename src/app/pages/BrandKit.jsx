import { useState } from "react";
import { RiDownload2Line, RiEyeLine, RiFilePdf2Line, RiImageLine, RiVideoLine, RiCheckLine, RiFileTextLine, RiPaletteLine, RiLinksLine, RiShareLine, RiFolderLine } from "react-icons/ri";
import { Panel, Card, Tabs, CopyField } from "../ui";
import { brandColors, assets, user } from "../data";

const catIcon = { Presentations: RiFilePdf2Line, Logos: RiImageLine, Social: RiImageLine, Videos: RiVideoLine };

function Swatch({ name, hex }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button className="swatch" onClick={copy} aria-label={`Copy ${name} ${hex}`}>
      <i style={{ background: hex }} />
      <b>{name}</b>
      <small>{done ? <><RiCheckLine /> Copied</> : hex}</small>
    </button>
  );
}

export default function BrandKit() {
  const [cat, setCat] = useState("all");
  const cats = [...new Set(assets.map((a) => a.cat))];
  const list = cat === "all" ? assets : assets.filter((a) => a.cat === cat);
  const featured = assets[0];
  const fresh = assets.filter((a) => a.isNew).length;

  return (
    <div className="pg">
      <Panel
        chips={[[RiPaletteLine, "Brand Kit"], [RiShareLine, "Share like a pro"]]}
        title="Official logos, presentations, social posts and videos"
        sub="Download what you need, copy a ready-made caption with your referral link, and post."
        tiles={[["Files", String(assets.length), RiFolderLine], ["Categories", String(cats.length), RiPaletteLine], ["New this fortnight", String(fresh), RiCheckLine]]}
        aside={
          <div className="vstack">
            <span className="xp__aside-title">Featured · {featured.cat}</span>
            <div className="asset__thumb" style={{ borderRadius: 8 }}><RiFilePdf2Line /></div>
            <b>{featured.name}</b>
            <small className="note">{featured.meta}</small>
            <div className="xp__actions" style={{ marginTop: 0 }}>
              <button className="ui-btn ui-btn--cyan ui-btn--sm"><RiDownload2Line />Download</button>
              <button className="ui-btn ui-btn--sm"><RiEyeLine />Preview</button>
            </div>
          </div>
        }
      />

      <div className="grid-main">
        <Card title="Brand colours" sub="Tap a swatch to copy its hex code" icon={RiPaletteLine} tone="violet">
          <div className="swatches">{brandColors.map(([n, h]) => <Swatch key={n} name={n} hex={h} />)}</div>
        </Card>
        <Card title="Your referral link" sub="Add it to every caption" icon={RiLinksLine} tone="cyan">
          <CopyField value={`https://${user.inviteLink}`} />
        </Card>
      </div>

      <div className="card">
        <div className="card__head"><div className="card__title"><span className="ichip tone-blue ichip--sm"><RiFolderLine /></span><div><h3>Library</h3><small>{list.length} of {assets.length} files</small></div></div></div>
        <Tabs label="Category" value={cat} onChange={setCat} tabs={[["all", "All", assets.length], ...cats.map((c) => [c, c, assets.filter((a) => a.cat === c).length, catIcon[c]])]} />
        <div className="assets">
          {list.map((a) => {
            const Icon = catIcon[a.cat] || RiFileTextLine;
            return (
              <div className="asset" key={a.name}>
                <div className="asset__thumb"><Icon />{a.isNew && <span className="badge badge--info">New</span>}</div>
                <div className="asset__body"><b>{a.name}</b><small>{a.cat} · {a.meta}</small></div>
                <div className="asset__foot">
                  <button className="ui-btn ui-btn--sm ui-btn--primary"><RiDownload2Line />Download</button>
                  <button className="ui-btn ui-btn--sm"><RiEyeLine />Preview</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
