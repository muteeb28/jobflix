export interface SubTopic {
    title: string;
    content: string;
}

export interface JavaLesson {
    title: string;
    subtopics: SubTopic[];
    task: string;
    hint: string;
    initialCode: string;
    lessonNumber?: string;
    sortOrder?: number;
}

export const javaLessonsData: Record<string, JavaLesson> = {
    "301": {
        title: "Java - Why Fundamentals Matter",
        lessonNumber: "1",
        sortOrder: 1,
        subtopics: [
            {
                title: "Topic 1: The Processor and What It Actually Understands",
                content: `What they lack is the fundamentals. Without understanding the fundamentals, they try to directly jump into a program and try to understand the syntax. My dear friends, that is not the way to learn programming. To understand any programming language, your fundamentals must be very strong.

Most of the people will try to teach you programming by directly writing a big program on the screen, which is what your professors and everyone have done. One big program. They will write and they will understand. This is method, this is variable, this is this, this is that. That is not the way to learn it. First we must understand the fundamentals.

Tell me, these days, computers are there in different forms. Your mobile phone is a computer. Laptop is a computer. Desktop is a computer. All of you will agree on this. Tell me, which is the most important component of that computer or a machine? Your answer must be CPU. CPU. Or I can also call it as processor or microprocessor.

This is my processor. CPU who is responsible for everything. You are able to play music, CPU is responsible. You are able to dial a number, this processor is responsible for it. In other words, everything which is happening in your device or machine, the responsible person is this CPU or this processor.

One information about this processor you must understand. This processor is of something called semiconductor technology device. Now again, in depth of semiconductor technology I am not going to discuss. But please understand one thing. A device will be called as semiconductor if it is made out of transistors.

Such a device which is made out of transistors can be called as semiconductor technology device. Now, if I say your processor is a semiconductor technology device, can I say that this particular processor is also made out of transistors? Yes.

Transistors are of two types, NPN and PNP. I need not again discuss in detail about transistors. One information about transistor you must know: transistor is such a device which understands only two things. Number one, it understands low voltage. Number two, it understands high voltage. High voltage does not mean some 500 or something. It is just five volt.

All the terminologies so far I have discussed are hardware terminologies - processor, semiconductor, transistors, 0 volt, 5 volt. But we are here to become software engineers. Being a software engineer, if you want to look at this, you have to come to a conclusion.

The most important device in our machine, which is responsible for everything, is the processor. And processor is of semiconductor technology. That means to make the processor, transistors are involved behind the scenes. And transistor understands low voltage and high voltage.

For low voltage and high voltage, in software engineering world we call it as 0 and 1. 0 and 1.

So we have come to one conclusion. The most important part of our device, the most important component of our computer, understands only two things - either 0 or 1. Apart from 0 and 1, it will not understand anything.

This processor is a dumb device. It cannot understand something by itself. If you want this processor to do something, you have to tell in a way he understands.`
            },
            {
                title: "Topic 2: Programming at the Machine Level",
                content: `Example, I want my processor to perform addition for me. I will tell in a way he understands. I want my processor to perform subtraction operation. I will say something like 1 0 0 1 0 1. I want it to do division operation. 0 0 1 0.

Of course, whatever I have written is not the actual instruction. This is just an example.

Now you are writing instructions. Instructions in a form which your machine understands. Machine understands what form? Zeros and ones.

Once you are writing instructions in a form which your machine understands, technically we call it as machine level language.

Now people started to write the program. Program is what again? All these instructions in one place is only called as program. Addition, subtraction, multiplication, division - so many instructions in one place is called a program.

Now you are writing program or application in which style of programming? Machine level language style of programming.

Now if you give these instructions to your processor, will you get the output? Yes, you will get the output because these instructions are written in machine level language, that is in the form of zeros and ones.

Will your processor understand zeros and ones? Yes. Will you get the output? Yes.

This was the first style of programming or coding.

If there is any small application or small program, writing in zeros and ones is okay. But if you want to write some big application, can you imagine writing lakhs and crores of instructions in zeros and ones?

If there is any error with zero, which one to rectify? Do not you think there is a headache here?

People were initially happy. Yes, we have found out such a machine where instructing it is doing some work for us. But that is not the way.`
            },
            {
                title: "Topic 3: Assembly Language and Assembler",
                content: `That is when some intellectuals came and told, look, now we have understood that we can give instruction to our processor to get our things done. Let us have a better approach of instructing.

Instead of writing in zeros and ones, let us use something called mnemonics. For add, we will say ADD. For subtraction, SUB. For multiplication, MUL. For division, DIV.

This style of writing instructions in mnemonics is technically called assembly level language.

Now if you have option to write instructions in mnemonics, will you go with zeros and ones? The answer is no.

So people started to develop programs in assembly level language.

Now tell me, if you give these instructions to your processor, will it be able to execute? The answer is no.

Processor says, look, I understand only two things - 0 and 1. You are telling ADD, SUB, MUL, DIV, AX, BX. I cannot understand that. You tell me something in 010101, I will do it.

That is when they came up with one system software. The name of the system software is assembler.

Assembler is a system software which will take assembly level language as input and convert it into machine level language.

Now if you give that machine level language to your processor, will you get the output? Yes, you will get the output.

Assembler is a system software which converts assembly level language into machine level language because developers have written code in mnemonics, but the machine understands only zeros and ones. The translator is called assembler.

Though this style is better than machine level language, it is still not very user friendly. Writing assembly requires deep knowledge of registers and microprocessors. There are many issues.

That is why people looked for an even better approach.`
            },
            {
                title: "Topic 4: High-Level Language and Compiler",
                content: `That is when again people thought, let us not use mnemonics also. Let us use English-like words and symbols.

Instead of ADD, just use plus.
Instead of SUB, just use minus.
Instead of writing instructions in register format, let us use words like print, scan, if, else.

In other words, the approach of writing instructions using symbols and English commands came into picture.

Writing instructions using symbols and English-like commands, technically we started to call it as high level language.

Now if you have the option to write programs in machine level language, assembly level language, and high level language, which one will you choose? Of course, high level language.

So people started writing instructions in high level language. Print, scan, if, else - so many instructions written together.

Now tell me, if you give this high level language program directly to your processor, will it be able to understand? No.

Processor understands only what? Only zeros and ones.

That is when people realized there is a problem, and the solution is called compiler.

Compiler is a system software which converts high level language into machine level language.

How exactly it converts is a different topic, but once it converts into machine level language and gives it to the processor, will you get the output? Yes, you will get the output.

This approach of programming started around the 1960s. Even today, in 2020 and beyond, we prefer to write instructions using English commands and symbols.

This is a general discussion to make you understand how programming started and how we reached here.`
            },
            {
                title: "Topic 5: Processor Executes, Hard Disk Stores",
                content: `One more important thing you must understand.

Processor is responsible to execute your program or instructions, not to store them.

Now you have written a program. Where is this program present? It is present on the hard disk.

Hard disk is a storage device. It uses magnetic technology.

Magnetic technology is slow in nature. Slow does not mean extremely slow, but it is slower when compared to semiconductor technology.

Processor is built using semiconductor technology and is very fast in nature.

Because of this difference in technology, there is a speed mismatch between hard disk and processor.

Hard disk sends instructions slowly. Processor executes instructions very fast. Because of this, processor has to wait for instructions.

Whenever there is a speed mismatch between two memory units within a system, the efficiency of the system will go down.`
            },
            {
                title: "Topic 6: Speed Mismatch Explained with Example",
                content: `Let me give you an example.

What is the speed of a Lamborghini or a BMW or a Mercedes? It can go up to 200 or 300 kilometers per hour.

Now what is the speed of a bullock cart? 15 or 20.

If you attach a Lamborghini engine to a bullock cart wheel, will it go at 300 km per hour? No.

Same goes here.

Processor is like a Ferrari or Lamborghini engine. Hard disk is like a bullock cart wheel. There is a speed mismatch.

Initially people thought the hard disk itself is the problem. Let us remove it.

Then they realized the problem is not that hard disk is bad. The problem is the technology behind it. Magnetic technology is slow, semiconductor technology is fast.

So the problem is speed mismatch.`
            },
            {
                title: "Topic 7: Introduction of RAM",
                content: `To solve this speed mismatch, people came up with one more memory unit which is also built using semiconductor technology.

This memory unit is called Random Access Memory, RAM.

They connected this RAM directly to the processor.

Now tell me, where are you writing your program? Are you writing directly on the hard disk? No. You are writing on RAM.

Who is responsible to execute the instructions? Processor.

Now RAM sends the instructions very fast, processor executes very fast, and you get the output.

RAM is also a semiconductor device. Processor is also a semiconductor device. So there is no speed mismatch.

RAM sends fast, processor executes fast.

The efficiency of the system improves.`
            },
            {
                title: "Topic 8: Advantage and Disadvantage of RAM",
                content: `The biggest advantage of RAM is that it is very fast. It is also very compact.

But there is a biggest disadvantage associated with RAM.

RAM is a volatile device.

Volatile means such a device for which continuous power supply has to be there. Even a fraction of a millisecond power gone, data is also gone.

Now imagine you are writing a program with lakhs of lines of code. Processor is executing, and suddenly power goes for a fraction of a second. Entire data and program vanish.

Is it acceptable? No.`
            },
            {
                title: "Topic 9: Why Hard Disk Is Still Needed",
                content: `That is when people looked back at the hard disk.

They realized not everything about hard disk is bad.

Hard disk is bulky and slow, but whatever stays in hard disk stays permanently unless and until you delete it. It is also cheap.

So they decided to use both RAM and hard disk together.

Hard disk is not connected directly to the processor. Hard disk is connected to RAM.

Processor executes. RAM sends instructions. Hard disk stores data permanently.`
            },
            {
                title: "Topic 10: Saving and Loading",
                content: `When you write a program, it is written in RAM.

But RAM is volatile. So if you want the program to stay permanently, you must copy it from RAM to hard disk.

This process is called saving.

That is why lab instructors always say, "Save the program."

Now once the program is saved on hard disk, and you want to execute it again, it has to come back to RAM.

The process of getting the program from hard disk to RAM is called loading.

That is why when you open a movie or song, you see "Loading...".

Once it is loaded into RAM, execution happens smoothly because RAM sends instructions fast and processor executes fast.`
            },
            {
                title: "Topic 11: Everyday Example",
                content: `When you type a phone number, initially it is stored in RAM.

If you switch off your phone immediately, the number is gone.

But if you save it, it is stored on hard disk.

Even if you switch off the phone for one year, the number will still be there because it was saved.`
            },
            {
                title: "Topic 12: Byte, File, and Register",
                content: `The place where data is stored in RAM is technically called a byte.

The place where data is stored permanently on hard disk is called a file.

The place inside the processor where data is kept for execution is called a register.

That is why register is faster than byte, and byte is faster than file.

RAM is also called primary memory or main memory because it is directly connected to the processor.

Hard disk is called secondary memory because it is not directly connected to the processor.`
            },
            {
                title: "Topic 13: Cache Memory",
                content: `There is also something called cache memory.

If you execute the same application again and again, processor understands this and stores the instructions in cache.

Cache is closer to processor than RAM and is faster than RAM.

Next time you open the same application, processor may take instructions directly from cache instead of RAM, making execution even faster.`
            },
            {
                title: "Topic 14: RAM Size and Performance",
                content: `Everything that has to execute must come to RAM.

If RAM is full, system will slow down or hang.

That is why more RAM generally gives better performance.`
            },
            {
                title: "Topic 15: Hard Disk vs SSD",
                content: `Hard disk uses magnetic technology.

SSD uses semiconductor technology and is faster.

SSD is non-volatile using flash memory but is costlier because semiconductor technology is expensive.

That is why SSD is faster and costlier than hard disk.`
            },
            {
                title: "Topic 16: Object File and Executable File",
                content: `Before understanding Java execution, one more concept is required.

Object file is a file in which code is present in machine level language, but it is incomplete.

Executable file is a file in which code is present in machine level language and is complete.

Why is object file incomplete?

Because in your entire life, you have never written a program completely by yourself. Many functions like printf or scanf already have their logic written in library files.

When you compile a program, compiler converts your code into machine level language and generates an object file.

But object file is incomplete because library code is not yet linked.

Linker takes object file and required library files and combines them to generate executable file.

Loader then loads the executable file into RAM and processor executes it.`
            }
        ],
        task: "Summarize why fundamentals matter and explain how processors execute instructions.",
        hint: "Connect the ideas: processor -> machine language -> translators -> memory hierarchy.",
        initialCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Fundamentals first.");
    }
}`
    },
    "302": {
        title: "Java - Brief Introduction and Why Java Became Popular",
        lessonNumber: "2",
        sortOrder: 2,
        subtopics: [
            {
                title: "Topic 1: Before Java - C and C++ Were Ruling",
                content: `And we know all the concept which we have iterated, which I have iterated.

Before Java, two programming languages were ruling. That happens to be C and C++. They were the kings. Everyone around the globe were using these programming languages. Whenever you had to develop a software, people used C and C++.

C is project led by a famous personality called as Dennis Ritchie. C++ is by Bjarne Stroustrup. It was in 1970s and 1980s. Both the programming languages were ruling the world.

Now, the project of Java started in the year 1991.

A famous company in the Bay Area, USA, California - company by the name Sun Microsystems - they were famous for setup box TV sets, all of that domain. They planned to create one programming language to create software which are related to the setup box and all.

For that, they recruited a team. The team consists of Patrick Naughton, Mike Sheridan, James Gosling, all of them, and the lead of the entire team was James Gosling.

They had to create such a programming language which is very easy to understand. It should be high level language. Object oriented it should be. And the most important: it should be portable or it should be platform independent.

That time Internet was very, very new. And whatever software used to develop using C and C++, they were not portable. They were platform dependent. What is platform dependent, we will understand practically, need not to worry.

By the year 1995, the programming language was almost ready. And whenever they want to release any project, they do not release actual version directly. Trial version - in software term we call it as alpha and beta version.

So alpha and beta version came in 1995.`
            },
            {
                title: "Topic 2: The Biggest Steps - Freely Downloadable and Open Source",
                content: `The biggest step which James Gosling and team at Sun Microsystems took is: they made it as freely downloadable.

They told it is free of cost. Because C and C++ already popular in the world, why the entire world have to listen to a small startup claiming they have a good programming language?

Second biggest step: they told it is open source.

Freely downloadable means anyone can download free of cost and they can use it.

Open source means if some developer from different companies, intellectuals from different companies, if they feel there has to be any change in this programming language, they can give the suggestion. Developers who are working in different companies can also contribute. Anyone can contribute.

People started to use it, use it, use it. They felt, oh, this has to be added. It should be multithreading added. So many people contributed, they started to give.

After some time, they felt Java already so many features are there, now it is in a position to start developing the software. And that is where in the year 1996, January 1996, officially they released Java 1.0.

From there the Java journey started.

Because it was open source, so many around the globe contributed to Java. Day by day, many features added. It became very rich in features, using which any kind of applications or software can be built.

Even before this, the one major feature which decided the destiny of Java is that it is platform independent, it is portable.

Back then it was the first programming language which became portable after Internet came. Before Internet, portability was not the requirement.

When networking around the globe happened - intra and inter - then portability became important. That is when people also call Java as architectural neutral or Internet programming language.

All the terms used here - object oriented, portable, platform independent, platform dependent - as a mentor I am aware 90% of the class strength has zero idea. I am going to give complete clarity. These are the biggest steps and reasons for Java success.`
            },
            {
                title: "Topic 3: Why the Name \"Java\", Oracle Acquisition, and Where Java Stands",
                content: `Initially they tried different names. Whenever a group is formed to do any project, there will be a team name. The team name (for the team) was Green Team. They tried names, they failed. They named it C++ minus minus and different different names. Not matching, lot of difficulty.

They realized it is a very big project. Other programming languages were doing very well. People used to demotivate them: already C++ is there, what project you are doing, no one will use it.

That time they used to have a sip of coffee. And they felt after failing with all the names, this coffee is responsible for our success. It used to give motivated. Whenever we used to drink it, we used to get regenerated, energy back.

Let us dedicate our entire project name to this coffee.

And they named that programming language as Java. Java is a coffee plant or island which is located in Indonesia. Whatever coffee they used to drink, it was coming from there. Name and symbol both are dedicated to that - coffee steam coming out.

That is a fact.

Now, when Oracle bought it - it was bought by Oracle in the year 2011. Oracle not just acquired Java, they acquired Sun Microsystems.

And after acquiring, they made it as closed doors.

Now do not panic that Java may go down. Java will never go down. From 1995 till today, Java will be there in top five programming languages every year. Sometimes first, sometimes second, sometimes third. It is the constant programming language which is there in top five across the world.

Lakhs of projects have been developed using Java. Lot of engineers are required, so Java will never go down. If MNC want to develop distributed applications, they have already one option to go with - that happens to be Java.

Many programming language comes and go. Java will never be affected.

This is the brief introduction about Java.

Now, if you have understood the overview:

Java alpha and beta version came in 1995

Official Java 1.0 came in January 1996

Whenever you hear the term Java, you will also hear it is object oriented, platform independent, portable - all the terms are almost same, referring to almost same.

It is also called as Internet programming language. When Internet came, this became the first popular programming language on planet Earth which can be ported over the Internet, transported anywhere around the globe.

Why? You have to understand the architecture of Java: how Java executes, what is bytecode - all of that we are going to understand. It is very, very important.

We will discuss JVM, JDK, bytecode, platform independent, portable - all of that we are going to be discussing in detail manner.`
            },
            {
                title: "Topic 4: What Is a Platform?",
                content: `The first part we are going to understand here is about portability, or platform independency, or WORA.

Before we understand these terms, let us understand platform dependency.
And even before that, let us understand what is platform.

Platform means it is a combination of processor and operating system.

Processor is the semiconductor chip.
Operating system is the one which operates by interacting with the processor.

So, Intel processor + Windows OS - this combination is called a platform.
Macintosh OS + M1 or M2 chip - this is Macintosh platform.
Intel processor + Linux OS - that is another platform.

This is from the perspective of a software engineer.

Now please understand this very carefully.

There is one computer here.
There is another computer somewhere else.
Underlying OS may be different. One may be Windows, one may be Linux.

All of them are connected over a network - wired or wireless.
Right now, my laptop is connected to your laptop or mobile phone over a network. That is what we mean.`
            },
            {
                title: "Topic 5: Program, Compilation, and Execution on a Platform",
                content: `One more basic thing, guys.

Program, application, app, software - all are referring to the same thing.

If you have written one Hello World program, that itself is a Hello World application.
Console-based application. Software program. All are same.

Now listen carefully.

I am going to develop a software using C.

I compile the program.
I execute the program.
I get the output.

Now tell me:

In which platform have you compiled?
Windows.

In which platform have you executed?
Windows.

Will you get the result?
Yes, you will get the result.

Now focus.

The actual source code will never be transported.
Only the compiled code will be transported.

Whatever is uploaded is not the high-level code.
What is uploaded is the compiled executable code.

Now this compiled code is downloaded in another system.

Case 1:
Compiled in Windows, executed in Windows -> you get output.

Case 2:
Compiled in Windows, executed in another Windows machine -> you still get output.

Now comes the important case.

Case 3:
Compiled in Windows, executed in Linux.

Will you get the output?

The answer is NO.`
            },
            {
                title: "Topic 6: Why C and C++ Are Platform Dependent",
                content: `Now listen very carefully.

C and C++ follow a particular architecture behind the scenes.

They are compiled.
Object file is generated.
Linking happens.
Executable file is generated.

Finally, you get an executable file in machine-level language.

Now this machine-level language has one important nature.

Machine-level language is always platform dependent.

That means:

If I became machine-level code in Windows,
I will work only on Windows.

I am loyal only to Windows.

If you try to execute me on Linux, I will not work.

I will say:
"I became machine-level in Windows.
You are trying to execute me in Linux.
I cannot execute."

That is the reason:

If compilation platform and execution platform must be the same,
then such a programming language is called platform dependent programming language.

C is platform dependent.
C++ is platform dependent.

Why?
Because of the architecture they follow.

This is also called non-portable.

Why non-portable?
Because you cannot port the compiled code to another platform and execute it.

So remember this definition clearly:

If a programming language demands that platform of compilation and platform of execution must be the same, then such a programming language is called platform dependent programming language.`
            },
            {
                title: "Topic 7: The Big Question - Then How Does Java Work?",
                content: `Now listen carefully.

Java is also written using English-like commands and symbols.

Machine understands only 0 and 1.

So Java must also be converted into machine-level language.

Agree?
Yes.

Now tell me something.

Machine-level language has one problem:
It is always platform dependent.

Then how did Java come into picture?

What is the extra effort Java got into picture?
Because of which it achieved platform independency?

This is the most important turning point.

That is what we are going to discuss next.

Give maximum focus.
From interview point of view also, this is very, very important.`
            },
            {
                title: "Topic 8: Java Compilation and Bytecode",
                content: `I will assume this is one computer with underlying operating system as Windows.
This is one more computer with underlying operating system as Macintosh.
This is one more computer with underlying OS considered as Linux.

Over the network or Internet, all of them are connected with each other.

Now please see very carefully, guys.

I am developing a software here using Java, which is also a high-level kind of language.

Whatever source file - a Java file - everything, please listen to me very carefully.

You write the Java program.
Then what you have to do? You have to compile it.

Now till the end, you will understand everything.

Java has not made use of an ordinary compiler.
Rather, Java has used its own special compiler, or we also call it a hybrid compiler.

They named it as Java Compiler.

Java compiler is a special compiler.

Now understand this point very clearly.

If Java also used an ordinary compiler, then it would again convert into machine-level language, and the same problem would come - platform dependency.

So Java people did something different.

They said:
Let us not convert high-level language directly into machine-level language.

Instead, let us convert it into intermediate-level code.

These codes are neither high-level nor machine-level.

Practically also, I will show you these bytecodes - how they look - in the next class.

Now one simple question.

If you compile a Java file, what do you get?

Do you get machine-level code?
Or do you get bytecodes?

You get bytecodes.

This point must be very clear.`
            },
            {
                title: "Topic 9: JVM and Execution on Different Platforms",
                content: `Now please see very carefully.

These bytecodes have a specific role.

Bytecodes cannot be understood directly by the hardware.

So Java provides a complete kit.

This kit consists of:

Compiler

Library files

JVM

This entire kit required to develop Java applications is what we generally install.

Now listen carefully.

JVM will convert these bytecodes into machine-understandable language.

But here is the important part.

JVM is platform specific.

Windows has its own JVM.
Macintosh has its own JVM.
Linux has its own JVM.

Now focus.

I upload bytecodes, not machine-level code.

Bytecodes are platform independent.

Now I download these bytecodes on a Windows machine.

Will I get the output?
Yes.

Now I download the same bytecodes on a Macintosh machine.

Will I get the output?
Yes.

Now I download the same bytecodes on a Linux machine.

Will I get the output?
Yes.

Why?

Because internally, JVM makes use of interpretation and converts bytecodes into machine-level language specific to that platform, and then execution happens.

You do not even realize this is happening behind the scenes.

This is where many people get confused.

They say, "Sir, what is actually happening?"

That is exactly what is happening.`
            },
            {
                title: "Topic 10: Final Conclusion - Why Java Is Platform Independent (WORA)",
                content: `Now let me give you a sweet conclusion.

Write Java application.

Java compiler generates bytecodes.

Are bytecodes platform dependent or platform independent?

Bytecodes are platform independent.

That is why Java bytecodes can travel over the Internet.

That is why Java is called:

Portable

Platform independent

WORA - Write Once, Run Anywhere

Internet programming language

Internally, JVM takes care of converting bytecodes into machine-level language suitable for the platform.

That is the reason Java solved the platform dependency problem.

This is the core idea.

If you understand this, half of Java is already clear.`
            },
            {
                title: "Topic 11: What Is Architecture (Architect)?",
                content: `Now, listen to me very carefully.

When we talk about architecture, we are talking about the process a programming language follows internally to execute a program.

It answers questions like:

How the program is compiled

What kind of code is generated

How execution happens

Why it is fast or slow compared to other languages

So architecture is not syntax, not keywords.
Architecture is the execution design of a programming language.`
            },
            {
                title: "Topic 12: Java Architecture vs C / C++",
                content: `Now understand this clearly. This is an interview answer.

Java follows a longer execution process compared to C and C++.

In Java:

Source code

Java compiler

Bytecode

JVM

Execution

Because the process is a little lengthy, Java is comparatively slower than C and C++.

C and C++ directly convert into machine-level code for a platform and execute.
Java goes through bytecode and JVM.

So yes:

Java is very fast

But comparatively, it is slower than C and C++

This difference exists because of the architecture process of execution.

This point itself is enough for interviews.`
            },
            {
                title: "Topic 13: Java Program - Source File and Compilation",
                content: `Now listen carefully.

You write a Java program.
You save it.

When you save it, whatever name you give - for example Launch.java - it must end with .java.

So we call this file a Java source file.

This is the first step.

Source file
Saved with .java extension

Is this clear? Tick mark.`
            },
            {
                title: "Topic 14: Java Compiler and Bytecode",
                content: `Next step.

You give this Java source file to the Java compiler.

When Java compiler compiles your Java file, what does it generate?

It generates bytecode.

Bytecode is:

Not high-level language

Not machine-level language

It is intermediate-level language

Now understand this clearly.

Wherever bytecodes are present, the file name is called a class file.

Example:

Launch.java -> compiled -> Launch.class

So:

Java file contains source code

Class file contains bytecode

This is a very common interview question.`
            },
            {
                title: "Topic 15: Class File and Internet Transport",
                content: `Now another important question.

Which file is uploaded or transported over the Internet?

Is it the Java file?
No.

Is it machine-level code?
No.

It is the class file, which contains bytecode.

Bytecodes are platform independent, so they can be transported over a network or Internet.

This is one of the biggest reasons Java succeeded.`
            },
            {
                title: "Topic 16: JVM and Execution",
                content: `Now what happens next?

The class file (bytecode) is given to the JVM.

JVM is platform dependent:

Windows JVM

Mac JVM

Linux JVM

Internally, JVM converts bytecode into machine-understandable language for that platform and executes it.

This is why:

Same bytecode works on different platforms

But JVM is different for each platform`
            },
            {
                title: "Topic 17: Final Execution Flow (Interview-Ready)",
                content: `Now listen carefully. This is exact interview wording.

Whenever we write a Java program:

We save it as a Java source file

Java compiler compiles it

Compiler generates bytecode

Bytecode is stored in class file

Class file is platform independent

Class file is given to JVM

JVM executes it on the respective platform

Because Java follows this architecture, Java achieved platform independence.

C and C++ could not achieve this because of their execution architecture.`
            },
            {
                title: "Topic 18: Compiler vs Interpreter (Core Concept)",
                content: `Now one more important concept.

Compiler:

Translates the entire code at once

Produces compiled output

Then execution happens

Interpreter:

Works line by line

First line -> execute

Second line -> execute

Third line -> execute

Languages like Python and JavaScript follow interpretation at execution stage.`
            },
            {
                title: "Topic 19: Why Java Is Both Compiled and Interpreted",
                content: `Now this is very important.

Java uses both compiler and interpreter.

First:

Java compiler compiles entire code

Generates bytecode (all at once)

Then:

JVM internally uses an interpreter

Bytecode is executed line by line

That is why Java is called:

Compiled language

Interpreted language

Hybrid programming language

More details like JIT, JVM internals - we will discuss in JVM architecture later.`
            },
            {
                title: "Topic 20: Final Conclusion (Architecture Summary)",
                content: `Because of this architecture:

Java generates bytecode

Bytecode is platform independent

Bytecode can travel over Internet

JVM executes bytecode on any platform

That is why we say:

Java is platform independent

Java follows WORA

Java is portable

Java is Internet programming language

This is the architectural reason, not marketing.`
            }
        ],
        task: "Explain why Java became popular and how bytecode enables platform independence.",
        hint: "Connect the timeline, portability, bytecode, and JVM to WORA.",
        initialCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java bytecode enables WORA.");
    }
}`
    },
    "303": {
        title: "Q & A - Java - Why Fundamentals Matter",
        lessonNumber: "1.1",
        sortOrder: 1.1,
        subtopics: [
            {
                title: "Q1: After compilation, why is the generated code still incomplete?",
                content: `A. Because whatever code we write is never guaranteed to be perfect or complete. If a complete executable file were generated every time, it would waste time and resources. That is why compilation produces an incomplete output first. This intermediate stage exists for efficiency and optimization. The deeper reason involves time complexity, which will be understood later.`
            },
            {
                title: "Q2: What is an assembler?",
                content: `A. Assembler is a software which is used to convert assembly-level language into machine-level language.`
            },
            {
                title: "Q3: What is a compiler?",
                content: `A. Compiler is a software which is used to convert high-level language, that is English-like commands and symbols, into machine-level language.`
            },
            {
                title: "Q4: Do assembler and compiler do the same thing?",
                content: `A. No. Both convert instructions to machine-level language, but assembler starts from assembly-level language, while compiler starts from high-level language.`
            },
            {
                title: "Q5: Does the processor have its own memory?",
                content: `A. Yes. The processor has memory in the form of registers and cache.`
            },
            {
                title: "Q6: Can programmers control cache memory directly?",
                content: `A. No. Cache memory is recognized and managed by system software like the operating system or runtime environment. Programmers do not have direct control over cache.`
            },
            {
                title: "Q7: How does cache recognize repeated instructions?",
                content: `A. Cache automatically detects repeated execution patterns. If the same application or instructions are executed multiple times, the processor stores them in cache for faster execution.`
            },
            {
                title: "Q8: What exactly is semiconductor technology in simple terms?",
                content: `A. Semiconductor technology uses components like transistors that understand only two states. These two states are represented as 0 and 1.`
            },
            {
                title: "Q9: Why do we write programs in RAM if we must save them to the hard disk?",
                content: `A. Because execution happens from RAM. RAM is fast but volatile. Hard disk is slow but permanent. Programs must be in RAM to execute and must be saved to hard disk to stay permanently.`
            },
            {
                title: "Q10: What does saving a program actually mean?",
                content: `A. Saving means copying data from RAM to the hard disk so that it stays permanently unless deleted.`
            },
            {
                title: "Q11: What does loading mean?",
                content: `A. Loading means bringing a program from the hard disk into RAM so that it can be executed by the processor.`
            },
            {
                title: "Q12: What is a byte in terms of memory?",
                content: `A. A byte refers to a storage location in RAM.`
            },
            {
                title: "Q13: What is a file in memory terms?",
                content: `A. A file refers to data stored permanently on the hard disk.`
            },
            {
                title: "Q14: What is a register?",
                content: `A. A register is a small storage unit inside the CPU used for immediate execution of instructions.`
            },
            {
                title: "Q15: Which is faster: register, byte, or file?",
                content: `A. Register is fastest, byte (RAM) is next, and file (hard disk) is slowest.`
            },
            {
                title: "Q16: Why are library files binary but still usable?",
                content: `A. Library files are already compiled into machine-level code. During execution, they are linked directly. No further compilation is required.`
            },
            {
                title: "Q17: If I open the same application daily, will cache be used?",
                content: `A. Cache may be used only if the system has not been completely shut down. If the system is powered off, cache and RAM are cleared.`
            },
            {
                title: "Q18: When a file is loaded from hard disk to RAM, does it become bytes?",
                content: `A. Yes. Once loaded into RAM, data is stored as bytes.`
            },
            {
                title: "Q19: Who is responsible for loading files from disk to RAM?",
                content: `A. The operating system is responsible. The CPU only executes machine-level instructions.`
            },
            {
                title: "Q20: What is a linker?",
                content: `A. Linker is a software that links object files with required library files and generates a complete executable file.`
            },
            {
                title: "Q21: What is a loader?",
                content: `A. Loader is a software that loads the executable file into RAM and prepares it for execution by the CPU.`
            },
            {
                title: "Q22: What all comes when we install C language?",
                content: `A. Compiler, linker, loader, and standard library files.`
            },
            {
                title: "Q23: Why are Java tools and versions not discussed immediately?",
                content: `A. Because without understanding execution fundamentals, tool and version discussions do not make sense.`
            },
            {
                title: "Q24: Why are fundamentals taught before Java?",
                content: `A. Because Java's execution model only makes sense after understanding RAM, hard disk, compilation, linking, loading, and machine-level execution.`
            },
            {
                title: "Q25: What comes next after these fundamentals?",
                content: `A. Java execution model: source file, class file, bytecode, JVM, and why Java is both compiled and interpreted.`
            }
        ],
        task: "Review the fundamentals Q & A and summarize the execution flow in your own words.",
        hint: "Focus on compilation, linking, loading, memory hierarchy, and platform execution.",
        initialCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Fundamentals Q & A review.");
    }
}`
    },
    "304": {
        title: "Q & A - Java - Brief Introduction",
        lessonNumber: "2.1",
        sortOrder: 2.1,
        subtopics: [
            {
                title: "Q1: What is the difference between MLL and Bytecode?",
                content: `Answer:
MLL contains instructions in zeros and ones.
Bytecode contains instructions neither in high-level language nor in machine-level language.
You will not find bytecode instructions in zeros and ones, and you will not find them in high-level language either.
It is an intermediate format.`
            },
            {
                title: "Q2: What exactly does Bytecode contain?",
                content: `Answer:
Bytecode contains instructions neither in high-level nor in machine-level.
It is a mixed format.
Bytecode is present inside the class file.`
            },
            {
                title: "Q3: Is Bytecode high-level or machine-level?",
                content: `Answer:
No.
Bytecode is neither high-level nor machine-level.
It is intermediate-level language.`
            },
            {
                title: "Q4: What is meant by Architectural Neutral?",
                content: `Answer:
Architectural neutral means write code once in any platform and run the code in any other platform without worrying about the architecture.`
            },
            {
                title: "Q5: What is another name for Architectural Neutral?",
                content: `Answer:
Architectural neutral is also referred as:
Write Once Run Anywhere
WORA
Platform independent`
            },
            {
                title: "Q6: Why is Java called Architectural Neutral?",
                content: `Answer:
Because Java generates bytecode, and the same bytecode can be executed on:
Windows JVM
Linux JVM
Mac JVM
The architecture does not matter.`
            },
            {
                title: "Q7: What is JIT?",
                content: `Answer:
JIT stands for Just In Time Compiler.
It is a special compiler service.
It is a part of JVM interpretation process.
Details will be discussed in JDK architecture.`
            },
            {
                title: "Q8: Why is Java both compiled and interpreted?",
                content: `Answer:
Java first uses a compiler to generate bytecode.
Later, JVM uses interpretation to execute bytecode line by line.
That is why Java is both compiled and interpreted.`
            },
            {
                title: "Q9: What is the output of a C compiler?",
                content: `Answer:
The output is an OBJ file.`
            },
            {
                title: "Q10: What does an OBJ file contain?",
                content: `Answer:
OBJ file contains instructions in machine-level language (MLL).`
            },
            {
                title: "Q11: Can an OBJ file run on different platforms?",
                content: `Answer:
No.
If it is compiled on Windows, it will run only on Windows.
If you try to run it on Linux or Mac, it will not work.`
            },
            {
                title: "Q12: What is the output of Java compiler?",
                content: `Answer:
The output is not an OBJ file.
The output is a class file.`
            },
            {
                title: "Q13: What does a Java class file contain?",
                content: `Answer:
Class file contains bytecode.
Bytecode is neither machine-level nor high-level.`
            },
            {
                title: "Q14: Why is Java better in portability than C?",
                content: `Answer:
C generates machine-level code, which is platform dependent.
Java generates bytecode, which is platform independent.`
            },
            {
                title: "Q15: Can the same class file run on Windows, Linux, and Mac?",
                content: `Answer:
Yes.
If you give the same class file to:
JVM of Windows
JVM of Linux
JVM of Mac
It will run in all platforms.`
            },
            {
                title: "Q16: What is platform dependency?",
                content: `Answer:
If a language generates machine-level code directly,
that code can run only on the platform where it was compiled.
That language is platform dependent.`
            },
            {
                title: "Q17: Why C is platform dependent?",
                content: `Answer:
Because C compiler generates machine-level language directly.
Machine-level code works only on the same platform.`
            },
            {
                title: "Q18: Can bytecode be converted to assembly language?",
                content: `Answer:
No.
It is not possible.`
            },
            {
                title: "Q19: How is a class file transferred over the Internet?",
                content: `Answer:
It is transferred as a JAR file.`
            },
            {
                title: "Q20: Why Java is machine independent even though JVM is platform dependent?",
                content: `Answer:
Because Java distributes bytecode, not machine-level code.
JVM converts bytecode into machine-level code specific to that platform.`
            },
            {
                title: "Q21: What does interpretation mean?",
                content: `Answer:
Interpretation means line by line execution.`
            },
            {
                title: "Q22: Performance-wise, which is better: compiled or interpreted?",
                content: `Answer:
Compiled language is better in performance.`
            },
            {
                title: "Q23: What comes when you install JDK?",
                content: `Answer:
JDK installation gives:
Compiler
JRE
JVM
Library tools
Everything required to develop and run Java applications.`
            },
            {
                title: "Q24: What is inside JRE?",
                content: `Answer:
JRE contains:
JVM
Library files
Supporting tools`
            },
            {
                title: "Q25: Who should install JDK and who should install JRE?",
                content: `Answer:
Developer should install JDK
End user should install JRE only`
            },
            {
                title: "Q26: Why developer needs JDK?",
                content: `Answer:
Developer needs:
Compiler to test the code
JVM to run the code
So developer must install JDK.`
            },
            {
                title: "Q27: Why end user does not need JDK?",
                content: `Answer:
End user only runs the application.
For running, JRE is sufficient.`
            },
            {
                title: "Q28: What is source code in Java?",
                content: `Answer:
Java source code is high-level language code written by the developer.
It is given as input to the compiler.`
            },
            {
                title: "Q29: What is the input to JVM?",
                content: `Answer:
The input to JVM is the class file (bytecode).`
            },
            {
                title: "Q30: Why Java does not have .exe file?",
                content: `Answer:
Because Java does not generate machine-level executable files.
It generates class files, which are executed by JVM.`
            }
        ],
        task: "Review the Q & A on Java portability and execution details.",
        hint: "Focus on bytecode, JVM, compilation outputs, and platform dependency.",
        initialCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java 2.1 Q & A review.");
    }
}`
    }
};
