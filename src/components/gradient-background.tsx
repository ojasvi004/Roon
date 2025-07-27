"use client"

export default function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/95 to-zinc-950" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/5 blur-[100px]" />
    </div>
  )
}
