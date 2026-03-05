import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPredictionHistory, HistoryResponse } from "@/utils/api";

interface PredictionLogProps {
  refreshTrigger: number;
}

const PredictionLog = ({ refreshTrigger }: PredictionLogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchPredictionHistory(page, limit)
        .then(setData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, page, refreshTrigger]);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Generate page numbers to show
    const getPageNumbers = () => {
      const pages = [];
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (page <= 3) {
          pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (page > totalPages - 3) {
          pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex items-center justify-center space-x-2 mt-4 font-body text-xs">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          &lt; Previous
        </button>

        {getPageNumbers().map((p, i) => (
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-muted-foreground">...</span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => handlePageChange(p as number)}
              className={`px-3 py-1.5 rounded-md border transition-colors ${page === p
                ? "border-primary text-primary bg-primary/10"
                : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          Next &gt;
        </button>
      </div>
    );
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-display text-sm tracking-widest uppercase text-foreground hover:text-primary transition-colors"
      >
        <span className="text-primary">{isOpen ? "▾" : "▸"}</span>
        Mission Log — Prediction History
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            {isLoading && !data ? (
              <div className="glass-card rounded-lg p-8 text-center text-primary font-body text-sm">
                Fetching archives...
              </div>
            ) : !data || data.data.length === 0 ? (
              <div className="glass-card rounded-lg p-8 text-center">
                <svg width="48" height="48" viewBox="0 0 36 36" className="mx-auto mb-3 text-muted-foreground/30">
                  <circle cx="18" cy="18" r="8" fill="currentColor" />
                  <ellipse cx="18" cy="18" rx="16" ry="6" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-20 18 18)" />
                </svg>
                <p className="font-body text-sm text-muted-foreground">
                  No predictions logged yet. Initiate your first analysis.
                </p>
              </div>
            ) : (
              <div className="glass-card rounded-lg p-4">
                <div className="overflow-x-auto">
                  <table className="w-full font-body text-xs">
                    <thead>
                      <tr className="bg-primary/10 border-b border-primary/20">
                        {["Timestamp", "Orbital Period", "Stellar Temp", "Disposition", "Pred. Radius", "Confidence"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-primary uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={isLoading ? "opacity-50" : ""}>
                      {data.data.map((entry, i) => {
                        // Attempt to parse the JS format datetime from Postgres, otherwise fallback
                        // Append 'Z' to naive UTC strings from backend so the browser knows it's UTC
                        const utcTimestamp = entry.timestamp ? (entry.timestamp.endsWith('Z') ? entry.timestamp : `${entry.timestamp}Z`) : '';
                        const parsedDate = new Date(utcTimestamp).toLocaleString();
                        const displayDate = parsedDate !== "Invalid Date" ? parsedDate : entry.timestamp;

                        return (
                          <tr key={i} className={`border-b border-border transition-all ${i % 2 === 0 ? "bg-accent/20" : ""}`}>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{displayDate}</td>
                            <td className="px-4 py-3 text-foreground">{entry.koi_period ?? "-"}</td>
                            <td className="px-4 py-3 text-foreground">{entry.st_teff ?? "-"}</td>
                            <td className="px-4 py-3">
                              <span className={entry.habitability_class === "Confirmed" ? "text-success" : "text-destructive"}>
                                {entry.habitability_class.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-secondary">{Number(entry.predicted_radius).toFixed(2)} R⊕</td>
                            <td className="px-4 py-3 text-primary">{(Number(entry.confidence) * 100).toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {renderPagination()}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PredictionLog;
