import { useState } from "react";
import { C, STATUS, platByKey, themeByKey } from "../data/constants";

function PanelSection({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.stone, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

export default function DetailPanel({ item, onClose, onStatus, onEdit, onDelete }) {
  const plat = platByKey(item.platform);
  const theme = themeByKey(item.theme);
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 440, background: C.white, boxShadow: "-4px 0 28px rgba(0,0,0,0.14)", display: "flex", flexDirection: "column", zIndex: 500 }}>
      {/* Header */}
      <div style={{ background: plat.color, padding: "14px 18px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 10 }}>{plat.label}</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.15)", padding: "2px 8px", borderRadius: 10 }}>{theme.icon} {theme.label}</span>
              {item.day && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{item.month} {item.day}</span>}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{item.title}</div>
            {item.cta && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>→ {item.cta}</div>}
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>
      </div>

      {/* Status */}
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${C.linen}`, display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
        {STATUS.map(s => (
          <button key={s.key} onClick={() => onStatus(item.id, s.key)} style={{ padding: "4px 10px", border: `1px solid ${s.key === item.status ? s.border : C.linen}`, borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: "pointer", background: s.key === item.status ? s.bg : "transparent", color: s.key === item.status ? s.text : C.stone }}>{s.label}</button>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", padding: "14px 18px" }}>
        {item.hook && (
          <PanelSection label="Hook / Subject">
            <div style={{ background: C.purpleLt, borderLeft: `3px solid ${C.purple}`, padding: "10px 13px", borderRadius: "0 6px 6px 0", fontSize: 13, color: C.purple, fontWeight: 600, fontStyle: "italic", lineHeight: 1.5 }}>{item.hook}</div>
          </PanelSection>
        )}
        {item.script && (
          <PanelSection label="Script / Copy">
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: 12, color: C.ink, lineHeight: 1.7, whiteSpace: "pre-wrap", background: C.linen, padding: "11px 13px", borderRadius: 6 }}>{item.script}</pre>
          </PanelSection>
        )}
        {item.caption && (
          <PanelSection label="Caption">
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: 12, color: C.ink, lineHeight: 1.7, whiteSpace: "pre-wrap", background: C.linen, padding: "11px 13px", borderRadius: 6 }}>{item.caption}</pre>
          </PanelSection>
        )}
        {item.notes && (
          <PanelSection label="Notes & Reminders">
            <div style={{ fontSize: 12, color: C.mid, lineHeight: 1.7, background: "#FFFDF7", border: "1px solid #F0E8C0", borderRadius: 6, padding: "10px 13px" }}>{item.notes}</div>
          </PanelSection>
        )}
        {!item.hook && !item.script && !item.caption && !item.notes && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: C.stoneLt, fontSize: 13 }}>No copy added yet. Click Edit to add scripts and notes.</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: "12px 18px", borderTop: `1px solid ${C.linen}`, display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={onEdit} style={{ flex: 1, padding: "9px 0", background: C.purple, color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>✏️ Edit</button>
        {confirmDel
          ? <>
              <button onClick={() => onDelete(item.id)} style={{ flex: 1, padding: "9px 0", background: "#C0392B", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Confirm delete</button>
              <button onClick={() => setConfirmDel(false)} style={{ padding: "9px 13px", background: "transparent", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 13, color: C.stone, cursor: "pointer" }}>Cancel</button>
            </>
          : <button onClick={() => setConfirmDel(true)} style={{ padding: "9px 13px", background: "transparent", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 13, color: C.stone, cursor: "pointer" }}>🗑</button>
        }
      </div>
    </div>
  );
}
