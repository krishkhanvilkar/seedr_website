"use server"

export type RequestAccessResult = {
  success: boolean
  error?: string
}

export async function submitRequestAccess(formData: FormData): Promise<RequestAccessResult> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const role = String(formData.get("role") ?? "builder").trim()
  const proof = String(formData.get("proof") ?? "").trim()

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please provide a valid name and email." }
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Role: { rich_text: [{ text: { content: role } }] },
        "Proof of Work": proof ? { url: proof } : { url: null },
      },
    }),
  })

  if (!response.ok) {
    return { success: false, error: "Transmission failed. Please try again." }
  }

  return { success: true }
}

