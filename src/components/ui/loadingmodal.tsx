import LoadingSpinner from "./loadingspinner";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="relative transforom overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all p-5 flex gap-3 align-middle">
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
}
