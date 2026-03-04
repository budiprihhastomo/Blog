import { useState, useEffect, useMemo } from "react";

interface UseSearchFilterOptions<T> {
  items: T[];
  searchKeys: (keyof T)[];
}

interface UseSearchFilterReturn<T> {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredItems: T[];
  isSearchFocused: boolean;
  setIsSearchFocused: (focused: boolean) => void;
  clearFilters: () => void;
}

export function useSearchFilter<T extends Record<string, unknown>>({
  items,
  searchKeys,
}: UseSearchFilterOptions<T>): UseSearchFilterReturn<T> {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        searchKeys.some((key) => {
          const value = item[key];
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });

      return matchesSearch;
    });

    setFilteredItems(filtered);
  }, [searchTerm, items, searchKeys]);

  const clearFilters = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    isSearchFocused,
    setIsSearchFocused,
    clearFilters,
  };
}

export function useFilter<T>({
  items,
  searchTerm,
  categoryKey,
  selectedCategory,
  tagKey,
  selectedTag,
}: {
  items: T[];
  searchTerm: string;
  categoryKey?: keyof T;
  selectedCategory?: string;
  tagKey?: keyof T;
  selectedTag?: string;
}): T[] {
  return useMemo(() => {
    return items.filter((item) => {
      const itemAny = item as Record<string, unknown>;
      
      const matchesSearch =
        searchTerm === "" ||
        Object.values(itemAny).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });

      const matchesCategory =
        !categoryKey ||
        !selectedCategory ||
        itemAny[categoryKey as string] === selectedCategory;

      const matchesTag =
        !tagKey ||
        !selectedTag ||
        (Array.isArray(itemAny[tagKey as string]) &&
          (itemAny[tagKey as string] as unknown[]).includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [items, searchTerm, categoryKey, selectedCategory, tagKey, selectedTag]);
}
