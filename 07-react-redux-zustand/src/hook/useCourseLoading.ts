import { useAppSelector } from "../store"

export const useCourseLoading = () => {
  return useAppSelector(state => {
    return state.player.isLoading
  })
}