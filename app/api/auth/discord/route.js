import { NextResponse } from "next/server"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || "http://localhost:3000/api/auth/discord/callback"

export async function GET() {
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`

  return NextResponse.redirect(discordAuthUrl)
}
