import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import {
  Home,
  User,
  Code2,
  Briefcase,
  FolderGit2,
  Activity,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  FileText,
  Copy,
} from 'lucide-react'
import { SITE } from '../config'

const SECTIONS = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'stats-detail', label: 'Activity', icon: Activity },
  { id: 'ask', label: 'Ask about Krish', icon: Sparkles },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  const go = (id: string) => {
    setOpen(false)
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    )
  }
  const openUrl = (url: string) => {
    setOpen(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked */
    }
    setOpen(false)
  }

  const itemCls =
    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-mist/70 cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-mist'

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command Menu"
      overlayClassName="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18%] z-[201] w-[92vw] max-w-xl -translate-x-1/2"
    >
      <div className="overflow-hidden rounded-2xl border border-mist/15 bg-[#0e1014] shadow-2xl">
        <Command.Input
          placeholder="Jump to a section, copy email, open links…"
          className="w-full bg-transparent px-5 py-4 text-mist placeholder:text-mist/35 outline-none border-b border-mist/10 text-base"
        />
        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-mist/40">
            No results.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-mist/35"
          >
            {SECTIONS.map((s) => {
              const Icon = s.icon
              return (
                <Command.Item key={s.id} value={`go ${s.label}`} onSelect={() => go(s.id)} className={itemCls}>
                  <Icon className="w-4 h-4 text-mist/40" />
                  {s.label}
                </Command.Item>
              )
            })}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-mist/35"
          >
            {SITE.resumes.map((r) => (
              <Command.Item
                key={r.file}
                value={`resume cv ${r.label}`}
                onSelect={() => openUrl(r.file)}
                className={itemCls}
              >
                <FileText className="w-4 h-4 text-mist/40" /> Résumé · {r.label}
              </Command.Item>
            ))}
            <Command.Item value="copy email" onSelect={copyEmail} className={itemCls}>
              <Copy className="w-4 h-4 text-mist/40" /> {copied ? 'Copied!' : 'Copy email'}
            </Command.Item>
            <Command.Item value="github" onSelect={() => openUrl(SITE.github)} className={itemCls}>
              <Github className="w-4 h-4 text-mist/40" /> GitHub
            </Command.Item>
            <Command.Item value="linkedin" onSelect={() => openUrl(SITE.linkedin)} className={itemCls}>
              <Linkedin className="w-4 h-4 text-mist/40" /> LinkedIn
            </Command.Item>
            <Command.Item value="leetcode" onSelect={() => openUrl(SITE.leetcode)} className={itemCls}>
              <Code2 className="w-4 h-4 text-mist/40" /> LeetCode
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  )
}
