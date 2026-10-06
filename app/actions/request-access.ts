"use server"

import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export type AccessRequestState = {
  success: boolean
  message?: string
}

export async function submitAccessRequest(
  _previousState: AccessRequestState,
  formData: FormData,
): Promise<AccessRequestState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const role = String(formData.get("role") ?? "builder").trim()
  const proof = String(formData.get("proof") ?? "").trim()

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "Enter a valid name and email." }
  }

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return { success: false, message: "Applications are temporarily unavailable." }
  }

  try {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: name.slice(0, 200) } }] },
        Email: { email },
        Track: { select: { name: role === "investor" ? "Investor" : "Builder" } },
        "Proof of Work": proof ? { url: proof } : { url: null },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Notion access request failed", error)
    return { success: false, message: "We could not save your request. Please try again." }
  }
}
