import fs from 'fs'
import path from 'path'

export function readMarkdownFile(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath)
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return `# Not Found\n\nCould not load \`${relativePath}\`.`
  }
}
