import JSLessonView from "@/components/JSLessonView";
import { jsLessonsData } from "@/data/jsLessons";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const parsedLessonId = Number.parseInt(lessonId, 10);
  const lessonNumber = Number.isFinite(parsedLessonId) ? parsedLessonId - 200 : undefined;

  // Get lesson data directly from jsLessons
  const lessonData = jsLessonsData[lessonId];

  if (!lessonData) {
    // Fallback for lessons not yet in the data
    const fallbackData = {
      title: "JavaScript Lesson",
      subtopics: [
        {
          title: "Under Construction",
          content: "Content for this lesson is coming soon! Please check back later."
        }
      ],
      task: "This lesson is under construction.",
      hint: "Stay tuned for updates.",
      initialCode: `console.log("Coming Soon...");`
    };

    return (
      <JSLessonView
        lessonId={lessonId}
        lessonNumber={lessonNumber}
        title={fallbackData.title}
        subtopics={fallbackData.subtopics}
        task={fallbackData.task}
        hint={fallbackData.hint}
        initialCode={fallbackData.initialCode}
      />
    );
  }

  return (
    <JSLessonView
      lessonId={lessonId}
      lessonNumber={lessonNumber}
      title={lessonData.title}
      subtopics={lessonData.subtopics}
      task={lessonData.task}
      hint={lessonData.hint}
      initialCode={lessonData.initialCode}
    />
  );
}
