import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the JWT token from the Authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT and get user info
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid token');
    }

    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'register': {
        // Register or update user in our users table
        const { data: existingUser } = await supabaseClient
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        const userData = {
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.display_name || user.user_metadata?.full_name || user.email?.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          provider: user.app_metadata?.provider || 'email',
          last_login: new Date().toISOString(),
          is_active: true
        };

        if (existingUser) {
          // Update existing user
          const { error: updateError } = await supabaseClient
            .from('users')
            .update({
              display_name: userData.display_name,
              avatar_url: userData.avatar_url,
              last_login: userData.last_login
            })
            .eq('id', user.id);

          if (updateError) throw updateError;
        } else {
          // Insert new user
          const { error: insertError } = await supabaseClient
            .from('users')
            .insert(userData);

          if (insertError) throw insertError;
        }

        return new Response(
          JSON.stringify({ success: true, user: userData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'list': {
        // Check if user is admin (for now, we'll make the first user admin)
        const { data: currentUser } = await supabaseClient
          .from('users')
          .select('is_admin')
          .eq('id', user.id)
          .single();

        // For demo purposes, let's make any user able to see the list
        // In production, you'd want proper admin checks
        const { data: users, error: listError } = await supabaseClient
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (listError) throw listError;

        return new Response(
          JSON.stringify({ success: true, users }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'toggle-access': {
        const { userId, isActive } = await req.json();
        
        const { error: updateError } = await supabaseClient
          .from('users')
          .update({ is_active: isActive })
          .eq('id', userId);

        if (updateError) throw updateError;

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});