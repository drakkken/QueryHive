import { Sun, Moon, Monitor } from "lucide-react"; // ✅ import Monitor icon

export const themes = [
  {
    name: "light",
    label: "Light",
    img: (
      <Sun
        className="w-20 rounded-full 
          hover:scale-125 hover:animate-spin 
          transition-transform duration-700 ease-in-out text-yellow-500"
      />
    ),
  },
  {
    name: "dark",
    label: "Dark",
    img: (
      <Moon
        className="w-20 rounded-full 
          hover:animate-bounce ease-in-out text-black dark:text-white"
      />
    ),
  },
  {
    name: "system",
    label: "System",
    img: (
      <Monitor
        className="w-20 rounded-full 
          hover:rotate-12 transition-transform duration-500 text-gray-400 dark:text-white"
      />
    ),
  },
];
