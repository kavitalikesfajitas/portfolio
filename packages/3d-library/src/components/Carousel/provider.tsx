import { createContext, useContext, useState } from "react";

export type CarouselContextType = {
  selectedIndex: number;
  setSelectedIndex: (selectedIndex: number) => void;
  items?: any[];
  setItems: (items: any[]) => void;
};

export const CarouselContext = createContext<CarouselContextType | null>(null);

export function useCarouselContext() {
  return useContext(CarouselContext);
}

export function CarouselContextProvider(props: { children: React.ReactNode }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [items, setItems] = useState<any[]>([]);

  const value = {
    selectedIndex,
    setSelectedIndex,
    items,
    setItems,
  };

  return (
    <CarouselContext.Provider value={value}>
      {props.children}
    </CarouselContext.Provider>
  );
}
