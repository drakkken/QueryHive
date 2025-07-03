"use client";
import { useTheme } from "@/contextProviders/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import { Sun, Moon } from "lucide-react";
import { themes } from "@/app/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="inline-block">
      <Menubar className="relative data-[state=open]:bg-transparent  border-none bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger
            className="focus:bg-transparent 
            data-[state=open]:bg-transparent
          "
          >
            {mode === "light" ? (
              <Sun
                className="w-20  rounded-full 
                   hover:scale-125 hover:animate-spin 
                   transition-transform duration-700 ease-in-out text-yellow-500
                    "
              />
            ) : (
              <Moon
                className="w-20 rounded-full 
                               hover:animate-bounce ease-in-out text-white 
                                "
              />
            )}
          </MenubarTrigger>
          <MenubarContent className="border rounded py-2 dark:bg-dark-300 dark:border-dark-400 w-max  absolute ">
            {themes.map((item, index) => (
              <React.Fragment key={item.name}>
                <MenubarItem
                  key={item.name}
                  className="dark:focus:bg-dark-400 flex items-center gap-4 px-2 py-2"
                  onClick={() => {
                    setMode(item.name);
                    if (item.name != "system") {
                      localStorage.theme = item.name;
                    } else {
                      localStorage.removeItem("theme");
                    }
                  }}
                >
                  {item.img}
                  {item.label}
                </MenubarItem>
                {index < themes.length - 1 ? <MenubarSeparator /> : null}
              </React.Fragment>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Theme;
