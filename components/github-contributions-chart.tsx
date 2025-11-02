"use client"

import { useEffect, useState, useRef } from "react"

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
  data: {
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
}

export function GitHubContributionsChart({ username = "imtia33" }: { username?: string }) {
  const [contributionData, setContributionData] = useState<Week[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`/api/github/contributions?username=${username}`)
        
        const data = await response.json()
        
        if (!response.ok) {
          // Check if it's an authentication error
          if (data.requiresAuth) {
            setError('GitHub API requires authentication. Please set GITHUB_TOKEN in your environment variables.')
          } else {
            setError(data.message || 'Failed to fetch contributions')
          }
          return
        }

        const graphData: GraphQLRes = data
        
        if (graphData.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
          setContributionData(graphData.data.user.contributionsCollection.contributionCalendar.weeks)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  // Auto-scroll to the end (right) on mobile to show latest activity first
  useEffect(() => {
    if (contributionData.length > 0 && chartContainerRef.current) {
      // Find the scrollable parent container by checking for overflow-x-auto class
      let parent = chartContainerRef.current.parentElement
      while (parent) {
        if (parent.classList.contains('overflow-x-auto') || 
            parent.className.includes('overflow-x-auto')) {
          // Small delay to ensure layout is complete
          setTimeout(() => {
            parent!.scrollLeft = parent!.scrollWidth
          }, 100)
          break
        }
        parent = parent.parentElement
      }
    }
  }, [contributionData])

  const getContributionColor = (contributionCount: number): string => {
    // Match GitHub's contribution color scheme
    if (contributionCount >= 15) {
      return "#39d353"
    } else if (contributionCount >= 10) {
      return "#26a641"
    } else if (contributionCount >= 5) {
      return "#006d32"
    } else if (contributionCount >= 1) {
      return "#0e4429"
    }
    // No contributions - use subtle background
    return "rgba(255, 255, 255, 0.05)"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-sm text-muted-foreground">Loading contributions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          {error.includes('authentication') ? (
            <>
              <div className="font-medium mb-2">GitHub API requires authentication</div>
              <div className="text-xs opacity-75">
                Add <code className="bg-muted px-1 py-0.5 rounded">GITHUB_TOKEN</code> to your <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file
              </div>
              <div className="text-xs opacity-75 mt-1">
                Get a token at{' '}
                <a 
                  href="https://github.com/settings/tokens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  github.com/settings/tokens
                </a>
              </div>
            </>
          ) : (
            <>Unable to load contributions: {error}</>
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={chartContainerRef} className="flex flex-col items-center justify-center  relative w-full">
      {/* Gradient overlays for smooth edges */}
      <div className="absolute right-0 h-full w-[50px]  pointer-events-none z-10" />
      <div className="absolute left-0 h-full w-[50px] pointer-events-none z-10" />
      
      <div className="flex gap-1  w-full scrollbar-hide pb-2">
        {contributionData.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
            {week.contributionDays.map((day, dayIndex) => {
              const contributionColor = getContributionColor(day.contributionCount)
              return (
                <div
                  key={`week-${weekIndex}-day-${dayIndex}`}
                  className="h-2 w-2 lg:h-3 lg:w-3 rounded-[2px] transition-opacity hover:opacity-80"
                  style={{ backgroundColor: contributionColor }}
                  title={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
