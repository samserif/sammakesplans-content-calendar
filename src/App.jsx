import { useState, useEffect, useRef } from "react";
import { C, STATUS, PLATFORMS, THEMES } from "./data/constants";
import { SEED } from "./data/seed";
import storage from "./hooks/useStorage";
import CalendarView from "./components/CalendarView";
import BoardView from "./components/BoardView";
import DetailPanel from "./components/DetailPanel";
import EditModal from "./components/EditModal";

const STORAGE_KEY = "sp_v3";

let nextId = 5000;
const uid = () => `u${++nextId}`;

export default function App() {
  const [items, setItems]       = useState(SEED);
  const [loaded, setLoaded]     = useState(false);
  const [month, setMonth]       = useState("June");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing]   = useState(null);
  const [adding, setAdding]     = useState(false);
  const [view, setView]         = useState("calendar");
  const [filterPlat, setFilterPlat]   = useState("all");
  const [filterTheme, setFilterTheme] = useState("all");
  const [toast, setToast]       = useState(null);
  const saveRef = useRef(null);

  // Load from storage on mount
  useEffect(() => {
    const saved = storage.get(STORAGE_KEY);
    if (saved?.value) {
      try { setItems(JSON.parse(saved.value)); } catch { /* corrupted — fall back to seed */ }
    }
    setLoaded(true);
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    if (!loaded) return;
    clearTimeout(saveRef.current);
    saveRef.current = setTimeout(() => {
      storage.set(STORAGE_KEY, JSON.stringify(items));
      showToast("Saved ✓");
    }, 800);
  }, [items, loaded]);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const updateStatus = (id, s) => {
    setItems(p => p.map(i => i.id === id ? { ...i, status: s } : i));
    setSelected(p => p?.id === id ? { ...p, status: s } : p);
  };

  const saveItem = patch => {
    if (!patch.id) { setItems(p => [...p, { ...patch, id: uid() }]); }
    else { setItems(p => p.map(i => i.id === patch.id ? patch : i)); }
    if (selected?.id === patch.id) setSelected(patch);
    setEditing(null);
    setAdding(false);
  };

  const deleteItem = id => { setItems(p => p.filter(i => i.id !== id)); setSelected(null); };

  const visibleItems = items.filter(i => {
    if (i.month !== month) return false;
    if (filterPlat !== "all" && i.platform !== filterPlat) return false;
    if (filterTheme !== "all" && i.theme !== filterTheme) return false;
    return true;
  });

  const statCounts = STATUS.map(s => ({ ...s, n: items.filter(i => i.month === month && i.status === s.key).length }));

  return (
    <div style={{ fontFamily: "'Inter',-apple-system,sans-serif", background: C.linen, minHeight: "100vh", display: "flex", flexDirection: "column", color: C.ink }}>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, right: 20, background: C.purple, color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 12, zIndex: 9999, boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>{toast}</div>
      )}

      {/* Header */}
      <div style={{ background: C.purple, padding: "14px 20px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.lavender, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 2 }}>Content Tracker</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Samantha Provenza</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>Travel Designer · June – August 2025</div>
          </div>
          <div style={{ display: "flex", gap: 18, paddingBottom: 2 }}>
            {statCounts.map(s => (
              <div key={s.key} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#fff" }}>{s.n}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[["calendar", "📅 Calendar"], ["board", "📋 Board"]].map(([v, l]) => (
            <button key={v} onClick={() => setView(v)} style={{ padding: "7px 14px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, borderRadius: "6px 6px 0 0", background: view === v ? C.white : "transparent", color: view === v ? C.purple : "rgba(255,255,255,0.7)" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.linen}`, padding: "10px 20px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["June", "July", "August"].map(m => (
            <button key={m} onClick={() => setMonth(m)} style={{ padding: "5px 13px", border: `1px solid ${month === m ? C.purple : C.linen}`, borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", background: month === m ? C.purple : "transparent", color: month === m ? "#fff" : C.mid }}>{m}</button>
          ))}
        </div>

        <select value={filterPlat} onChange={e => setFilterPlat(e.target.value)} style={{ padding: "5px 10px", border: `1px solid ${C.linen}`, borderRadius: 6, fontSize: 12, color: C.ink, background: C.white }}>
          <option value="all">All platforms</option>
          {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
        </select>

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          <button onClick={() => setFilterTheme("all")} style={{ padding: "3px 10px", border: `1px solid ${filterTheme === "all" ? C.ink : C.linen}`, borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: "pointer", background: filterTheme === "all" ? C.ink : "transparent", color: filterTheme === "all" ? "#fff" : C.mid }}>All</button>
          {THEMES.map(t => (
            <button key={t.key} onClick={() => setFilterTheme(filterTheme === t.key ? "all" : t.key)} style={{ padding: "3px 10px", border: `1px solid ${filterTheme === t.key ? t.color : C.linen}`, borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: "pointer", background: filterTheme === t.key ? t.color : "transparent", color: filterTheme === t.key ? "#fff" : C.mid, whiteSpace: "nowrap" }}>{t.icon} {t.label}</button>
          ))}
        </div>

        <button onClick={() => setAdding(true)} style={{ marginLeft: "auto", padding: "6px 14px", background: C.purple, color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add</button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", padding: "16px 20px" }}>
        {view === "calendar"
          ? <CalendarView month={month} items={visibleItems} onSelect={setSelected} />
          : <BoardView items={visibleItems} onSelect={setSelected} onStatus={updateStatus} />
        }
      </div>

      {selected && <DetailPanel item={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onEdit={() => setEditing({ ...selected })} onDelete={deleteItem} />}
      {editing && <EditModal item={editing} onSave={saveItem} onClose={() => setEditing(null)} />}
      {adding && <EditModal item={{ id: "", month, day: 1, platform: "ig-reel", status: "idea", theme: "advising", title: "", cta: "", hook: "", script: "", caption: "", notes: "" }} onSave={saveItem} onClose={() => setAdding(false)} isNew />}
    </div>
  );
}
