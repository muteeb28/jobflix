export interface GitLesson {
    title: string;
    description: string;
    task: string;
    hint: string;
}

export const gitLessonsData: Record<string, GitLesson> = {
    // Module 1: Version Control Basics & Git Setup
    "201": {
        title: "What is Version Control?",
        description: `Version Control is a system that records changes to files over time so that you can recall specific versions later.

Think of it like a time machine for your code:
• Track every change made to your project
• Revert files back to a previous state
• Compare changes over time
• See who modified what and when
• Recover from mistakes easily

**Why is Version Control Important?**

1. **Collaboration**: Multiple developers can work on the same project without overwriting each other's work
2. **History**: Complete history of who changed what and why
3. **Backup**: Your code is safely stored and can be recovered
4. **Branching**: Work on new features without affecting the main code
5. **Experimentation**: Try new ideas without fear of breaking things

**Types of Version Control Systems:**

• **Local VCS**: Simple database on your computer (RCS)
• **Centralized VCS**: Single server with all versions (SVN, CVS)
• **Distributed VCS**: Full mirror of repository (Git, Mercurial)

Git is a Distributed VCS - the most popular and powerful version control system used by millions of developers worldwide.`,
        task: "Understand the concept of version control and why it's essential for software development.",
        hint: "Version control is like a time machine for your code - you can always go back to any previous version!"
    },
    "202": {
        title: "Introduction to Git",
        description: `Git is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

**History of Git:**
• Created by Linus Torvalds in 2005
• Originally developed for Linux kernel development
• Now the most widely used VCS in the world

**Key Features of Git:**

1. **Distributed Development**
   - Every developer has a full copy of the repository
   - Work offline without any issues
   - No single point of failure

2. **Branching and Merging**
   - Create branches for new features
   - Merge changes back seamlessly
   - Lightweight and fast branching

3. **Data Integrity**
   - Everything is checksummed (SHA-1)
   - Impossible to change content without Git knowing
   - Complete history preserved

4. **Speed**
   - Nearly all operations are local
   - No network latency for most tasks
   - Handles large projects efficiently

**Git vs Other VCS:**

| Feature | Git | SVN | CVS |
|---------|-----|-----|-----|
| Type | Distributed | Centralized | Centralized |
| Speed | Very Fast | Slow | Slow |
| Branching | Cheap | Expensive | Expensive |
| Offline Work | Full | Limited | None |

Git has become the industry standard - learning Git is essential for any developer!`,
        task: "Learn about Git's history, features, and why it's the preferred version control system.",
        hint: "Git was created by Linus Torvalds, the same person who created Linux!"
    },
    "203": {
        title: "Installing Git & Git Bash",
        description: `Before you can use Git, you need to install it on your computer. Git is available for all major operating systems.

**Installing Git on Windows:**

1. Download Git from https://git-scm.com/download/win
2. Run the installer
3. Follow the setup wizard (default options are usually fine)
4. Git Bash will be installed automatically

**What is Git Bash?**

Git Bash is a terminal application that provides a Unix-like command line experience on Windows. It includes:
• Bash shell (command line interface)
• Git command line tools
• SSH client for secure connections
• Common Unix utilities

**Installing Git on Mac:**

Option 1: Using Homebrew
\`\`\`bash
brew install git
\`\`\`

Option 2: Download from git-scm.com

**Installing Git on Linux (Ubuntu/Debian):**

\`\`\`bash
sudo apt-get update
sudo apt-get install git
\`\`\`

**Verifying Installation:**

After installation, open Git Bash (Windows) or Terminal (Mac/Linux) and run:

\`\`\`bash
git --version
\`\`\`

You should see something like: \`git version 2.45.0\`

**Git Bash Shortcuts:**
• \`pwd\` - Print working directory
• \`ls\` - List files
• \`cd\` - Change directory
• \`clear\` - Clear the terminal`,
        task: "Install Git on your system and verify the installation using the terminal on the right.",
        hint: "Type 'git --version' in the terminal to verify Git is installed correctly."
    },
    "204": {
        title: "Configuring Git Credentials",
        description: `Before using Git, you need to configure your identity. This information is attached to every commit you make.

**Why Configure Git?**

Every Git commit uses this information:
• Your name appears in the commit history
• Your email links commits to your GitHub/GitLab account
• Essential for collaboration and accountability

**Setting Your Identity:**

Configure your name:
\`\`\`bash
git config --global user.name "Your Name"
\`\`\`

Configure your email:
\`\`\`bash
git config --global user.email "your.email@example.com"
\`\`\`

**Understanding Config Levels:**

Git has three configuration levels:

1. **--system**: Applies to all users on the system
   - Location: /etc/gitconfig

2. **--global**: Applies to current user (most common)
   - Location: ~/.gitconfig

3. **--local**: Applies to current repository only
   - Location: .git/config

**Viewing Your Configuration:**

\`\`\`bash
git config --list
\`\`\`

Or check specific values:
\`\`\`bash
git config user.name
git config user.email
\`\`\`

**Other Useful Configurations:**

Set default branch name:
\`\`\`bash
git config --global init.defaultBranch main
\`\`\`

Set default editor:
\`\`\`bash
git config --global core.editor "code --wait"
\`\`\`

**Pro Tip:** Use the same email as your GitHub account to link your commits to your profile!`,
        task: "Configure your Git username and email using the git config command.",
        hint: "Use 'git config --global user.name \"Your Name\"' to set your name."
    },
    "205": {
        title: "Initializing Your First Repo: git init",
        description: `Now it's time to create your first Git repository! A repository (repo) is a directory where Git tracks all changes.

**What is a Git Repository?**

A Git repository is a folder that contains:
• Your project files
• A hidden .git folder with all version history
• Configuration files for the repository

**Creating a New Repository:**

Navigate to your project folder and run:
\`\`\`bash
git init
\`\`\`

This creates a .git folder in your directory:
\`\`\`
my-project/
├── .git/           ← Git's hidden folder
│   ├── HEAD
│   ├── config
│   ├── objects/
│   ├── refs/
│   └── ...
├── index.html
├── style.css
└── script.js
\`\`\`

**What's in the .git folder?**

• **HEAD**: Points to current branch
• **config**: Repository configuration
• **objects/**: Stores all content (commits, files)
• **refs/**: Stores branch and tag references
• **hooks/**: Custom scripts for Git events

**Best Practices:**

1. Initialize at the root of your project
2. One repo per project (don't nest repos)
3. Don't manually edit .git folder
4. Add a .gitignore file early

**Checking Repository Status:**

After initializing, check the status:
\`\`\`bash
git status
\`\`\`

Output shows:
• Current branch
• Untracked/modified files
• Staged files ready for commit

🎓 **Congratulations!** You've created your first Git repository!`,
        task: "Initialize a new Git repository using 'git init' command in the terminal.",
        hint: "Type 'git init' to create a new repository. Then use 'ls -la' to see the hidden .git folder!"
    },

    // Module 2: Recording Changes to the Repository
    "206": {
        title: "The Three States of Git",
        description: `Understanding Git's three states is fundamental to using Git effectively. Every file in a Git repository goes through these states.

**The Three States:**

1. **Modified** (Working Directory)
   - You've changed the file but haven't staged it yet
   - Changes exist only in your working directory
   - Not yet tracked for the next commit

2. **Staged** (Staging Area / Index)
   - You've marked a modified file to go into the next commit
   - File is added to the staging area
   - Ready to be committed

3. **Committed** (Git Directory / Repository)
   - Data is safely stored in your local database
   - A snapshot has been created
   - Part of your project's history

**The Git Workflow:**

\`\`\`
Working Directory → Staging Area → Git Repository
     (modify)         (git add)      (git commit)
\`\`\`

**Visual Representation:**

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Working Directory                     │
│   (Your actual files - where you edit and modify)       │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ git add
┌─────────────────────────────────────────────────────────┐
│                     Staging Area                         │
│   (Index - files ready to be committed)                 │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ git commit
┌─────────────────────────────────────────────────────────┐
│                  Git Repository (.git)                   │
│   (Permanent snapshots - your project history)          │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Why a Staging Area?**

• Select specific changes to commit
• Review what you're about to commit
• Create logical, organized commits
• Separate unrelated changes

This three-state model is what makes Git so powerful and flexible!`,
        task: "Understand the three states of Git: Modified, Staged, and Committed.",
        hint: "Think of staging as a preparation area - you decide exactly what goes into each commit!"
    },
    "207": {
        title: "git add & staging area",
        description: `The 'git add' command moves changes from your working directory to the staging area, preparing them for the next commit.

**Basic Usage:**

Add a specific file:
\`\`\`bash
git add filename.txt
\`\`\`

Add multiple files:
\`\`\`bash
git add file1.txt file2.txt file3.txt
\`\`\`

Add all files in current directory:
\`\`\`bash
git add .
\`\`\`

Add all changes in entire repository:
\`\`\`bash
git add -A
\`\`\`

**Useful Variations:**

Add only modified files (not new files):
\`\`\`bash
git add -u
\`\`\`

Interactive staging (choose which parts to stage):
\`\`\`bash
git add -p
\`\`\`

**Checking What's Staged:**

See what's in the staging area:
\`\`\`bash
git status
\`\`\`

See detailed differences:
\`\`\`bash
git diff --staged
\`\`\`

**Unstaging Files:**

Remove file from staging (keep changes):
\`\`\`bash
git restore --staged filename.txt
\`\`\`

Or the older way:
\`\`\`bash
git reset HEAD filename.txt
\`\`\`

**Best Practices:**

1. Stage related changes together
2. Review staged changes before committing
3. Don't use 'git add .' blindly
4. Use 'git add -p' for precise control

**Common Patterns:**

\`\`\`bash
# Stage and commit workflow
git add .
git status           # Review what's staged
git commit -m "message"
\`\`\`

Remember: Staging lets you craft the perfect commit!`,
        task: "Use 'git add' to stage files for your next commit.",
        hint: "Try 'git add .' to stage all changes, or 'git add filename' for specific files."
    },
    "208": {
        title: "Committing changes: git commit",
        description: `The 'git commit' command captures a snapshot of your staged changes and adds it to the project history.

**Basic Commit:**

\`\`\`bash
git commit -m "Your commit message here"
\`\`\`

**Anatomy of a Commit:**

Each commit contains:
• A unique SHA-1 hash (identifier)
• Author information (name and email)
• Timestamp
• Commit message
• Pointer to parent commit(s)
• A snapshot of staged files

**Writing Good Commit Messages:**

Format:
\`\`\`
<type>: <subject>

<body>

<footer>
\`\`\`

Example:
\`\`\`
feat: add user authentication

- Implement login and logout functionality
- Add session management
- Create user profile page

Closes #123
\`\`\`

**Commit Types:**
• feat: New feature
• fix: Bug fix
• docs: Documentation changes
• style: Code style changes
• refactor: Code refactoring
• test: Adding tests
• chore: Maintenance tasks

**Useful Options:**

Commit with longer message (opens editor):
\`\`\`bash
git commit
\`\`\`

Add and commit in one step:
\`\`\`bash
git commit -am "message"
\`\`\`

Amend last commit:
\`\`\`bash
git commit --amend
\`\`\`

**Viewing Commits:**

\`\`\`bash
git log              # Full log
git log --oneline    # Compact log
git log -3           # Last 3 commits
\`\`\`

**Golden Rules:**
1. Commit often, push regularly
2. Each commit should be a logical unit
3. Write meaningful messages
4. Don't commit broken code`,
        task: "Create a commit with a meaningful message using 'git commit -m'.",
        hint: "First stage files with 'git add', then commit with 'git commit -m \"Your message\"'."
    },
    "209": {
        title: "Ignoring files with .gitignore",
        description: `The .gitignore file tells Git which files or directories to ignore and not track.

**Why Ignore Files?**

Some files shouldn't be in version control:
• Dependencies (node_modules/)
• Build outputs (dist/, build/)
• Environment variables (.env)
• IDE settings (.vscode/, .idea/)
• OS files (.DS_Store, Thumbs.db)
• Log files (*.log)

**Creating .gitignore:**

Create a file named \`.gitignore\` in your repository root:
\`\`\`bash
touch .gitignore
\`\`\`

**Basic Patterns:**

\`\`\`gitignore
# Ignore specific file
secret.txt

# Ignore all files with extension
*.log
*.tmp

# Ignore directory
node_modules/
dist/

# Ignore files in any directory
**/debug.log

# Ignore files only in root
/TODO.txt

# Negate pattern (don't ignore)
!important.log
\`\`\`

**Common .gitignore Examples:**

**Node.js:**
\`\`\`gitignore
node_modules/
npm-debug.log
.env
dist/
\`\`\`

**Python:**
\`\`\`gitignore
__pycache__/
*.py[cod]
venv/
.env
\`\`\`

**General:**
\`\`\`gitignore
.DS_Store
Thumbs.db
*.log
.env.local
\`\`\`

**Global .gitignore:**

Set up a global ignore file for your system:
\`\`\`bash
git config --global core.excludesfile ~/.gitignore_global
\`\`\`

**Pro Tips:**
1. Add .gitignore early in your project
2. Use gitignore.io to generate templates
3. Never ignore .gitignore itself
4. Check 'git status' to verify patterns work`,
        task: "Create a .gitignore file to exclude files from version control.",
        hint: "Create a .gitignore file and add patterns like 'node_modules/' or '*.log' to ignore files."
    },
    "210": {
        title: "View history with git log",
        description: `The 'git log' command shows the commit history of your repository.

**Basic Usage:**

\`\`\`bash
git log
\`\`\`

Shows:
• Commit hash (SHA-1)
• Author name and email
• Date
• Commit message

**Useful Options:**

**One-line summary:**
\`\`\`bash
git log --oneline
\`\`\`

**Show last n commits:**
\`\`\`bash
git log -5
\`\`\`

**Show with graph:**
\`\`\`bash
git log --graph --oneline
\`\`\`

**Show with file changes:**
\`\`\`bash
git log --stat
\`\`\`

**Show actual changes:**
\`\`\`bash
git log -p
\`\`\`

**Pretty Formatting:**

\`\`\`bash
git log --pretty=format:"%h - %an, %ar : %s"
\`\`\`

Format placeholders:
• %h - Short hash
• %H - Full hash
• %an - Author name
• %ae - Author email
• %ar - Relative date
• %s - Subject (message)

**Filtering Commits:**

By author:
\`\`\`bash
git log --author="John"
\`\`\`

By date:
\`\`\`bash
git log --since="2024-01-01"
git log --until="2024-12-31"
\`\`\`

By file:
\`\`\`bash
git log -- filename.txt
\`\`\`

By message:
\`\`\`bash
git log --grep="fix"
\`\`\`

**Useful Aliases:**

Add to your .gitconfig:
\`\`\`
[alias]
    lg = log --oneline --graph --decorate
    history = log --pretty=format:'%h %ad | %s%d [%an]' --date=short
\`\`\`

**Pro Tips:**
1. Use --oneline for quick overview
2. Use --graph for branch visualization
3. Use -p to see what changed
4. Use --stat for file-level summary`,
        task: "Use 'git log' to view the commit history of your repository.",
        hint: "Try 'git log --oneline' for a compact view, or 'git log --graph' for a visual representation."
    }
};
