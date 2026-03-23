import { PrismaClient } from "@prisma/client";
import { jsLessonsData } from "../src/data/jsLessons";
import { gitLessonsData } from "../src/data/gitLessons";
import { javaLessonsData } from "../src/data/javaLessons";

const prisma = new PrismaClient();

// Course data
const courses = [
    {
        slug: "javascript-backend",
        title: "JavaScript for Backend",
        description: "Build powerful server-side applications with Node.js, Express, and modern JavaScript patterns.",
        image: "/nature-3481_256.gif",
        level: "Intermediate",
        duration: "8 Weeks",
        tags: ["Node.js", "Express", "Backend"],
        order: 1,
    },
    {
        slug: "java-backend",
        title: "Java for Backend",
        description: "Build backend services with Java, Spring Boot, and RESTful API design.",
        image: "/nature-3481_256.gif",
        level: "Intermediate",
        duration: "8 Weeks",
        tags: ["Java", "Spring Boot", "Backend"],
        order: 2,
    },
    {
        slug: "git",
        title: "Master Git & GitHub",
        description: "Master version control, branching, merging, and collaboration with a hands-on GitBash terminal experience.",
        image: "/nature-3481_256.gif",
        level: "Beginner to Intermediate",
        duration: "4 Hours",
        tags: ["Git", "GitHub", "DevOps"],
        order: 3,
    },
    {
        slug: "sql",
        title: "SQL for Web and Data Engineering",
        description: "Master database design, queries, and optimization for web applications and data pipelines.",
        image: "/rain-3582_256.gif",
        level: "Beginner to Advanced",
        duration: "7 Weeks",
        tags: ["SQL", "Database", "Data Engineering"],
        order: 4,
    },
];

// JavaScript course modules and topics
const jsModules = [
    {
        title: "JavaScript Fundamentals",
        order: 0,
        topics: [
            { title: "Basic of JavaScript", xp: 20, isFree: true, lessonId: "201" },
            { title: "Loops Functions in Javascript", xp: 25, isFree: true, lessonId: "202" },
            { title: "Introduction to Arrays and Objects", xp: 30, isFree: false, lessonId: "203" },
            { title: "Coercion in JS", xp: 20, isFree: false, lessonId: "204" },
            { title: "Scopes in JS", xp: 25, isFree: false, lessonId: "205" },
            { title: "Discussion on Higher Order Functions and Callbacks", xp: 30, isFree: false, lessonId: "206" },
            { title: "Promises in JS", xp: 35, isFree: false, lessonId: "207" },
            { title: "Closures", xp: 40, isFree: false, lessonId: "208" },
            { title: "Iterators and Generators", xp: 45, isFree: false, lessonId: "209" },
            { title: "Async Await", xp: 50, isFree: false, lessonId: "210" },
        ],
    },
];

// Git course modules and topics
const gitModules = [
    {
        title: "Version Control Basics & Git Setup",
        order: 0,
        topics: [
            { title: "What is Version Control?", xp: 15, isFree: true, lessonId: "201" },
            { title: "Introduction to Git", xp: 15, isFree: true, lessonId: "202" },
            { title: "Installing Git & Git Bash", xp: 20, isFree: false, lessonId: "203" },
            { title: "Configuring Git Credentials", xp: 15, isFree: false, lessonId: "204" },
            { title: "Initializing Your First Repo: git init", xp: 20, isFree: false, lessonId: "205" },
        ],
    },
    {
        title: "Recording Changes to the Repository",
        order: 1,
        topics: [
            { title: "The Three States of Git", xp: 20, isFree: false, lessonId: "206" },
            { title: "git add & staging area", xp: 20, isFree: false, lessonId: "207" },
            { title: "Committing changes: git commit", xp: 25, isFree: false, lessonId: "208" },
            { title: "Ignoring files with .gitignore", xp: 20, isFree: false, lessonId: "209" },
            { title: "View history with git log", xp: 15, isFree: false, lessonId: "210" },
        ],
    },
];

async function main() {
    console.log("🌱 Starting database seed...");

    // Clear existing data
    await prisma.lessonSubtopic.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.module.deleteMany();
    await prisma.course.deleteMany();
    console.log("✅ Cleared existing course data");

    // Create courses
    for (const courseData of courses) {
        const course = await prisma.course.create({
            data: courseData,
        });
        console.log(`✅ Created course: ${course.title}`);

        // Add modules based on course type
        let modules: typeof jsModules = [];
        let lessonsData: Record<string, any> = {};

        if (courseData.slug === "javascript-backend") {
            modules = jsModules;
            lessonsData = jsLessonsData;
        } else if (courseData.slug === "git") {
            modules = gitModules;
            lessonsData = gitLessonsData;
        } else if (courseData.slug === "java-backend") {
            // Construct modules dynamtically for Java
            lessonsData = javaLessonsData;

            // Group lessons by module (based on ID range, e.g. 301 -> Module 3)
            const moduleMap = new Map<number, typeof jsModules[0]>();

            Object.entries(javaLessonsData).forEach(([lessonId, lesson]) => {
                const id = parseInt(lessonId);
                const moduleNum = Math.floor(id / 100);

                if (!moduleMap.has(moduleNum)) {
                    let title = `Module ${moduleNum}`;
                    if (moduleNum === 3) title = "Java Foundations";
                    if (moduleNum === 4) title = "Backend with Spring Boot";

                    moduleMap.set(moduleNum, {
                        title: title,
                        order: moduleNum,
                        topics: []
                    });
                }

                moduleMap.get(moduleNum)!.topics.push({
                    title: lesson.title,
                    xp: 20, // Default XP
                    isFree: moduleNum === 3 && (id === 301 || id === 302), // First 2 lessons of Module 3 free
                    lessonId: lessonId
                });
            });

            // Sort modules and topics
            modules = Array.from(moduleMap.values()).sort((a, b) => a.order - b.order);
            modules.forEach(m => m.topics.sort((a, b) => parseInt(a.lessonId) - parseInt(b.lessonId)));
        }

        for (const moduleData of modules) {
            const module = await prisma.module.create({
                data: {
                    courseId: course.id,
                    title: moduleData.title,
                    order: moduleData.order,
                },
            });
            console.log(`  📦 Created module: ${module.title}`);

            for (let i = 0; i < moduleData.topics.length; i++) {
                const topicData = moduleData.topics[i];
                const topic = await prisma.topic.create({
                    data: {
                        moduleId: module.id,
                        title: topicData.title,
                        xp: topicData.xp,
                        order: i,
                        isFree: topicData.isFree,
                    },
                });

                // Create lesson if data exists
                const lessonContent = lessonsData[topicData.lessonId];
                if (lessonContent) {
                    const lesson = await prisma.lesson.create({
                        data: {
                            topicId: topic.id,
                            title: lessonContent.title || topicData.title,
                            description: lessonContent.description || null,
                            task: lessonContent.task || null,
                            hint: lessonContent.hint || null,
                            initialCode: lessonContent.initialCode || null,
                        },
                    });

                    // Create subtopics if they exist
                    if (lessonContent.subtopics && Array.isArray(lessonContent.subtopics)) {
                        for (let j = 0; j < lessonContent.subtopics.length; j++) {
                            const subtopic = lessonContent.subtopics[j];
                            await prisma.lessonSubtopic.create({
                                data: {
                                    lessonId: lesson.id,
                                    title: subtopic.title,
                                    content: subtopic.content,
                                    order: j,
                                },
                            });
                        }
                    }
                    console.log(`    📝 Created lesson: ${lesson.title} with ${lessonContent.subtopics?.length || 0} subtopics`);
                }
            }
        }
    }

    console.log("\n🎉 Database seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
