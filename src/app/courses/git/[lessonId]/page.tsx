import GitLessonView from "@/components/GitLessonView";
import { gitLessonsData } from "@/data/gitLessons";

export default async function GitLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = await params;

    // Try to get the lesson data
    const lessonData = gitLessonsData[lessonId];

    if (!lessonData) {
        // Fallback for lessons not yet in the data
        const fallbackData = {
            title: "Git Lesson",
            description: "This Git lesson content is being prepared. Please check back soon for comprehensive content on this topic.",
            task: "Practice the concepts in the terminal on the right.",
            hint: "Use 'git status' to see the current state of your repository."
        };

        return (
            <GitLessonView
                lessonId={lessonId}
                title={fallbackData.title}
                description={fallbackData.description}
                task={fallbackData.task}
                hint={fallbackData.hint}
            />
        );
    }

    return (
        <GitLessonView
            lessonId={lessonId}
            title={lessonData.title}
            description={lessonData.description}
            task={lessonData.task}
            hint={lessonData.hint}
        />
    );
}
