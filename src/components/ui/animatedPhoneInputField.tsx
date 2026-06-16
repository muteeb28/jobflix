'use client'

import React from "react"
import PhoneInput from "react-phone-number-input"
import type { E164Number } from "libphonenumber-js"
import "react-phone-number-input/style.css"
import { cn } from "@/lib/utils"
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

type PhoneNumberInputProps = {
  value?: E164Number
  onChange: (value?: E164Number) => void
  className?: string
} & Omit<React.ComponentProps<typeof PhoneInput>, "value" | "onChange">

export function AnimatedPhoneInputField({
  value,
  onChange,
  className,
  ...props
}: PhoneNumberInputProps) {

    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
  return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          #00B5A3,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
    <PhoneInput
      international
      defaultCountry="US"
      value={value}
      onChange={onChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </motion.div>
  )
}