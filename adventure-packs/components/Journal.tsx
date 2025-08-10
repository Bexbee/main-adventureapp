"use client";

import { useState } from "react";
import { useLocalStorage, ns } from "@/hooks/useLocalStorage";
import { NotebookPen, Trash2, Copy } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

interface JournalProps {
  packSlug: string;
}

export default function Journal({ packSlug }: JournalProps) {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>(ns(packSlug, "journal"), []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function addEntry() {
    if (!title.trim() && !body.trim()) return;
    const entry: JournalEntry = { id: crypto.randomUUID(), title: title.trim(), body: body.trim(), createdAt: new Date().toISOString() };
    setEntries([entry, ...entries]);
    setTitle("");
    setBody("");
  }

  function removeEntry(id: string) {
    setEntries(entries.filter((e) => e.id !== id));
  }

  async function copyAll() {
    const text = entries
      .map((e) => `# ${e.title || "Untitled"}\n${new Date(e.createdAt).toLocaleString()}\n\n${e.body}\n`)
      .join("\n---\n\n");
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied journal to clipboard");
    } catch {
      alert("Copy failed");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-3">
        <div className="flex items-center gap-2 mb-2"><NotebookPen /> <h4 className="font-medium">New entry</h4></div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded-lg p-2 mb-2"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Notes"
          className="w-full border rounded-lg p-2 min-h-[120px]"
        />
        <div className="mt-2 flex items-center justify-between">
          <button onClick={addEntry} className="px-3 py-2 rounded-xl bg-sky-600 text-white text-sm">Add</button>
          <button onClick={copyAll} className="inline-flex items-center gap-2 text-sm underline"><Copy size={16}/> Copy all</button>
        </div>
      </div>

      <ul className="space-y-2">
        {entries.map((e) => (
          <li key={e.id} className="rounded-2xl border bg-white p-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">{e.title || "Untitled"}</h5>
                <p className="text-xs text-gray-600">{new Date(e.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => removeEntry(e.id)} aria-label="Delete entry" className="text-red-600"><Trash2 /></button>
            </div>
            {e.body && <p className="mt-2 whitespace-pre-wrap text-sm">{e.body}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}