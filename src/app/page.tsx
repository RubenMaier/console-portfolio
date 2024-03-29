"use client";
import { useRef, useState } from "react";
import { ConsoleTitleBar } from "../components/ConsoleTitleBar";
import { ConsoleBody } from "../components/ConsoleBody";
import { CommandRan } from "../lib/interfaces/CommandRan";
import { ConsoleCommandInput } from "../components/ConsoleCommandInput";

const defaultConsoleMessage: CommandRan = {
  commandExecuted: "",
  actionShowed: {
    __html: `<span class="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2">Welcome to my portfolio!</span><br /> To display the available commands type <b class="text-neo-pink">help</b>. To validate each command press Enter.`,
  },
};

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [commandsRan, setCommandsRan] = useState<CommandRan[]>([
    defaultConsoleMessage,
  ]);
  const [guestName, setGuestName] = useState("guest");

  const enfocarInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center p-4">
      <div
        className="flex h-full w-full flex-col sm:h-3/4 sm:w-3/4 lg:h-1/2 lg:w-1/2"
        onClick={enfocarInput}
      >
        <ConsoleTitleBar />
        <ConsoleBody commandsRan={commandsRan} guestName={guestName} />
        <ConsoleCommandInput
          guestName={guestName}
          inputRef={inputRef}
          setCommandsRan={setCommandsRan}
          commandsRan={commandsRan}
          setGuestName={setGuestName}
        />
      </div>
    </main>
  );
}
