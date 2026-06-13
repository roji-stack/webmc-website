export function StatusBadge({ status }) {
  const styles = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    paused: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const labels = {
    active: "Active",
    completed: "Completed",
    paused: "Paused",
  };

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-none border capitalize ${styles[status] || styles.active}`}>
      {labels[status] || status}
    </span>
  );
}
