import ReactPlayer from "react-player";

import { next } from "../store/slices/player";
import { useCurrentLesson } from "../hook/useCurrentLesson";
import { useAppDispatch } from "../store";
import { useCourseLoading } from "../hook/useCourseLoading";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch()

  const { currentLesson } = useCurrentLesson()
  const isCourseLoading = useCourseLoading()

  function handlePlayNext() {
    dispatch(next())
  }


  return(
    <div className="w-full bg-zinc-950 aspect-video">
      {
        isCourseLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        ) : (
          <ReactPlayer
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
            onEnded={handlePlayNext}
            controls
            playing
          />
        )
      }
  </div>
  )
}