"use client";

import { useState } from "react";

type SendingState = "default" | "sending" | "success" | "error";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SendingState>("default");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setState("sending");

      const resp = await fetch("https://www.michalrodek.cz/api/mailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: email,
          message: message,
        }),
      });

      if (resp.ok) {
        setState("success");
      } else {
        throw new Error();
      }
    } catch (error) {
      setState("error");
    }
  }

  let buttonClassName =
    "text-slate-100 bg-slate-800 hover:bg-slate-700 dark:text-slate-800";
  let buttonText = "";

  switch (state) {
    case "sending":
      buttonClassName += " dark:bg-slate-500";
      buttonText = "SENDING...";
      break;
    case "success":
      buttonClassName += " dark:bg-green-300";
      buttonText = "SENT";
      break;
    case "error":
      buttonClassName += " dark:bg-red-300";
      buttonText = "ERROR";
      break;
    default:
      buttonClassName += " dark:bg-slate-300 dark:hover:bg-slate-400";
      buttonText = "SEND";
      break;
  }

  return (
    <div className="flex flex-col items-center gap-8 text-slate-800 dark:text-slate-200">
      <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
        Send me a Message
      </h1>
      <form
        className="flex flex-col flex-auto rounded-xl gap-4 md:bg-slate-50 md:dark:bg-slate-700 md:p-12 md:min-w-[30rem]"
        onSubmit={handleSubmit}
      >
        <label className="font-bold text-sm" htmlFor="email">
          EMAIL
        </label>
        <input
          className="rounded-xl p-4 w-full mb-4 bg-slate-200 dark:bg-slate-500 dark:text-slate-200"
          id="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <label className="font-bold text-sm" htmlFor="message">
          MESSAGE
        </label>
        <textarea
          className="rounded-xl p-4 mb-4 w-full h-full resize-none bg-slate-200 dark:bg-slate-500 dark:text-slate-200"
          id="message"
          onChange={(e) => setMessage(e.currentTarget.value)}
          required
        />
        <button
          className={`font-bold p-4 rounded-xl w-full ${buttonClassName} transition`}
          disabled={state === "sending"}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
