export function PopularBlockSkeleton() {
  return (
    <div className="w-full grid grid-cols-5 gap-x-4">
      {[0, 1, 2, 3, 4].map((_, index) => (
        <div key={"skeleton" + index} className="gradient rounded-3xl" />
      ))}
    </div>
  );
}
