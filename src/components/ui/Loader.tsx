import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: number | string;
}

export default function Loader({ className, size = 54 }: LoaderProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  
  return (
    <div className={cn("loader", className)} style={{ width: sizeValue, height: sizeValue }}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
        <div className="bar10"></div>
        <div className="bar11"></div>
        <div className="bar12"></div>
    </div>
  );
}

export function FullPageLoader({ message = "Loading Workspace..." }: { message?: string }) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <Loader />
        <p className="text-navy text-[10px] font-black animate-pulse uppercase tracking-[0.3em]">{message}</p>
      </div>
    </div>
  );
}
