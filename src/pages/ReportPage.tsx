import { FileText, Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const mockReports = [
  { id: "REP-2026-891", ulpin: "10052345001B02", status: "Approved", date: "2026-09-19", conflicts: 0 },
  { id: "REP-2026-892", ulpin: "10052345002001", status: "Rejected", date: "2026-09-19", conflicts: 2 },
  { id: "REP-2026-893", ulpin: "10052345003003", status: "Pending", date: "2026-09-18", conflicts: 1 },
];

export default function ReportPage() {
  const handleExport = () => {
    const csvContent = [
      ["Report ID", "Proposed ULPIN", "Date", "Conflicts", "Status"],
      ...mockReports.map(r => [r.id, r.ulpin, r.date, r.conflicts, r.status])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ulpin_master_ledger.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background/50 p-8 pb-24">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
              Compliance & Audit Reports
            </h1>
            <p className="mt-2 text-muted">
              Review 3D spatial collision reports and legal ULPIN registry ledgers.
            </p>
          </div>
          <button 
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            <Download className="h-4 w-4" />
            Export Master Ledger
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-panel p-6 shadow-sm">
            <p className="text-sm font-medium text-muted">Total 3D ULPINs Issued</p>
            <p className="mt-2 text-3xl font-bold text-foreground">14,208</p>
            <p className="mt-1 text-xs text-emerald-400">+12% from last month</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-panel p-6 shadow-sm">
            <p className="text-sm font-medium text-muted">Pending Cadastre Approvals</p>
            <p className="mt-2 text-3xl font-bold text-foreground">42</p>
            <p className="mt-1 text-xs text-amber-400">Requires manual review</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-panel p-6 shadow-sm">
            <p className="text-sm font-medium text-muted">Detected Spatial Conflicts</p>
            <p className="mt-2 text-3xl font-bold text-foreground">3</p>
            <p className="mt-1 text-xs text-rose-400">Action required</p>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="overflow-hidden rounded-xl border border-white/5 bg-panel shadow-sm">
          <div className="border-b border-white/5 px-6 py-4">
            <h3 className="font-semibold text-foreground">Recent Spatial Audits</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted">
              <thead className="border-b border-white/5 bg-white/5 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Report ID</th>
                  <th className="px-6 py-4 font-medium">Proposed ULPIN</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Conflicts</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mockReports.map((report) => (
                  <tr key={report.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-medium text-foreground">{report.id}</td>
                    <td className="px-6 py-4 font-mono">{report.ulpin}</td>
                    <td className="px-6 py-4">{report.date}</td>
                    <td className="px-6 py-4">
                      {report.conflicts === 0 ? (
                        <span className="text-emerald-400">None</span>
                      ) : (
                        <span className="text-rose-400">{report.conflicts} Detected</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {report.status === "Approved" && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                        {report.status === "Rejected" && <XCircle className="h-4 w-4 text-rose-400" />}
                        {report.status === "Pending" && <AlertTriangle className="h-4 w-4 text-amber-400" />}
                        <span
                          className={`font-medium ${
                            report.status === "Approved" ? "text-emerald-400" :
                            report.status === "Rejected" ? "text-rose-400" : "text-amber-400"
                          }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => alert(`Connecting to backend to generate PDF for ${report.id}...\n\n(Mock Mode: PDF generation is bypassed)`)}
                        className="inline-flex items-center gap-1 rounded text-xs font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        <FileText className="h-4 w-4" />
                        View PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
