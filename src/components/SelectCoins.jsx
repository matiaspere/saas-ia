"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectCoins = ({ coins, selectedCoin, setSelectedCoin }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between capitalize"
        >
          {selectedCoin ? selectedCoin : "Seleccionar moneda..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <div className="flex items-center px-3 h-8" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 " />
            <input
              placeholder="Seleccionar moneda..."
              className="flex items-center text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={inputValue}
              onChange={handleInput}
            />
          </div> */}
          <CommandInput placeholder="Buscar moneda..." className="h-9" />

          <CommandEmpty>No se encontró la moneda</CommandEmpty>
          <CommandGroup>
            {coins?.map((coin) => (
              <CommandItem
                key={coin.id}
                selectedCoin={coin.name}
                onSelect={(currentValue) => {
                  setSelectedCoin(currentValue);
                  setOpen(false);
                }}
              >
                {coin.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedCoin === coin.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCoins;
