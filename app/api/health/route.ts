import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
    const startTime = Date.now();
    
    // Check database connection
    let dbStatus = 'healthy';
    let dbResponseTime = 0;
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      try {
        const dbStartTime = Date.now();
        const { error } = await supabase
          .from('brands')
          .select('count')
          .limit(1);
        
        dbResponseTime = Date.now() - dbStartTime;
        
        if (error) {
          dbStatus = 'unhealthy';
        }
      } catch (error) {
        dbStatus = 'unhealthy';
      }
    } else {
      dbStatus = 'unhealthy';
    }
    
    // Check environment variables
    const envStatus = {
      supabase: !!(supabaseUrl && supabaseKey),
      admin: !!process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      paymob: !!(
        process.env.PAYMOB_API_KEY &&
        process.env.PAYMOB_HMAC_SECRET &&
        process.env.PAYMOB_INTEGRATION_ID &&
        process.env.PAYMOB_IFRAME_ID
      ),
    };
    
    const totalResponseTime = Date.now() - startTime;
    
    const health = {
      status: dbStatus === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: totalResponseTime,
      database: {
        status: dbStatus,
        responseTime: dbResponseTime,
      },
      environment: envStatus,
      version: process.env.npm_package_version || '1.0.0',
    };
    
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    return NextResponse.json(health, { status: statusCode });
    
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
