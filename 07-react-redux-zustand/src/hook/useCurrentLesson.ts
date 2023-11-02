import { useStore } from "../zustand-store"

export const useCurrentLesson = () => {
  return useStore(store => {
    const { currentModuleIndex, currentLessonIndex } = store

    const currentModule = store.course?.modules[currentModuleIndex]
    const currentLesson = store.course?.modules[currentModuleIndex].lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}