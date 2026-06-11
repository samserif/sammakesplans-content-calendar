import { useState } from "react";
import { C, PLATFORMS, THEMES, STATUS } from "../data/constants";

export default function EditModal({ item, onSave, onClose, isNew }) {
  const [form, setForm] = useState({ ...item });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const Field = ({ label, k, type = "text", options }) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.stone, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{label}</label>
      {options
        ? <select value={form[k]} onChange={e => set(k, e.target.value)} style={{ width: "100%", padding: "7px 10px", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 13, color: C.ink, background: "#fff", boxSizing: "border-box" }}>
            {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
          </select>
        : type === "textarea"
          ? <textarea value={form[k]} onChange={e => set(k, e.target.value)} rows={5} style={{ width: "100%", padding: "7px 10px", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 12, color: C.ink, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
          : <input type={type} value={form[k]} onChange={e => set(k, type === "number" ? Number(e.target.value) : e.target.value)} style={{ width: "100%", padding: "7px 10px", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 13, color: C.ink, boxSizing: "border-box" }} />
      }
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(26,16,32,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
      <div style={{ background: C.white, borderRadius: 12, width: "100%", maxWidth: 580, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: C.purple, padding: "13px 18px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{isNew ? "Add Content" : "Edit Content"}</span>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>
        <div style={{ overflow: "auto", padding: 18, flex: 1 }}>
          <Field label="Title" k="title" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Platform" k="platform" options={PLATFORMS.map(p => ({ value: p.key, label: p.label }))} />
            <Field label="Theme / Pillar" k="theme" options={THEMES.map(t => ({ value: t.key, label: `${t.icon} ${t.label}` }))} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <Field label="Month" k="month" options={["June", "July", "August"]} />
            <Field label="Day" k="day" type="number" />
            <Field label="Status" k="status" options={STATUS.map(s => ({ value: s.key, label: s.label }))} />
          </div>
          <Field label="CTA" k="cta" />
          <Field label="Hook / Subject line" k="hook" type="textarea" />
          <Field label="Script / Copy" k="script" type="textarea" />
          <Field label="Caption" k="caption" type="textarea" />
          <Field label="Notes & Reminders" k="notes" type="textarea" />
        </div>
        <div style={{ padding: "12px 18px", borderTop: `1px solid ${C.linen}`, display: "flex", gap: 10, justifyContent: "flex-end", flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "8px 16px", border: `1px solid ${C.linen}`, borderRadius: 6, background: "transparent", color: C.stone, fontSize: 13, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => form.title.trim() && onSave(form)} style={{ padding: "8px 20px", border: "none", borderRadius: 6, background: C.purple, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save</button>
        </div>
      </div>
    </div>
  );
}
