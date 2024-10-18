"use client"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {format} from "date-fns";
export default function PopoverBug() {
  const [openCalendar, setOpenCalendar] =useState(false);
  const [dateState, setDateState] = useState<Date | undefined>(undefined);
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Button>open</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px] max-h-[95vh] gap-4 rounded-2xl py-8 px-14 overflow-y-scroll">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`input-${index}`} className="block text-sm font-medium text-gray-700">
              Label {index + 1}
            </label>
            <input
              type="text"
              id={`input-${index}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
         <Popover open={openCalendar} onOpenChange={setOpenCalendar} >
                <PopoverTrigger asChild={true} autoFocus={false} className="mt-[500px]">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "text-left flex justify-between font-medium w-full border-[#bef0bb] border-0 border-b text-[#3E3E3E] bg-background rounded-none pr-0 pl-0",
                      !dateState && "text-muted-foreground"
                    )}
                    onClick={() => setOpenCalendar(!openCalendar)} // Controla la apertura
                  >
                    {dateState ? (
                      format(dateState, "PPP")
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="p-0">
                  <Calendar
                    mode="single"
                    selected={dateState}
                    onSelect={(date) => {
                      setDateState(date); // Asigna la fecha seleccionada
                      setOpenCalendar(false); // Cierra el Popover automáticamente
                    }}
                    initialFocus={true}
                  />
                </PopoverContent>
              </Popover>
      </DialogContent>
    </Dialog>
  );
}
