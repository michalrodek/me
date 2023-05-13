"use client";

import { ImageProps } from "@/app/ui-design/page";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

interface CardProps {
  card: ImageProps;
}

export default function Card(props: CardProps) {
  const [zoom, setZoom] = useState(false);

  function handleClick() {
    setZoom(true);
  }

  return (
    <>
      <motion.div
        className="border-8 text-slate-800 border-slate-50 bg-slate-50 dark:text-stone-200 dark:border-slate-600 dark:bg-slate-600 rounded-2xl"
        whileHover={{ cursor: "pointer", scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <Image
          src={`https://api.michalrodek.cz/images/${props.card.img}.png`}
          className="rounded-xl w-full"
          alt={props.card.name}
          width={400}
          height={400}
        />

        <div className="flex justify-center py-4 font-bold">
          {props.card.name}
        </div>
      </motion.div>
      {zoom &&
        createPortal(
          <motion.div
            onClick={() => setZoom(false)}
            className="fixed inset-0 w-full h-full opacity-0 flex"
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: 1 }}
          >
            <Image
              src={`https://api.michalrodek.cz/images/${props.card.img}.png`}
              className="max-w-[90%] max-h-[90%] object-contain m-auto"
              alt={props.card.name}
              width={1600}
              height={1200}
            />
          </motion.div>,
          document.body
        )}
    </>
  );
}
