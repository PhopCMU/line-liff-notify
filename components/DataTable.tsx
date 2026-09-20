type Row = { label: string; value: React.ReactNode; highlight?: boolean };

export default function DataTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.label}
              className={`border-b last:border-0 ${r.highlight ? "bg-amber-50" : ""}`}
            >
              <td className="w-2/5 p-3 align-top text-gray-600">{r.label}</td>
              <td
                className={`p-3 break-all ${r.highlight ? "font-mono text-xs font-bold" : ""}`}
              >
                {r.value ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
