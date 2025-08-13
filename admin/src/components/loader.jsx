import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-500/50">
      <LoaderCircle className="animate-spin text-white" size={40} />
    </div>
  );
}
