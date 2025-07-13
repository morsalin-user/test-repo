import { NextResponse } from "next/server"

const LINKVERTISE_API_KEY = process.env.LINKVERTISE_API_KEY
const LINKVERTISE_USER_ID = process.env.LINKVERTISE_USER_ID

export async function POST(request) {
  try {
    const { url } = await request.json()

    if (!LINKVERTISE_API_KEY || !LINKVERTISE_USER_ID) {
      // Return original URL if LinkVertise is not configured
      return NextResponse.json({ shortenedUrl: url })
    }

    const response = await fetch("https://publisher.linkvertise.com/api/v1/link", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LINKVERTISE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        alias: "",
        description: "AuraVerse Download",
      }),
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ shortenedUrl: data.data.link })
    } else {
      return NextResponse.json({ shortenedUrl: url })
    }
  } catch (error) {
    console.error("LinkVertise API error:", error)
    return NextResponse.json({ shortenedUrl: url })
  }
}
