import JSLessonView from "@/components/JSLessonView";
import { masterGitGithubCourse } from "@/data/courses/master-git-github";

export default async function MasterGitGithubLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = await params;
    const sectionId = "github-part-1";

    const section = masterGitGithubCourse.sections.find((entry) => entry.id === sectionId);
    const lessons = section?.lessons ?? [];
    const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
    const lesson = lessonIndex >= 0 ? lessons[lessonIndex] : null;
    const nextLesson = lessonIndex >= 0 ? lessons[lessonIndex + 1] : undefined;
    const lessonNumber = lessonIndex >= 0 ? lessonIndex + 1 : undefined;

    if (!lesson) {
        const fallbackData = {
            title: "GitHub (Part 1)",
            topics: [
                {
                    title: "Content coming soon",
                    contentBlocks: [
                        { type: "p", text: "TODO: Replace with provided GitHub (Part 1) content." }
                    ],
                    code: {
                        defaultFileName: "main.js",
                        starterCode: "// TODO: Replace with provided GitHub (Part 1) starter code."
                    }
                }
            ],
            task: "TODO: Replace with provided GitHub (Part 1) task.",
            hint: "TODO: Replace with provided GitHub (Part 1) hint.",
            defaultCode: {
                defaultFileName: "main.js",
                starterCode: "// TODO: Replace with provided GitHub (Part 1) starter code."
            }
        };

        return (
            <JSLessonView
                lessonId={lessonId}
                lessonNumber={lessonNumber}
                title={fallbackData.title}
                subtopics={fallbackData.topics}
                task={fallbackData.task}
                hint={fallbackData.hint}
                initialCode={fallbackData.defaultCode.starterCode}
                defaultFileName={fallbackData.defaultCode.defaultFileName}
                backHref="/courses/master-git-github"
                backLabel="Back To Course Detail"
            />
        );
    }

    const defaultCode = lesson.defaultCode?.starterCode || lesson.topics[0]?.code?.starterCode || "";
    const defaultFileName = lesson.defaultCode?.defaultFileName || lesson.topics[0]?.code?.defaultFileName || "main.js";
    const nextLessonHref = nextLesson ? `/courses/master-git-github/${sectionId}/${nextLesson.id}` : undefined;

    return (
        <JSLessonView
            lessonId={lessonId}
            lessonNumber={lessonNumber}
            title={lesson.title}
            subtopics={lesson.topics}
            task={lesson.task || ""}
            hint={lesson.hint || ""}
            initialCode={defaultCode}
            defaultFileName={defaultFileName}
            backHref="/courses/master-git-github"
            backLabel="Back To Course Detail"
            progressId={lesson.progressId}
            nextLessonHref={nextLessonHref}
        />
    );
}
