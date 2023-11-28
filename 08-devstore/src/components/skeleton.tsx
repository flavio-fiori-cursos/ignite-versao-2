import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  const mergeClassName = twMerge(
    'bg-zinc-50/10 animate-pulse rounded-md',
    className,
  )

  return <div className={mergeClassName} {...props} />
}
