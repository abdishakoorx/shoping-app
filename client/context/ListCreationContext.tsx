import { createContext, useContext, useState } from "react";

type ListCreationContextType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (emoji: string) => void;
};

const ListCreationContext = createContext<ListCreationContextType | undefined>(
  undefined
);

export default function ({ children }: { children: React.ReactNode }) {
  const [selectedEmoji, setSelectedEmoji] = useState("🎃");
  const [selectedColor, setSelectedColor] = useState("🎃");

  return (
    <ListCreationContext.Provider
      value={{
        selectedColor,
        selectedEmoji,
        setSelectedColor,
        setSelectedEmoji,
      }}
    >
      {children}{" "}
    </ListCreationContext.Provider>
  );
}


export function useListCreation(){
    const context = useContext(ListCreationContext)

    if (context === undefined) {
        throw new Error ("Please wrap the component inside the ListCreation provider")
    }

    return context
}