import { motion } from "framer-motion";

interface PlanetCategoryIndicatorProps {
    radius: number;
}

const categories = [
    { name: "Earth-like", max: 1.25, color: "bg-blue-500" },
    { name: "Super Earth", max: 2, color: "bg-emerald-500" },
    { name: "Mini Neptune", max: 4, color: "bg-teal-500" },
    { name: "Neptune-like", max: 10, color: "bg-cyan-600" },
    { name: "Gas Giant", max: Infinity, color: "bg-purple-600" },
];

const PlanetCategoryIndicator = ({ radius }: PlanetCategoryIndicatorProps) => {
    const currentCategoryIndex = categories.findIndex((c) => radius < c.max) !== -1
        ? categories.findIndex((c) => radius < c.max)
        : categories.length - 1;

    const currentCategory = categories[currentCategoryIndex];

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="mb-6 text-center">
                <h4 className="font-display text-lg text-primary">{currentCategory.name}</h4>
                <p className="font-body text-sm text-muted-foreground">{radius.toFixed(2)} Earth Radii</p>
            </div>

            <div className="relative w-full max-w-2xl h-12 flex rounded-lg overflow-hidden bg-secondary/20">
                {categories.map((cat, idx) => (
                    <div
                        key={cat.name}
                        className={`flex-1 h-full flex flex-col items-center justify-center border-r border-background/50 relative ${idx === currentCategoryIndex ? cat.color + ' bg-opacity-80' : 'bg-transparent'
                            } transition-colors duration-500`}
                    >
                        <span className={`text-[10px] md:text-xs font-display tracking-wider z-10 ${idx === currentCategoryIndex ? 'text-white' : 'text-muted-foreground'
                            }`}>
                            {cat.name}
                        </span>
                    </div>
                ))}

                {/* Animated indicator arrow */}
                <motion.div
                    className="absolute top-0 z-20"
                    initial={{ left: "0%" }}
                    animate={{
                        left: `${currentCategoryIndex === categories.length - 1 ? 90 : (currentCategoryIndex * 20) + 10}%`
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 10 }}
                >
                    <div className="absolute -top-3 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-primary" />
                </motion.div>
            </div>
        </div>
    );
};

export default PlanetCategoryIndicator;
