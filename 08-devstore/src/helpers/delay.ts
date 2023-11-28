async function delay(timer: number) {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve()
    }, timer),
  )
}

export { delay }
