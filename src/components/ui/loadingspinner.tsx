export default function LoadingSpinner() {
  return (
    <div className="flex gap-3 align-middle justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-slate-500 dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(,0,0,0)]"></span>
      </div>
      <span>Thinking, Please wait ...</span>
    </div>
  );
}
