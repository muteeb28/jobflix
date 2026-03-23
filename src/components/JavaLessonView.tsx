"use client";

import type { ComponentProps } from "react";
import JSLessonView from "@/components/JSLessonView";

type JavaLessonViewProps = ComponentProps<typeof JSLessonView>;

const parseJavaExpression = (expression: string) => {
    const parts = expression.split(/\s*\+\s*/);
    return parts.map((part) => {
        const trimmed = part.trim();
        if (
            (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
            (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ) {
            return trimmed.slice(1, -1);
        }
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
            return trimmed;
        }
        if (trimmed === "true" || trimmed === "false") {
            return trimmed;
        }
        return trimmed;
    }).join("");
};

// Minimal Java output parser for simple System.out.print/println examples.
const runJavaCode = (source: string) => {
    const outputs: string[] = [];
    const printRegex = /System\.out\.print(?:ln)?\s*\((.*?)\)\s*;?/;

    for (const rawLine of source.split(/\r?\n/)) {
        const line = rawLine.trim();
        const match = printRegex.exec(line);
        if (!match) {
            continue;
        }
        const expression = match[1]?.trim() ?? "";
        outputs.push(expression.length === 0 ? "" : parseJavaExpression(expression));
    }

    return { output: outputs };
};

export default function JavaLessonView(props: JavaLessonViewProps) {
    return (
        <JSLessonView
            {...props}
            backHref={props.backHref ?? "/courses/java-backend"}
            backLabel={props.backLabel ?? "Back To Course Detail"}
            defaultFileName={props.defaultFileName ?? "Main.java"}
            editorPlaceholder={props.editorPlaceholder ?? "// Write your Java code here..."}
            runner={props.runner ?? runJavaCode}
        />
    );
}
