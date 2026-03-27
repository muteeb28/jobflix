import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";

export default function EncryptedTextDemoSecond() {
  return (
    <p className="mx-auto max-w-lg py-10 text-left">
      <EncryptedText
        text="Welcome to the Matrix, Neo."
        encryptedClassName="text-neutral-500"
        revealedClassName="dark:text-neutral-900 text-black"
        revealDelayMs={50}
      />
    </p>
  );
}
