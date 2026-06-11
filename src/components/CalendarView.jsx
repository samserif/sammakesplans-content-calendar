import { C, DOW, MONTH_CFG, platByKey, themeByKey, statusByKey } from "../data/constants";

function DayChip({ item, onClick }) {
  const plat = platByKey(item.platform);
  const theme = themeByKey(item.theme);
  const st = statusByKey(item.status);
  return (
    <button
      onClick={onClick}
      title={item.title}
      style={{
        width: "100%", textAlign: "left", padding: "3px 4px 3px 6px",
        borderRadius: 4, border: "none", background: `${plat.color}12`,
        cursor: "pointer", borderLeft: `3px solid ${plat.color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
        <span style={{ fontSize: 8, fontWeight: 700, color: plat.color, lineHeight: 1 }}>{plat.short}</span>
        <span style={{ fontSize: 8, color: theme.color }}>{theme.icon}</span>
      </div>
      <div style={{ fontSize: 10, color: C.ink, lineHeight: 1.2, fontWeight: 500, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.title}</div>
      <div style={{ fontSize: 8, color: st.text, marginTop: 1, lineHeight: 1 }}>{st.label}</div>
    </button>
  );
}

export default function CalendarView({ month, items, onSelect }) {
  const cfg = MONTH_CFG.find(m => m.name === month);
  if (!cfg) return null;

  const cells = [];
  for (let i = 0; i < cfg.start; i++) cells.push(null);
  for (let d = 1; d <= cfg.days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const byDay = {};
  items.forEach(item => {
    if (!byDay[item.day]) byDay[item.day] = [];
    byDay[item.day].push(item);
  });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: C.stone, padding: "4px 0", letterSpacing: "0.06em" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} style={{ minHeight: 110, background: "rgba(255,255,255,0.25)", borderRadius: 8, border: "1px solid transparent" }} />;
          const dayItems = byDay[day] || [];
          return (
            <div key={day} style={{ minHeight: 110, background: C.white, borderRadius: 8, border: `1px solid ${dayItems.length ? C.linen : "transparent"}`, padding: "6px 5px 4px", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: dayItems.length ? C.purple : C.stoneLt, marginBottom: 3, paddingLeft: 1 }}>{day}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                {dayItems.map(item => <DayChip key={item.id} item={item} onClick={() => onSelect(item)} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
