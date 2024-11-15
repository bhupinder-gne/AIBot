import { HeaderProps } from "@/models";
import { FaBars } from "react-icons/fa";

export default function Header({
  onTabClicked,
  tabs,
  onDrawerOpen,
}: HeaderProps) {
  return (
    <header className="text-2xl font-bold mb-4">
      <nav className="flex items-center text-lg font-medium ">
        <div className="flex items-center justify-center p-2 mr-4">
          <FaBars
            onClick={() => onDrawerOpen(true)}
            className="cursor-pointer"
            type="button"
            aria-controls="drawer-navigation"
            size={24}
          />
        </div>

        <ul className="flex w-full text-center space-x-2">
          {tabs.map(({ label, isActive }, index) => (
            <li key={index} className="w-full focus-within:z-10">
              <a
                className={`inline-block w-full p-4 ${
                  isActive
                    ? "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white"
                    : "bg-white dark:bg-gray-800 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700"
                } ${
                  index === 0 ? "rounded-s-lg" : "rounded-e-lg border-s-0"
                } border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none text-gray-500 shadow dark:divide-gray-700 dark:text-gray-400`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onTabClicked(label)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
