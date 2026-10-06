"use server"

export type RequestAccessResult = {
  success: boolean
  message?: string
  error?: string
}

const ROLE_LABELS: Record<string, string> = { builder: "Builder", investor: "Investor" }

export async function submitRequestAccess(formData: FormData): Promise<RequestAccessResult> {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const rawRole = String(formData.get("role") ?? "builder").trim().toLowerCase()
  const role = ROLE_LABELS[rawRole] ?? "Builder"
  const proofLink = String(formData.get("proofLink") ?? "").trim()

  if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please provide a valid name and email." }
  }

  const apiKey = process.env.NOTION_API_KEY?.trim()
  const databaseId = process.env.NOTION_DATABASE_ID?.trim()
  if (!apiKey || !databaseId) {
    console.error("[request-access] Missing NOTION_API_KEY or NOTION_DATABASE_ID")
    return { success: false, error: "Transmission failed. Please try again." }
  }

  try {
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: fullName } }] },
          Email: { email },
          Role: { select: { name: role } },
          // Notion rejects empty strings for URL properties; null clears the field.
          Proof: { url: proofLink || null },
        },
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      console.error("[request-access] Notion API error:", response.status, details)
      return { success: false, error: "Transmission failed. Please try again." }
    }

    return { success: true }
  } catch (error) {
    console.error("[request-access] Request failed:", error)
    return { success: false, error: "Transmission failed. Please try again." }
  }
}
