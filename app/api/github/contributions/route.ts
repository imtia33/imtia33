import { NextResponse } from 'next/server'

type ContributionDay = {
  color: string
  contributionCount: number
  date: string
  weekday: number
}

type Week = {
  contributionDays: ContributionDay[]
  firstDay: string
}

type GraphQLRes = {
  user: {
    name: string
    contributionsCollection: {
      contributionCalendar: {
        colors: string[]
        totalContributions: number
        weeks: Week[]
      }
    }
  }
}

async function getContributions(token: string | null, username: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = `bearer ${token}`
  }

  const body = {
    query: `query {
      user(login: "${username}") {
        name
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.errors) {
      const errorMsg = data.errors[0]?.message || 'GitHub API error'
      console.error('GitHub GraphQL error:', errorMsg, data.errors)
      throw new Error(errorMsg)
    }

    return data
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    throw error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'imtia33'
  
  // Get token and trim any whitespace
  const token = process.env.GITHUB_TOKEN?.trim() || null
  
  // Debug logging (remove in production)
  console.log('Token exists:', !!token)
  console.log('Token length:', token?.length || 0)

  // GitHub GraphQL API requires authentication
  // However, we'll attempt the request anyway as it might work in some edge cases
  try {
    if (!token) {
      console.error('GITHUB_TOKEN is not set in environment variables')
      return NextResponse.json(
        { 
          error: 'GitHub API requires authentication',
          message: 'Please set GITHUB_TOKEN in your environment variables. Create a token at https://github.com/settings/tokens (no special permissions needed)',
          requiresAuth: true
        },
        { status: 401 }
      )
    }
    
    const graphData = await getContributions(token, username)
    return NextResponse.json(graphData)
  } catch (error) {
    // Provide helpful error message if authentication is the issue
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('GitHub API error:', errorMessage)
    
    // Check for authentication-related errors
    if (
      errorMessage.includes('requires authentication') || 
      errorMessage.includes('Bad credentials') || 
      errorMessage.includes('401') ||
      errorMessage.includes('Unauthorized') ||
      !token
    ) {
      return NextResponse.json(
        { 
          error: 'GitHub API requires authentication',
          message: 'Please set GITHUB_TOKEN in your environment variables. Create a token at https://github.com/settings/tokens (no special permissions needed)',
          requiresAuth: true,
          details: errorMessage
        },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub contributions',
        message: errorMessage
      },
      { status: 500 }
    )
  }
}
