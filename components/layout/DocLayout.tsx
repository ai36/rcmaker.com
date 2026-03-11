import { Sidebar } from './Sidebar'

export function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-14 mx-auto w-full max-w-[1500px]">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-3xl px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
