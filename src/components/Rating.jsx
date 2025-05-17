export default function Rating({ value, count }) {
  return (
    <div className="rating">
      <span>⭐ {value || "N/A"}/10</span>
      <span>({count ? count.toLocaleString() : "N/A"} votos)</span>
    </div>
  );
}
