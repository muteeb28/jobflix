"use client";



interface JobFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    experienceLevel: string;
    onSelectExperience: (level: string) => void;
}

export default function JobFilter({
    categories,
    selectedCategory,
    onSelectCategory,
    experienceLevel,
    onSelectExperience,
}: JobFilterProps) {
    return (
        <div className="space-y-8 mb-12">
            {/* Experience Level Toggle */}
            <div className="flex justify-center">
                <div className="bg-neutral-100 p-1 border-2 border-neutral-200 inline-flex rounded-lg">
                    {["All", "Fresher/Internship", "Experienced"].map((level) => (
                        <button
                            key={level}
                            onClick={() => onSelectExperience(level)}
                            className={`px-6 py-2 text-sm font-bold uppercase tracking-wide transition-all ${experienceLevel === level
                                ? "bg-white text-black shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                : "text-neutral-900/60 hover:text-neutral-900 hover:bg-gray-800"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => onSelectCategory("All")}
                    className={`px-4 py-2 border-2 text-sm font-bold uppercase tracking-wide transition-all ${selectedCategory === "All"
                        ? "bg-white text-black border-white shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
                        : "bg-white text-neutral-900 border-neutral-200 hover:border-gray-600 text-neutral-900/60"
                        }`}
                >
                    All Roles
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 border-2 text-sm font-bold uppercase tracking-wide transition-all ${selectedCategory === category
                            ? "bg-white text-black border-white shadow-[4px_4px_0_rgba(255,255,255,0.2)]"
                            : "bg-white text-neutral-900 border-neutral-200 hover:border-gray-600 text-neutral-900/60"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
