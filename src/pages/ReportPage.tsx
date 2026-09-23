import { FileText, Download, CheckCircle, MapPin, Building2, Ruler } from "lucide-react";

export default function ReportPage() {
  const handleExport = () => {
    const csvContent = "Field,Value\nULPIN,MH0713004217X9.A.07.012.K\nDate,2026-09-19\nStatus,Approved\nCoordinates,28.6139 N; 77.2090 E\nTotal Floors,5\nDetected Conflicts,None";
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "cadastral_report_MH0713004217X9A07012K.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePdf = () => {
    alert("Connecting to backend to generate certified PDF for ULPIN MH0713004217X9.A.07.012.K...");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background/50 p-6 sm:p-8 pb-24">
      <div className="mx-auto max-w-3xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Individual Cadastral Report
            </h1>
            <p className="mt-2 text-sm text-muted">
              Spatial audit and compliance summary for the analyzed property.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-surface-alt focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <Download className="h-4 w-4" />
              CSV
            </button>
            <button 
              onClick={handlePdf}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <FileText className="h-4 w-4" />
              Generate Certified PDF
            </button>
          </div>
        </div>

        {/* Report Card */}
        <div className="overflow-hidden rounded-xl border border-white/5 bg-panel shadow-sm">
          <div className="border-b border-white/5 bg-white/[0.02] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Proposed ULPIN</p>
                <p className="mt-1 font-mono text-2xl font-bold text-foreground">MH0713004217X9.A.07.012.K</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Approved</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2">
            <div className="bg-panel p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Geospatial Bounds</p>
                  <p className="mt-0.5 font-mono text-sm text-foreground">28.6139° N, 77.2090° E</p>
                </div>
              </div>
            </div>
            <div className="bg-panel p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Structure Type</p>
                  <p className="mt-0.5 text-sm text-foreground">G+4 Residential Complex</p>
                </div>
              </div>
            </div>
            <div className="bg-panel p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Spatial Conflicts</p>
                  <p className="mt-0.5 text-sm text-foreground">0 intersections detected</p>
                </div>
              </div>
            </div>
            <div className="bg-panel p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Ruler className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Z-Index Elevation</p>
                  <p className="mt-0.5 font-mono text-sm text-foreground">215.4m AMSL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 p-6">
            <h3 className="text-sm font-semibold text-foreground">Compliance Statement</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The submitted 3D architectural blueprint and its generated volumetric geometry have been verified against the master cadastral database. 
              The spatial boundaries fall strictly within the allocated 2D parcel polygon, and the Z-index bounds do not intersect with any registered 
              overhead structures, neighboring cantilever limits, or underground infrastructure (tunnels/pipes). The ULPIN is clear for permanent legal issuance.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
