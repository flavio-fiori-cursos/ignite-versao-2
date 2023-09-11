import { ChevronDown } from "lucide-react"
import * as Collapsible from '@radix-ui/react-collapsible';

import { Lesson } from "./Lesson"

interface ModuleProps {
  moduleIndex: number
  title: string
  amountLessons: number
}

export function Module({ moduleIndex, title, amountLessons }: ModuleProps) {
  return(
    <Collapsible.Root className="group">
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex w-10 h-10 rounded-full items-center justify-center bg-zinc-950 text-xs">{moduleIndex + 1}</div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm text-white">{title}</strong>
          <span className="text-xs text-zinc-400">{amountLessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform"/>
      </Collapsible.Trigger>
      <Collapsible.CollapsibleContent>
        <nav className="relative flex flex-col gap-4 p-6">
          <Lesson title="Fundamentos do redux" duration="09:12" />
          <Lesson title="Fundamentos do redux" duration="09:12" />
          <Lesson title="Fundamentos do redux" duration="09:12" />
        </nav>
      </Collapsible.CollapsibleContent>
    </Collapsible.Root>
  )
}