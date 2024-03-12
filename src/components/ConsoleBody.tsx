"use client";
import { useEffect, useRef } from "react";
import { CommandRan } from "@/lib/interfaces/CommandRan";

export function ConsoleBody({
  commandsRan,
  guestName,
}: {
  commandsRan: CommandRan[];
  guestName: string;
}) {
  const scrollRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commandsRan]);

  return (
    <div
      className=" h-full flex-col overflow-y-auto bg-slate-600 p-4 lg:h-[500px]"
      ref={scrollRef}
    >
      {commandsRan?.map((h, index) => (
        <div key={index} className="h-max">
          {h.commandExecuted ? (
            <>
              <p className="mb-2">
                <b className="text-slate-300">{guestName}: ~/rub/portfolio:</b>{" "}
                {h.commandExecuted}
              </p>
              <div
                className="mb-8 ml-8"
                dangerouslySetInnerHTML={h.actionShowed}
              ></div>
            </>
          ) : (
            <div
              className="mb-8 overflow-x-auto"
              dangerouslySetInnerHTML={h.actionShowed}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
