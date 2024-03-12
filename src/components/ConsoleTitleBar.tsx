"use client";

export function ConsoleTitleBar() {
  return (
    <div className="flex items-center rounded-t-xl bg-slate-500 p-2">
      <div className="flex">
        <div className="ml-3 h-3 w-3 rounded-full bg-red-400"></div>
        <div className="ml-2 h-3 w-3 rounded-full bg-yellow-400"></div>
        <div className="ml-2 h-3 w-3 rounded-full bg-green-400"></div>
      </div>
      <p className="flex-1 text-center">rubenmaierenzler@desktop</p>
    </div>
  );
}
