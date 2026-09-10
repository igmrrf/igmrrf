// A small navigation shell: commands resolve only to this allowlist, never to OS execution.
export const destinations = [
  { command: "home", href: "/", label: "Home", description: "Start here" },
  { command: "about", href: "/about", label: "About", description: "Meet Francis" },
  { command: "projects", href: "/case-studies", label: "Projects", description: "Systems, tools, and case studies" },
  { command: "blog", href: "/blog", label: "Blog", description: "Engineering notes and ideas" },
  { command: "experience", href: "/experience", label: "Experience", description: "Work history and résumé" },
  { command: "contributions", href: "/about#contributions", label: "Contributions", description: "Patches to open-source projects" },
  { command: "talks", href: "/talks", label: "Talks", description: "Presentations and slides" },
  { command: "stack", href: "/stack", label: "Tech stack", description: "Explore my toolkit" },
  { command: "chat", href: "/chat", label: "Ask AI", description: "Ask about my work" },
] as const;

export const shellCommands = ["help", "ls", "whoami", "pwd", "clear", "exit", ...destinations.map((d) => d.command), ...destinations.map((d) => `cd ${d.command}`)];

export function resolveCommand(input: string): { href?: string; output?: string; action?: "clear" | "exit" } {
  const command = input.trim().toLowerCase().replace(/\s+/g, " ");
  if (command === "clear" || command === "exit") return { action: command };
  if (command === "help" || command === "ls") return { output: "Browse: about, projects, blog, experience, contributions, talks, stack, chat. Use a name or cd <name>. Also: whoami, pwd, clear, exit. Tab completes; ↑/↓ recalls history." };
  if (command === "whoami") return { output: "Francis Igbiriki · software & mechanical engineer, system architect, and terminal enthusiast. I build distributed systems and tools that make engineering work better." };
  const target = command.replace(/^cd\s+/, "").replace(/^\//, "").replace(/\/$/, "");
  const destination = destinations.find((d) => d.command === target || d.href === `/${target}`);
  if (destination) return { href: destination.href };
  if (["cd", "cd ~", "cd /", "cd .."].includes(command)) return { href: "/" };
  return { output: `Unknown command: ${input.trim()}. Type help to see what you can do.` };
}
