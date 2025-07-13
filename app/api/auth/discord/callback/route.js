import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || "http://localhost:3000/api/auth/discord/callback"
const ADMIN_DISCORD_IDS = ["1234567890"] // Add your Discord ID here

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect("/?error=no_code")
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      throw new Error("No access token received")
    }

    // Get user info
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Check if user is admin
    const isAdmin = ADMIN_DISCORD_IDS.includes(userData.id)

    // Create JWT token
    const token = jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        avatar: userData.avatar,
        isAdmin,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    // Set cookie and redirect
    const response = NextResponse.redirect(isAdmin ? "/admin" : "/upload")
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800, // 7 days
    })

    return response
  } catch (error) {
    console.error("Discord OAuth error:", error)
    return NextResponse.redirect("/?error=auth_failed")
  }
}
