import { Sidebar } from './Sidebar'

export function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-14">
      <Sidebar />
      <main className="flex-1 md:ml-60 min-w-0">
        <div className="mx-auto max-w-3xl px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
