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

export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-questions",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
