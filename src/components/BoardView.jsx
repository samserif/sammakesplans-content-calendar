import { C, STATUS, platByKey, themeByKey } from "../data/constants";

export default function BoardView({ items, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
      {STATUS.map(col => {
        const colItems = items.filter(i => i.status === col.key);
        return (
          <div key={col.key}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: col.text }}>{col.label}</span>
              <span style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}`, borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{colItems.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {colItems.map(item => {
                const plat = platByKey(item.platform);
                const theme = themeByKey(item.theme);
                return (
                  <button key={item.id} onClick={() => onSelect(item)} style={{ textAlign: "left", background: C.white, border: `1px solid ${C.linen}`, borderRadius: 8, padding: "9px 11px", cursor: "pointer", borderTop: `3px solid ${plat.color}` }}>
                    <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: plat.color }}>{plat.short}</span>
                      <span style={{ fontSize: 10, color: theme.color }}>{theme.icon}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.ink, lineHeight: 1.3, marginBottom: 3 }}>{item.title}</div>
                    {item.day && <div style={{ fontSize: 10, color: C.stone }}>{item.month} {item.day}</div>}
                  </button>
                );
              })}
              {colItems.length === 0 && (
                <div style={{ padding: 14, textAlign: "center", color: C.stoneLt, fontSize: 12, border: `1px dashed ${C.stoneLt}`, borderRadius: 8 }}>Empty</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
