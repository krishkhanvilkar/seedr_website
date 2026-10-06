"use server"

import { Client } from "@notionhq/client"

export type RequestAccessState = {
  status: "idle" | "success" | "error"
  message?: string
}

const initialState: RequestAccessState = { status: "idle" }

export async function submitRequestAccess(
  _previousState: RequestAccessState,
  formData: FormData,
): Promise<RequestAccessState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const role = String(formData.get("role") ?? "builder").trim()
  const proof = String(formData.get("proof") ?? "").trim()

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please provide a valid name and email." }
  }

  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!apiKey || !databaseId) {
    console.error("[v0] Notion submission is missing server configuration")
    return { status: "error", message: "The application channel is temporarily unavailable." }
  }

  try {
    const notion = new Client({ auth: apiKey })
    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: name.slice(0, 2000) } }] },
      Email: { email },
      Role: { select: { name: role === "investor" ? "Investor" : "Builder" } },
    }

    if (proof) {
      properties["Proof Link"] = { url: proof }
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties as Parameters<typeof notion.pages.create>[0]["properties"],
    })

    return { status: "success" }
  } catch (error) {
    console.error("[v0] Failed to create Notion application", error)
    return { status: "error", message: "We could not secure the transmission. Please try again." }
  }
}

export { initialState }
