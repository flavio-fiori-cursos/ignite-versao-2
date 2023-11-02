import { useCurrentLesson } from "../hook/useCurrentLesson"
import { useStore } from "../zustand-store"

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()

  const { isLoading } = useStore()

  if(isLoading) {
    return(
      <h1 className="text-2xl font-bold text-white">Carregando...</h1>
    )
  }

  return (
    <header className="flex flex-col gap1">
      <h1 className="text-2xl font-bold text-white">{currentLesson?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo: {currentModule?.title}</span>
    </header>
  )
}