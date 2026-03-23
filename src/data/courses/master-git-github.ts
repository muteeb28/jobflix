export type ContentBlock =
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "note"; text: string; title?: string }
    | { type: "warning"; text: string; title?: string }
    | { type: "code"; text: string };

export interface TopicCode {
    defaultFileName?: string;
    starterCode: string;
    expectedConsole?: string;
    runnable?: boolean;
}

export interface CourseTopic {
    id: string;
    title: string;
    contentBlocks: ContentBlock[];
    code?: TopicCode;
}

export interface CourseLesson {
    id: string;
    title: string;
    topics: CourseTopic[];
    task?: string;
    hint?: string;
    defaultCode?: TopicCode;
    xp?: number;
    progressId?: number;
    rawNotesChecksum?: RawNotesChecksum;
}

export interface CourseSection {
    id: string;
    title: string;
    lessons: CourseLesson[];
}

export interface Course {
    id: string;
    title: string;
    heroTitle?: string;
    sections: CourseSection[];
}

interface RawNotesChecksum {
    rawNotes: string;
    lineCount: number;
}

export const masterGitGithubRawNotes = `Git & Version Control — Part 1

Why Are We Even Talking About Version Control?

It feels like a detour.

“We came here to learn Git.

Why are we starting with version control systems?”

Because Git is just a tool.
To understand the tool, you must first understand the problem it solves.

That problem is change over time.

What Does “Version” Mean (Really)?

A version is simply:

A snapshot of software at a specific moment.

Nothing more.

Intuition from real apps

When you see an app version on the Play Store:

- That number represents:
    - a fixed set of features
    - a fixed set of bug fixes
    - a frozen state

That’s a version.

Versions Across a Software’s Life

Software evolves continuously:

- First complete release → Version 1
- Small improvement → Version 1.1
- Another change → Version 1.2

Over time:

- Features are added
- Bugs are removed
- Logic becomes more complex

Each meaningful state is a version.

So What Is a Version Control System?

A Version Control System (VCS) is:

A tool that helps you record, manage, and move between versions of software.

Why Version Control Exists (Real World)

Without version control:

- Teams overwrite each other’s work
- Bugs are hard to trace
- Rollbacks are risky
- Collaboration breaks

With version control:

- History exists
- Rollbacks are safe
- Collaboration scales

This is why every software engineer uses it.

Version Control Systems You’ll See

Mercurial

- Distributed source control system

Git

- Free and open source
- Distributed
- Created around 2005
- Used by ~90% of the industry

Git didn’t become popular by accident.
It became the default standard.

What Exactly Is Git?

Git is:

- A version control system
- A tool for tracking changes
- Designed for collaboration

Git works through:

- CLI (terminal)
- GUI (visual tools)

Git Is NOT GitHub

This confusion is common.

- Git
    - Version control system
- GitHub
    - Online platform that uses Git

Git works without GitHub.GitHub exists because Git exists.

Git Being Open Source Matters

Because Git is open source:

- The community is massive
- Help is always available
- Documentation is strong
- The tool keeps improving

You’re never stuck alone.

Code Integrity & Safety (Git Sense)

Code integrity

- Everyone sees the same code
- No hidden differences

Safety (not security attacks)

- Changes don’t disappear
- History is preserved
- Work is safe unless you delete it

Git Is Flexible by Design

Git does not force workflows.

Different teams:

- use Git differently
- structure commits differently

Git adapts to the team — not the other way around.

GUI vs CLI (Why CLI Still Matters)

Git supports:

- GUI → click-based
- CLI → command-based

Why CLI matters:

- Production servers have no GUI
- Deployments happen in terminals

CLI knowledge is essential.

How Git Is Actually Learned

Git is not memorized.

It is learned by:

- doing
- breaking
- fixing
- repeating

After 6–8 months, it starts feeling natural.

What Is a Git Repository?

A Git repository is:

A folder whose changes are managed by Git.

Inside it:

- files
- folders
- complete history

The First Git Command: git init

git init means:

“Start tracking versions here.”

What it does:

- Creates a hidden .git folder
- Turns the folder into a Git repository

Important:

- Run once per project
- Never again

Seeing Files in the Terminal: ls vs ls -a

ls

- Shows normal files and folders

ls -a

- Shows all files, including hidden ones
- This is how you see the .git folder

Why this matters:

- .git is hidden
- Without ls -a, you won’t see it

Where Git Commands Are Run

- Mac / Linux → Terminal
- Windows → Git Bash

Important:

- Git commands are identical across OS

Creating Files in a Project

Files can be created:

- from VS Code
- directly from terminal

Example:

touch index.html
touch index.js
vim index.html
git commit -m "message"
git add index.js test.js
git add .

This creates a new file instantly.

Editing Files Using Vim

What Is Vim?

Vim is:

- a terminal-based text editor
- works without a GUI
- useful in server environments

Vim Has Modes (Important)

Vim is modal, meaning it has different modes.

Normal mode

- Default mode
- Used for navigation

Insert mode

- Used for writing code

To enter insert mode:

- press i

Typical Vim Flow

1. Open file:
2. Press i → enter insert mode
3. Write code
4. Press Esc → exit insert mode
5. Type :wq
6. Press Enter

Vim Is Optional

- Vim is not required to learn Git
- You can use:
    - VS Code
    - Sublime
    - Any editor

Git tracks changes regardless of editor.

Checking State: git status

git status answers:

“What is Git seeing right now?”

It shows:

- branch
- untracked files
- staged changes
- unstaged changes

In Git, Versions Are Commits

Key mental model:

Version = Commit

If you want a new version:

- you create a new commit

Untracked Files (Why Git Ignores Them)

When a file is created:

- Git ignores it by default

Untracked means:

- file exists
- Git doesn’t care yet

Git never assumes.

Telling Git to Track Changes: git add

git add means:

“Include these changes in the next version.”

It:

- starts tracking new files
- stages changes in existing files

Git tracks changes, not just files.

Creating a Version: git commit

A commit:

- freezes a version
- records history
- stores a message

Syntax:
Git will not:

- create empty commits
- duplicate versions

Viewing History: git log

Shows:

- commit IDs
- authors
- dates
- messages

Exit with:

- q

Adding Multiple Files

Options:

Specific files:
All files:
Best practice:

- avoid git add . blindly
- add intentionally

git add vs git commit

Think like this:

- git add
    - chooses what goes in
- git commit
    - creates the version

Uncommitted Changes

If you don’t commit:

- changes stay on your machine
- they don’t exist in history
- collaborators never see them

Git Is Local First

So far:

- everything is on your system
- no collaboration yet

To collaborate, we need hosting.

Hosting Platforms

Platforms that host Git repos:

- GitHub
- GitLab
- Bitbucket

They provide:

- collaboration
- issue tracking
- UI for commits

GitHub (Conceptual)

GitHub is:

- an online platform
- powered by Git
- built for collaboration

Not Git itself.

Creating a GitHub Repository

Steps:

- sign up
- create repo
- choose public/private
- name doesn’t have to match local folder

Connecting Local Repo to GitHub

git remote add origin <URL>

Meaning:

- remote → not local
- origin → nickname
- URL → GitHub repo

Done once.

Uploading Code

git push origin master

After push:

- files appear on GitHub
- history matches git log

Why Some Files Don’t Appear on GitHub

GitHub only knows:

commits

If a file isn’t committed:

- it doesn’t exist remotely

The Everyday Git Loop

1. Change code
2. git add
3. git commit
4. git push

Repeat.

Collaboration

- Collaborators can be added
- Multiple collaboration models exist
- Covered later

✅ End of Part 1`;
const masterGitGithubRawNotesLineCount = masterGitGithubRawNotes.split(/\r?\n/).length;

const githubPart1Topics: CourseTopic[] = [
    {
        id: "why-version-control",
        title: "Why Are We Even Talking About Version Control?",
        contentBlocks: [
            { type: "p", text: "It feels like a detour." },
            { type: "p", text: "“We came here to learn Git." },
            { type: "p", text: "Why are we starting with version control systems?”" },
            { type: "p", text: "Because Git is just a tool." },
            { type: "p", text: "To understand the tool, you must first understand the problem it solves." },
            { type: "p", text: "That problem is change over time." }
        ]
    },
    {
        id: "what-does-version-mean",
        title: "What Does “Version” Mean (Really)?",
        contentBlocks: [
            { type: "p", text: "A version is simply:" },
            { type: "p", text: "A snapshot of software at a specific moment." },
            { type: "p", text: "Nothing more." },
            { type: "h3", text: "Intuition from real apps" },
            { type: "p", text: "When you see an app version on the Play Store:" },
            { type: "p", text: "That number represents:" },
            { type: "ul", items: [
                "a fixed set of features",
                "a fixed set of bug fixes",
                "a frozen state"
            ] },
            { type: "p", text: "That’s a version." }
        ]
    },
    {
        id: "versions-across-life",
        title: "Versions Across a Software’s Life",
        contentBlocks: [
            { type: "p", text: "Software evolves continuously:" },
            { type: "ul", items: [
                "First complete release → Version 1",
                "Small improvement → Version 1.1",
                "Another change → Version 1.2"
            ] },
            { type: "p", text: "Over time:" },
            { type: "ul", items: [
                "Features are added",
                "Bugs are removed",
                "Logic becomes more complex"
            ] },
            { type: "p", text: "Each meaningful state is a version." }
        ]
    },
    {
        id: "what-is-vcs",
        title: "So What Is a Version Control System?",
        contentBlocks: [
            { type: "p", text: "A Version Control System (VCS) is:" },
            { type: "p", text: "A tool that helps you record, manage, and move between versions of software." }
        ]
    },
    {
        id: "why-version-control-exists",
        title: "Why Version Control Exists (Real World)",
        contentBlocks: [
            { type: "p", text: "Without version control:" },
            { type: "ul", items: [
                "Teams overwrite each other’s work",
                "Bugs are hard to trace",
                "Rollbacks are risky",
                "Collaboration breaks"
            ] },
            { type: "p", text: "With version control:" },
            { type: "ul", items: [
                "History exists",
                "Rollbacks are safe",
                "Collaboration scales"
            ] },
            { type: "p", text: "This is why every software engineer uses it." }
        ]
    },
    {
        id: "vcs-youll-see",
        title: "Version Control Systems You’ll See",
        contentBlocks: [
            { type: "p", text: "Mercurial" },
            { type: "ul", items: [
                "Distributed source control system"
            ] },
            { type: "p", text: "Git" },
            { type: "ul", items: [
                "Free and open source",
                "Distributed",
                "Created around 2005",
                "Used by ~90% of the industry"
            ] },
            { type: "p", text: "Git didn’t become popular by accident." },
            { type: "p", text: "It became the default standard." }
        ]
    },
    {
        id: "what-exactly-is-git",
        title: "What Exactly Is Git?",
        contentBlocks: [
            { type: "p", text: "Git is:" },
            { type: "ul", items: [
                "A version control system",
                "A tool for tracking changes",
                "Designed for collaboration"
            ] },
            { type: "p", text: "Git works through:" },
            { type: "ul", items: [
                "CLI (terminal)",
                "GUI (visual tools)"
            ] }
        ]
    },
    {
        id: "git-is-not-github",
        title: "Git Is NOT GitHub",
        contentBlocks: [
            { type: "p", text: "This confusion is common." },
            { type: "ul", items: [
                "Git",
                "Version control system",
                "GitHub",
                "Online platform that uses Git"
            ] },
            { type: "p", text: "Git works without GitHub.GitHub exists because Git exists." }
        ]
    },
    {
        id: "git-open-source-matters",
        title: "Git Being Open Source Matters",
        contentBlocks: [
            { type: "p", text: "Because Git is open source:" },
            { type: "ul", items: [
                "The community is massive",
                "Help is always available",
                "Documentation is strong",
                "The tool keeps improving"
            ] },
            { type: "p", text: "You’re never stuck alone." }
        ]
    },
    {
        id: "code-integrity-safety",
        title: "Code Integrity & Safety (Git Sense)",
        contentBlocks: [
            { type: "p", text: "Code integrity" },
            { type: "ul", items: [
                "Everyone sees the same code",
                "No hidden differences"
            ] },
            { type: "p", text: "Safety (not security attacks)" },
            { type: "ul", items: [
                "Changes don’t disappear",
                "History is preserved",
                "Work is safe unless you delete it"
            ] }
        ]
    },
    {
        id: "git-flexible-by-design",
        title: "Git Is Flexible by Design",
        contentBlocks: [
            { type: "p", text: "Git does not force workflows." },
            { type: "p", text: "Different teams:" },
            { type: "ul", items: [
                "use Git differently",
                "structure commits differently"
            ] },
            { type: "p", text: "Git adapts to the team — not the other way around." }
        ]
    },
    {
        id: "gui-vs-cli",
        title: "GUI vs CLI (Why CLI Still Matters)",
        contentBlocks: [
            { type: "p", text: "Git supports:" },
            { type: "ul", items: [
                "GUI → click-based",
                "CLI → command-based"
            ] },
            { type: "p", text: "Why CLI matters:" },
            { type: "ul", items: [
                "Production servers have no GUI",
                "Deployments happen in terminals"
            ] },
            { type: "p", text: "CLI knowledge is essential." }
        ]
    },
    {
        id: "how-git-learned",
        title: "How Git Is Actually Learned",
        contentBlocks: [
            { type: "p", text: "Git is not memorized." },
            { type: "p", text: "It is learned by:" },
            { type: "ul", items: [
                "doing",
                "breaking",
                "fixing",
                "repeating"
            ] },
            { type: "p", text: "After 6–8 months, it starts feeling natural." }
        ]
    },
    {
        id: "what-is-git-repository",
        title: "What Is a Git Repository?",
        contentBlocks: [
            { type: "p", text: "A Git repository is:" },
            { type: "p", text: "A folder whose changes are managed by Git." },
            { type: "p", text: "Inside it:" },
            { type: "ul", items: [
                "files",
                "folders",
                "complete history"
            ] }
        ]
    },
    {
        id: "git-init",
        title: "The First Git Command: git init",
        contentBlocks: [
            { type: "p", text: "git init means:" },
            { type: "p", text: "“Start tracking versions here.”" },
            { type: "p", text: "What it does:" },
            { type: "ul", items: [
                "Creates a hidden .git folder",
                "Turns the folder into a Git repository"
            ] },
            { type: "p", text: "Important:" },
            { type: "ul", items: [
                "Run once per project",
                "Never again"
            ] }
        ]
    },
    {
        id: "ls-vs-ls-a",
        title: "Seeing Files in the Terminal: ls vs ls -a",
        contentBlocks: [
            { type: "code", text: "ls" },
            { type: "ul", items: [
                "Shows normal files and folders"
            ] },
            { type: "code", text: "ls -a" },
            { type: "ul", items: [
                "Shows all files, including hidden ones",
                "This is how you see the .git folder"
            ] },
            { type: "p", text: "Why this matters:" },
            { type: "ul", items: [
                ".git is hidden",
                "Without ls -a, you won’t see it"
            ] }
        ]
    },
    {
        id: "where-commands-run",
        title: "Where Git Commands Are Run",
        contentBlocks: [
            { type: "ul", items: [
                "Mac / Linux → Terminal",
                "Windows → Git Bash"
            ] },
            { type: "p", text: "Important:" },
            { type: "ul", items: [
                "Git commands are identical across OS"
            ] }
        ]
    },
    {
        id: "creating-files",
        title: "Creating Files in a Project",
        contentBlocks: [
            { type: "p", text: "Files can be created:" },
            { type: "ul", items: [
                "from VS Code",
                "directly from terminal"
            ] },
            { type: "p", text: "Example:" },
            { type: "code", text: "touch index.html\ntouch index.js\nvim index.html\ngit commit -m \"message\"\ngit add index.js test.js\ngit add ." },
            { type: "p", text: "This creates a new file instantly." }
        ]
    },
    {
        id: "editing-files-vim",
        title: "Editing Files Using Vim",
        contentBlocks: [
            { type: "h3", text: "What Is Vim?" },
            { type: "p", text: "Vim is:" },
            { type: "ul", items: [
                "a terminal-based text editor",
                "works without a GUI",
                "useful in server environments"
            ] }
        ]
    },
    {
        id: "vim-modes",
        title: "Vim Has Modes (Important)",
        contentBlocks: [
            { type: "p", text: "Vim is modal, meaning it has different modes." },
            { type: "h3", text: "Normal mode" },
            { type: "ul", items: [
                "Default mode",
                "Used for navigation"
            ] },
            { type: "h3", text: "Insert mode" },
            { type: "ul", items: [
                "Used for writing code"
            ] },
            { type: "p", text: "To enter insert mode:" },
            { type: "ul", items: [
                "press i"
            ] }
        ]
    },
    {
        id: "typical-vim-flow",
        title: "Typical Vim Flow",
        contentBlocks: [
            { type: "ol", items: [
                "Open file:",
                "Press i → enter insert mode",
                "Write code",
                "Press Esc → exit insert mode",
                "Type :wq",
                "Press Enter"
            ] }
        ]
    },
    {
        id: "vim-optional",
        title: "Vim Is Optional",
        contentBlocks: [
            { type: "ul", items: [
                "Vim is not required to learn Git"
            ] },
            { type: "p", text: "You can use:" },
            { type: "ul", items: [
                "VS Code",
                "Sublime",
                "Any editor"
            ] },
            { type: "p", text: "Git tracks changes regardless of editor." }
        ]
    },
    {
        id: "git-status",
        title: "Checking State: git status",
        contentBlocks: [
            { type: "p", text: "git status answers:" },
            { type: "p", text: "“What is Git seeing right now?”" },
            { type: "p", text: "It shows:" },
            { type: "ul", items: [
                "branch",
                "untracked files",
                "staged changes",
                "unstaged changes"
            ] }
        ]
    },
    {
        id: "versions-are-commits",
        title: "In Git, Versions Are Commits",
        contentBlocks: [
            { type: "p", text: "Key mental model:" },
            { type: "p", text: "Version = Commit" },
            { type: "p", text: "If you want a new version:" },
            { type: "ul", items: [
                "you create a new commit"
            ] }
        ]
    },
    {
        id: "untracked-files",
        title: "Untracked Files (Why Git Ignores Them)",
        contentBlocks: [
            { type: "p", text: "When a file is created:" },
            { type: "ul", items: [
                "Git ignores it by default"
            ] },
            { type: "p", text: "Untracked means:" },
            { type: "ul", items: [
                "file exists",
                "Git doesn’t care yet"
            ] },
            { type: "p", text: "Git never assumes." }
        ]
    },
    {
        id: "git-add",
        title: "Telling Git to Track Changes: git add",
        contentBlocks: [
            { type: "p", text: "git add means:" },
            { type: "p", text: "“Include these changes in the next version.”" },
            { type: "p", text: "It:" },
            { type: "ul", items: [
                "starts tracking new files",
                "stages changes in existing files"
            ] },
            { type: "p", text: "Git tracks changes, not just files." }
        ]
    },
    {
        id: "git-commit",
        title: "Creating a Version: git commit",
        contentBlocks: [
            { type: "p", text: "A commit:" },
            { type: "ul", items: [
                "freezes a version",
                "records history",
                "stores a message"
            ] },
            { type: "p", text: "Syntax:" },
            { type: "p", text: "Git will not:" },
            { type: "ul", items: [
                "create empty commits",
                "duplicate versions"
            ] }
        ]
    },
    {
        id: "git-log",
        title: "Viewing History: git log",
        contentBlocks: [
            { type: "p", text: "Shows:" },
            { type: "ul", items: [
                "commit IDs",
                "authors",
                "dates",
                "messages"
            ] },
            { type: "p", text: "Exit with:" },
            { type: "ul", items: [
                "q"
            ] }
        ]
    },
    {
        id: "adding-multiple-files",
        title: "Adding Multiple Files",
        contentBlocks: [
            { type: "p", text: "Options:" },
            { type: "p", text: "Specific files:" },
            { type: "p", text: "All files:" },
            { type: "p", text: "Best practice:" },
            { type: "ul", items: [
                "avoid git add . blindly",
                "add intentionally"
            ] }
        ]
    },
    {
        id: "git-add-vs-commit",
        title: "git add vs git commit",
        contentBlocks: [
            { type: "p", text: "Think like this:" },
            { type: "ul", items: [
                "git add",
                "chooses what goes in",
                "git commit",
                "creates the version"
            ] }
        ]
    },
    {
        id: "uncommitted-changes",
        title: "Uncommitted Changes",
        contentBlocks: [
            { type: "p", text: "If you don’t commit:" },
            { type: "ul", items: [
                "changes stay on your machine",
                "they don’t exist in history",
                "collaborators never see them"
            ] }
        ]
    },
    {
        id: "git-local-first",
        title: "Git Is Local First",
        contentBlocks: [
            { type: "p", text: "So far:" },
            { type: "ul", items: [
                "everything is on your system",
                "no collaboration yet"
            ] },
            { type: "p", text: "To collaborate, we need hosting." }
        ]
    },
    {
        id: "hosting-platforms",
        title: "Hosting Platforms",
        contentBlocks: [
            { type: "p", text: "Platforms that host Git repos:" },
            { type: "ul", items: [
                "GitHub",
                "GitLab",
                "Bitbucket"
            ] },
            { type: "p", text: "They provide:" },
            { type: "ul", items: [
                "collaboration",
                "issue tracking",
                "UI for commits"
            ] }
        ]
    },
    {
        id: "github-conceptual",
        title: "GitHub (Conceptual)",
        contentBlocks: [
            { type: "p", text: "GitHub is:" },
            { type: "ul", items: [
                "an online platform",
                "powered by Git",
                "built for collaboration"
            ] },
            { type: "p", text: "Not Git itself." }
        ]
    },
    {
        id: "creating-github-repo",
        title: "Creating a GitHub Repository",
        contentBlocks: [
            { type: "p", text: "Steps:" },
            { type: "ul", items: [
                "sign up",
                "create repo",
                "choose public/private",
                "name doesn’t have to match local folder"
            ] }
        ]
    },
    {
        id: "connect-local-to-github",
        title: "Connecting Local Repo to GitHub",
        contentBlocks: [
            { type: "code", text: "git remote add origin <URL>" },
            { type: "p", text: "Meaning:" },
            { type: "ul", items: [
                "remote → not local",
                "origin → nickname",
                "URL → GitHub repo"
            ] },
            { type: "p", text: "Done once." }
        ]
    },
    {
        id: "uploading-code",
        title: "Uploading Code",
        contentBlocks: [
            { type: "code", text: "git push origin master" },
            { type: "p", text: "After push:" },
            { type: "ul", items: [
                "files appear on GitHub",
                "history matches git log"
            ] }
        ]
    },
    {
        id: "why-files-not-on-github",
        title: "Why Some Files Don’t Appear on GitHub",
        contentBlocks: [
            { type: "p", text: "GitHub only knows:" },
            { type: "p", text: "commits" },
            { type: "p", text: "If a file isn’t committed:" },
            { type: "ul", items: [
                "it doesn’t exist remotely"
            ] }
        ]
    },
    {
        id: "everyday-git-loop",
        title: "The Everyday Git Loop",
        contentBlocks: [
            { type: "ol", items: [
                "Change code",
                "git add",
                "git commit",
                "git push"
            ] },
            { type: "p", text: "Repeat." }
        ]
    },
    {
        id: "collaboration",
        title: "Collaboration",
        contentBlocks: [
            { type: "ul", items: [
                "Collaborators can be added",
                "Multiple collaboration models exist",
                "Covered later"
            ] },
            { type: "p", text: "✅ End of Part 1" }
        ]
    }
];

export const masterGitGithubCourse: Course = {
    id: "master-git-github",
    title: "Master Git & GitHub",
    heroTitle: "Become an Expert in Git & GitHub in 4 Hours",
    sections: [
        {
            id: "github-part-1",
            title: "GitHub (Part 1)",
            lessons: [
                {
                    id: "101",
                    title: "Git & Version Control — Part 1",
                    topics: githubPart1Topics,
                    rawNotesChecksum: {
                        rawNotes: masterGitGithubRawNotes,
                        lineCount: masterGitGithubRawNotesLineCount
                    }
                }
            ]
        }
    ]
};

const normalizeLine = (line: string) => {
    const trimmedEnd = line.replace(/\s+$/, "");
    const withoutBullet = trimmedEnd.replace(/^\s*-\s+/, "");
    const withoutNumber = withoutBullet.replace(/^\s*\d+\.\s+/, "");
    return withoutNumber.trim();
};

const buildLineCounts = (lines: string[]) => {
    const counts = new Map<string, number>();
    lines.forEach((line) => {
        const normalized = normalizeLine(line);
        if (!normalized) {
            return;
        }
        counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    });
    return counts;
};

const diffLineCounts = (source: Map<string, number>, target: Map<string, number>) => {
    const missing: string[] = [];
    source.forEach((count, line) => {
        const available = target.get(line) ?? 0;
        if (available < count) {
            for (let i = 0; i < count - available; i += 1) {
                missing.push(line);
            }
        }
    });
    return missing;
};

const appendBlockLines = (lines: string[], block: ContentBlock) => {
    if (block.type === "ul" || block.type === "ol") {
        lines.push(...block.items);
        return;
    }

    if (block.type === "note" || block.type === "warning") {
        lines.push(block.text);
        return;
    }

    lines.push(...block.text.split(/\r?\n/));
};

const collectContentBlockLines = (course: Course) => {
    const lines: string[] = [];
    course.sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
            lesson.topics.forEach((topic) => {
                topic.contentBlocks.forEach((block) => {
                    appendBlockLines(lines, block);
                });
            });
        });
    });
    return lines;
};

const collectRenderedLines = (course: Course) => {
    const lines: string[] = [];
    course.sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
            lines.push(lesson.title);
            lesson.topics.forEach((topic) => {
                lines.push(topic.title);
                topic.contentBlocks.forEach((block) => {
                    appendBlockLines(lines, block);
                });
            });
        });
    });
    return lines;
};

const validateCourse = (course: Course, rawNotes: string) => {
    const totalTopics = course.sections.reduce((sectionAcc, section) => {
        return sectionAcc + section.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.topics.length, 0);
    }, 0);

    if (totalTopics === 0) {
        throw new Error("[Master Git & GitHub] Course has zero topics.");
    }

    course.sections.forEach((section) => {
        section.lessons.forEach((lesson) => {
            if (!lesson.topics || lesson.topics.length === 0) {
                throw new Error(`[Master Git & GitHub] Lesson "${lesson.title}" has zero topics.`);
            }
            lesson.topics.forEach((topic) => {
                if (!topic.title) {
                    throw new Error(`[Master Git & GitHub] Topic is missing a title in lesson "${lesson.title}".`);
                }
                if (!topic.contentBlocks || topic.contentBlocks.length === 0) {
                    throw new Error(`[Master Git & GitHub] Topic "${topic.title}" has zero content blocks.`);
                }
            });
        });
    });

    const rawLines = rawNotes.split(/\r?\n/);
    const mappedContentLines = collectContentBlockLines(course);
    const renderedLines = collectRenderedLines(course);
    const rawCounts = buildLineCounts(rawLines);
    const renderedCounts = buildLineCounts(renderedLines);
    const unmappedLines = diffLineCounts(rawCounts, renderedCounts);
    const extraLines = diffLineCounts(renderedCounts, rawCounts);

    console.info(
        `[Master Git & GitHub] Raw notes lines: ${rawLines.length}, Mapped content lines: ${mappedContentLines.length}, Unmapped lines: ${unmappedLines.length}`
    );

    if (unmappedLines.length > 0) {
        console.error("[Master Git & GitHub] Unmapped raw notes lines:", unmappedLines);
        throw new Error("[Master Git & GitHub] Unmapped raw notes lines detected.");
    }

    if (extraLines.length > 0) {
        console.error("[Master Git & GitHub] Mapped lines not found in raw notes:", extraLines);
        throw new Error("[Master Git & GitHub] Mapped lines not found in raw notes.");
    }
};

if (process.env.NODE_ENV !== "production") {
    validateCourse(masterGitGithubCourse, masterGitGithubRawNotes);
}
