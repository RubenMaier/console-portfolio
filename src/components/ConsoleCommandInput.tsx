"use client";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CommandRan } from "../lib/interfaces/CommandRan";

export function ConsoleCommandInput({
  guestName,
  inputRef,
  setCommandsRan,
  commandsRan,
  setGuestName,
}: {
  guestName: string;
  inputRef: RefObject<HTMLInputElement>;
  setCommandsRan: Dispatch<SetStateAction<CommandRan[]>>;
  commandsRan: CommandRan[];
  setGuestName: Dispatch<SetStateAction<string>>;
}) {
  const [showCursor, setShowCursor] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [commandValueInserted, setCommandValueInserted] = useState("");
  const [commandsHistory, addCommandInHistory] = useState<string[]>([]);
  const [consoleCommandSeek, setConsoleCommandSeek] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((currentShowCursor) => !currentShowCursor);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  function sendCommand(e: any) {
    if (e.key === "Enter") {
      if (commandValueInserted) {
        const actualCommand: CommandRan = {
          commandExecuted: commandValueInserted,
          actionShowed: printCommand(commandValueInserted),
        };
        addCommandInHistory([...commandsHistory, commandValueInserted]);
        setCommandsRan([...commandsRan, actualCommand]);
        handleCommand(commandValueInserted);
        setCommandValueInserted("");
      }
    } else if (e.key === "ArrowUp") {
      if (commandsHistory) {
        const seekValue =
          consoleCommandSeek === commandsHistory.length
            ? consoleCommandSeek
            : consoleCommandSeek + 1;
        setConsoleCommandSeek(seekValue);
        setCommandValueInserted(
          commandsHistory[commandsHistory.length - seekValue],
        );
        console.log(
          consoleCommandSeek,
          commandsHistory.length,
          seekValue,
          commandsHistory.length - seekValue,
          commandsHistory[commandsHistory.length - seekValue],
        );
      }
    } else if (e.key === "ArrowDown") {
      if (commandsHistory && consoleCommandSeek > 0) {
        const seekValue = consoleCommandSeek - 1;
        setConsoleCommandSeek(seekValue);
        setCommandValueInserted(
          commandsHistory[commandsHistory.length - seekValue - 1],
        );
      } else if (consoleCommandSeek === 0) {
        setCommandValueInserted("");
      }
    }
  }

  function printCommand(commandValueInserted: string) {
    if (commandValueInserted === "help") {
      return {
        __html: `
      <ui>
        <li>
          <b class="text-neo-pink">clear</b>: Clean the terminal
        </li>
        <li>
          <b class="text-neo-pink">help</b>: Displays the list of commands
        </li>
        <li>
          <b class="text-neo-pink">login</b> [your-name]: Use the console with your name
        </li>
        <li>
          <b class="text-neo-pink">see profile</b>: Display information about me
        </li>
        <li>
          <b class="text-neo-pink">see experiences</b>: Display a list of my expriences
        </li>
        <li>
          <b class="text-neo-pink">see hobbies</b>: Display a list of my hobbies
        </li>
        <li>
          <b class="text-neo-pink">open linkedin</b>: Link to my Linkedin
        </li>
        <li>
          <b class="text-neo-pink">open github</b>: Link to my Github
        </li>
        <li>
          You can find the old command with the up and down arrows
        </li>
      </ui>`,
      };
    }
    const firstCommand = commandValueInserted.split(" ");
    if (firstCommand[0] && firstCommand[0] === "see") {
      if (firstCommand[1] === "profile") {
        return {
          __html: `<pre><code id="jsonPretty" class="text-xs lg:text-sm overflow-auto">{
    "fullname": "Ruben Maier Enzler",
    "age": "${Math.floor((new Date().getTime() - new Date("1994-11-13").getTime()) / (365.25 * 24 * 60 * 60 * 1000))}",
    "formation": "Information Systems Engineering",
    "languages" : "js, ts, css, tailwind, html, python, c#, c, bash, java, sql"
    "databases": "mysql, postgresql, sqlite, mongodb, elasticsearch, algolia, neo4j",
    "framework" : "nest, express, next, reactm  django",
    "tools": "git, aws, azure, gcp, vercel, heroku, figma",
    "softSkills": "business strategy, product definitions, agile method, teamwork",
    "favoriteIDE": "vim, vsc",
    "favoriteTerm": "warp",
    "city" : "Bs As, Argentina",
    "yearsWorkingFormally": "${Math.floor((new Date().getTime() - new Date("2016-01-01").getTime()) / (365.25 * 24 * 60 * 60 * 1000))}",
    "yearsDeveloping": "${Math.floor((new Date().getTime() - new Date("2010-05-05").getTime()) / (365.25 * 24 * 60 * 60 * 1000))}"
}</code></pre>
        `,
        };
      }
      if (firstCommand[1] === "hobbies") {
        return {
          __html: `<pre><code id="jsonPretty" class="text-xs lg:text-sm overflow-auto">{
    "tech" : "3D Print, Arduino, Raspberry Pi",
    "crafts": "Carpentry, Smithy",
    "learns": "Design, Marketing, Entrepreneurship, Investments",
    "sport": "Crossfit, Tactical shooting training, MMA, Shaolin Kung Fu, Swimming",
    "architecture": "Japandi, Mid Century, Minimalism",
    "life" : "Trekking, Home Food, Orchard, Vikings"
}</code></pre>
        `,
        };
      }
      if (firstCommand[1] === "experiences") {
        return {
          __html: `<ui>
          <li>
            <span class="text-neo-blue">oct 2020 - current</span> -> <b class="text-neo-pink"><a href="https://rebill.com" target="_blank" style="text-decoration: none; color: inherit;">Rebill</a></b> -> I started at Rebill as a frontend engineer when there were just four of us in the company. Shortly after, I took full ownership of the product. A year after I joined, we made it into Y Combinator, and I was promoted to Head of Tech. I hired a team, designed, planned, and conceived the entire product as it is today. By the end of 2023, I joined the founding team, though I had always been there, doing whatever was necessary for us to excel.
          </li>
          <li>
          <span class="text-neo-blue">Jun 2020 - Oct 2020</span> -> <b class="text-neo-pink"><a href="https://exomindset.co/en" target="_blank" style="text-decoration: none; color: inherit;">ExoMindset</a></b> -> For Walmart, I developed a web scraping tool that enabled competitive product comparison and pricing strategies. In a separate project for the Municipality of Cordoba, Argentina, I spearheaded the modernization of their licensing systems, transitioning them from outdated applications to a streamlined web-based solution. Throughout both projects, my focus on quality, efficiency, and direct communication with teams and clients ensured successful outcomes.
          </li>
          <li>
          <span class="text-neo-blue">Nov 2016 - Oct 2017</span> -> I established and managed my own software development studio, specializing in custom solutions and forum personalization for platforms like WordPress, Joomla, and phpBB. I expanded into 3D modeling, using Blender and Autodesk 3ds Max for game modifications, and collaborated on algorithm implementation in Unity using C#. Additionally, I provided support for C++ and Python libraries, enhancing my technical expertise and meeting unique client needs.
          </li>
          <li>
          <span class="text-neo-blue">Jan 2016 - Feb 2017</span> -> As a gaming community consultant, I improved community engagement and brand visibility through targeted SEO strategies and impactful collateral created with Adobe Photoshop and Illustrator. I also developed and optimized commercial websites, contributing significantly to the growth and online presence of communities.
          </li>
        </ui>`,
        };
      }
      return { __html: `Invalid argument.</p>` };
    }
    if (firstCommand[0] && firstCommand[0] === "login") {
      if (firstCommand[1]) {
        return { __html: `<p>Welcome ${firstCommand[1]}!</p>` };
      }
      return { __html: `<p>login [your-name]: Add your name to login.</p>\n` };
    }
    if (firstCommand[0] && firstCommand[0] === "open") {
      if (firstCommand[1] === "linkedin") {
        return {
          __html:
            "<p>Thank you for visiting my Linkedin, I hope link soon!</p>",
        };
      }
      if (firstCommand[1] === "github") {
        return {
          __html:
            "<p>Thank you for visiting my Github, I hope help you soon!</p>",
        };
      }
      return { __html: `Invalid argument.</p>` };
    }
    return {
      __html: `
      <p>${commandValueInserted}: command not found</p>\n
      <p>Type the command <b class="text-neo-pink">help</b> to display hte list of avaiable commands.</p>`,
    };
  }

  function handleCommand(commandValueInserted: string) {
    if (commandValueInserted === "clear") {
      setCommandsRan([]);
    }
    const firstCommand = commandValueInserted.split(" ");
    if (firstCommand[0] && firstCommand[0] === "login" && firstCommand[1]) {
      setGuestName(firstCommand[1]);
    }
    if (firstCommand[0] && firstCommand[0] === "open") {
      if (firstCommand[1] === "linkedin") {
        window.open("https://www.linkedin.com/in/rubenmaierenzler", "_blank");
      }
      if (firstCommand[1] === "github") {
        window.open("https://github.com/RubenMaier", "_blank");
      }
    }
  }

  return (
    <div className="flex">
      <div className="flex-none rounded-bl-xl bg-slate-900 p-2">
        <p className="pl-5">&gt; {guestName}: ~/rub/portfolio:</p>
      </div>
      <div className="w-full rounded-br-xl bg-slate-800 p-2">
        <input
          ref={inputRef}
          type="text"
          className="w-full border-none bg-transparent outline-none"
          value={
            !isFocused && !commandValueInserted
              ? showCursor
                ? "|"
                : ""
              : commandValueInserted
          }
          onChange={(e) => setCommandValueInserted(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setConsoleCommandSeek(0);
          }}
          onKeyDown={(e) => sendCommand(e)}
        />
      </div>
    </div>
  );
}
