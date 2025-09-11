const { createClient } = require('@supabase/supabase-js');
const https = require('https');
const http = require('http');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

class Monitor {
  constructor() {
    this.alerts = [];
    this.metrics = {
      uptime: 0,
      responseTime: 0,
      errorCount: 0,
      lastCheck: null,
      databaseStatus: false,
      apiStatus: false,
    };
  }

  async checkDatabaseHealth() {
    try {
      const startTime = Date.now();
      const { data, error } = await supabase
        .from('brands')
        .select('count')
        .limit(1);
      
      const responseTime = Date.now() - startTime;
      
      if (error) {
        this.addAlert('database', 'error', `Database error: ${error.message}`);
        this.metrics.databaseStatus = false;
        return false;
      }
      
      this.metrics.databaseStatus = true;
      this.metrics.responseTime = responseTime;
      
      if (responseTime > 5000) {
        this.addAlert('database', 'warning', `Slow database response: ${responseTime}ms`);
      }
      
      return true;
    } catch (error) {
      this.addAlert('database', 'error', `Database connection failed: ${error.message}`);
      this.metrics.databaseStatus = false;
      return false;
    }
  }

  async checkApiHealth() {
    const endpoints = [
      { url: `${appUrl}/api/health`, name: 'Health API' },
      { url: `${appUrl}/api/paymob/webhook`, name: 'Paymob Webhook' },
    ];

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now();
        const response = await this.makeRequest(endpoint.url);
        const responseTime = Date.now() - startTime;
        
        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (responseTime > 3000) {
            this.addAlert('api', 'warning', `Slow API response for ${endpoint.name}: ${responseTime}ms`);
          }
        } else {
          this.addAlert('api', 'error', `${endpoint.name} returned status ${response.statusCode}`);
        }
      } catch (error) {
        this.addAlert('api', 'error', `${endpoint.name} failed: ${error.message}`);
      }
    }
  }

  async checkCriticalPages() {
    const pages = [
      { url: `${appUrl}/`, name: 'Home Page' },
      { url: `${appUrl}/products`, name: 'Products Page' },
      { url: `${appUrl}/cart`, name: 'Cart Page' },
      { url: `${appUrl}/admin/products`, name: 'Admin Products' },
    ];

    for (const page of pages) {
      try {
        const startTime = Date.now();
        const response = await this.makeRequest(page.url);
        const responseTime = Date.now() - startTime;
        
        if (response.statusCode >= 200 && response.statusCode < 300) {
          if (responseTime > 5000) {
            this.addAlert('pages', 'warning', `Slow page load for ${page.name}: ${responseTime}ms`);
          }
        } else {
          this.addAlert('pages', 'error', `${page.name} returned status ${response.statusCode}`);
        }
      } catch (error) {
        this.addAlert('pages', 'error', `${page.name} failed: ${error.message}`);
      }
    }
  }

  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, (res) => {
        resolve({ statusCode: res.statusCode, headers: res.headers });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  addAlert(category, level, message) {
    const alert = {
      timestamp: new Date().toISOString(),
      category,
      level,
      message,
    };
    
    this.alerts.push(alert);
    this.metrics.errorCount++;
    
    // Log critical alerts
    if (level === 'error') {
      console.error(`🚨 [${category.toUpperCase()}] ${message}`);
    } else if (level === 'warning') {
      console.warn(`⚠️  [${category.toUpperCase()}] ${message}`);
    }
  }

  async checkPaymentGateway() {
    try {
      const requiredEnvVars = [
        'PAYMOB_API_KEY',
        'PAYMOB_HMAC_SECRET',
        'PAYMOB_INTEGRATION_ID',
        'PAYMOB_IFRAME_ID'
      ];
      
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        this.addAlert('payment', 'error', `Missing payment gateway variables: ${missingVars.join(', ')}`);
        return false;
      }
      
      return true;
    } catch (error) {
      this.addAlert('payment', 'error', `Payment gateway check failed: ${error.message}`);
      return false;
    }
  }

  async checkDiskSpace() {
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Check uploads directory
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
      
      if (fs.existsSync(uploadsDir)) {
        const stats = fs.statSync(uploadsDir);
        // This is a basic check - in production you'd want more sophisticated disk monitoring
        console.log(`📁 Uploads directory exists and is accessible`);
      } else {
        this.addAlert('storage', 'warning', 'Uploads directory does not exist');
      }
    } catch (error) {
      this.addAlert('storage', 'error', `Storage check failed: ${error.message}`);
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      alerts: this.alerts,
      summary: {
        totalAlerts: this.alerts.length,
        errorAlerts: this.alerts.filter(a => a.level === 'error').length,
        warningAlerts: this.alerts.filter(a => a.level === 'warning').length,
        systemHealth: this.metrics.databaseStatus && this.metrics.apiStatus ? 'healthy' : 'unhealthy'
      }
    };
    
    return report;
  }

  async runFullCheck() {
    console.log('🔍 Starting comprehensive system monitoring...\n');
    
    this.metrics.lastCheck = new Date().toISOString();
    this.alerts = []; // Reset alerts for this check
    
    // Run all checks
    await this.checkDatabaseHealth();
    await this.checkApiHealth();
    await this.checkCriticalPages();
    await this.checkPaymentGateway();
    await this.checkDiskSpace();
    
    // Generate and display report
    const report = this.generateReport();
    
    console.log('\n📊 Monitoring Report');
    console.log('==================');
    console.log(`Timestamp: ${report.timestamp}`);
    console.log(`System Health: ${report.summary.systemHealth.toUpperCase()}`);
    console.log(`Total Alerts: ${report.summary.totalAlerts}`);
    console.log(`Errors: ${report.summary.errorAlerts}`);
    console.log(`Warnings: ${report.summary.warningAlerts}`);
    console.log(`Database Status: ${this.metrics.databaseStatus ? '✅' : '❌'}`);
    console.log(`Response Time: ${this.metrics.responseTime}ms`);
    
    if (this.alerts.length > 0) {
      console.log('\n🚨 Active Alerts:');
      this.alerts.forEach(alert => {
        const icon = alert.level === 'error' ? '❌' : '⚠️';
        console.log(`${icon} [${alert.category}] ${alert.message}`);
      });
    }
    
    return report;
  }
}

// Run monitoring if called directly
if (require.main === module) {
  const monitor = new Monitor();
  monitor.runFullCheck().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('Monitoring failed:', error);
    process.exit(1);
  });
}

module.exports = { Monitor };
