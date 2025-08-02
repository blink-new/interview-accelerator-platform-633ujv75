import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

interface SessionMonitorRequest {
  user_id: string
  session_id: string
  performance_issues?: {
    freeze_count: number
    buffer_count: number
    memory_usage?: number
    last_activity: string
  }
  reason: 'freeze' | 'buffer' | 'memory' | 'timeout' | 'manual'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (req.method === 'POST') {
      const body: SessionMonitorRequest = await req.json()
      
      // Validate request
      if (!body.user_id || !body.session_id || !body.reason) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: user_id, session_id, reason' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Log the session issue
      const { error: logError } = await supabase
        .from('session_logs')
        .insert({
          user_id: body.user_id,
          session_id: body.session_id,
          reason: body.reason,
          performance_data: body.performance_issues || null,
          logged_at: new Date().toISOString()
        })

      if (logError) {
        console.error('Error logging session issue:', logError)
      }

      // Force logout by invalidating the session
      try {
        // Get the user's current session
        const { data: sessions, error: sessionError } = await supabase.auth.admin.listUserSessions(body.user_id)
        
        if (sessionError) {
          console.error('Error fetching user sessions:', sessionError)
        } else if (sessions && sessions.length > 0) {
          // Revoke all sessions for the user
          for (const session of sessions) {
            await supabase.auth.admin.deleteSession(session.id)
          }
        }
      } catch (sessionError) {
        console.error('Error revoking sessions:', sessionError)
      }

      // Update user profile to mark session as terminated
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          last_session_terminated: new Date().toISOString(),
          session_termination_reason: body.reason
        })
        .eq('id', body.user_id)

      if (updateError) {
        console.error('Error updating user profile:', updateError)
      }

      // Send notification if needed (for severe issues)
      if (body.reason === 'freeze' || body.reason === 'memory') {
        try {
          // Could send email notification here if needed
          console.log(`Severe performance issue detected for user ${body.user_id}: ${body.reason}`)
        } catch (notificationError) {
          console.error('Error sending notification:', notificationError)
        }
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Session terminated due to performance issues',
          reason: body.reason,
          timestamp: new Date().toISOString()
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // GET request - return session monitoring status
    if (req.method === 'GET') {
      const url = new URL(req.url)
      const userId = url.searchParams.get('user_id')
      
      if (!userId) {
        return new Response(
          JSON.stringify({ error: 'user_id parameter required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get recent session logs for the user
      const { data: logs, error: logsError } = await supabase
        .from('session_logs')
        .select('*')
        .eq('user_id', userId)
        .order('logged_at', { ascending: false })
        .limit(10)

      if (logsError) {
        console.error('Error fetching session logs:', logsError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch session logs' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          logs: logs || [],
          monitoring_active: true
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Session monitor error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})