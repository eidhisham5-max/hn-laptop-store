// Automated Test Script for H.N Laptop Store
// Run with: node testing/automated_test_script.js

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class HNLaptopStoreTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  async setup() {
    console.log('🚀 Starting H.N Laptop Store Testing...');
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1440, height: 900 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Enable console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console Error:', msg.text());
        this.results.errors.push(msg.text());
      }
    });

    // Enable request logging
    this.page.on('requestfailed', request => {
      console.log('❌ Request Failed:', request.url());
      this.results.errors.push(`Request failed: ${request.url()}`);
    });
  }

  async testPageLoad() {
    console.log('📄 Testing page load...');
    try {
      await this.page.goto('http://localhost:3000', { 
        waitUntil: 'networkidle0',
        timeout: 10000 
      });
      
      const title = await this.page.title();
      if (title.includes('H.N') || title.includes('Laptop')) {
        console.log('✅ Page loaded successfully');
        this.results.passed++;
      } else {
        console.log('❌ Page title incorrect:', title);
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Page load failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Page load failed: ${error.message}`);
    }
  }

  async testLanguageSwitching() {
    console.log('🌐 Testing language switching...');
    try {
      // Test English to Arabic
      await this.page.click('[data-testid="language-switcher-ar"]');
      await this.page.waitForTimeout(1000);
      
      const arabicText = await this.page.$eval('h1', el => el.textContent);
      if (arabicText.includes('حاسوب') || arabicText.includes('متميزة')) {
        console.log('✅ Arabic language switch works');
        this.results.passed++;
      } else {
        console.log('❌ Arabic language switch failed');
        this.results.failed++;
      }

      // Test Arabic to English
      await this.page.click('[data-testid="language-switcher-en"]');
      await this.page.waitForTimeout(1000);
      
      const englishText = await this.page.$eval('h1', el => el.textContent);
      if (englishText.includes('Premium') || englishText.includes('Laptops')) {
        console.log('✅ English language switch works');
        this.results.passed++;
      } else {
        console.log('❌ English language switch failed');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Language switching failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Language switching failed: ${error.message}`);
    }
  }

  async testResponsiveDesign() {
    console.log('📱 Testing responsive design...');
    const viewports = [
      { name: 'Mobile', width: 375, height: 812 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1440, height: 900 }
    ];

    for (const viewport of viewports) {
      try {
        await this.page.setViewport({ width: viewport.width, height: viewport.height });
        await this.page.waitForTimeout(500);
        
        // Check if header is visible
        const header = await this.page.$('header');
        if (header) {
          console.log(`✅ ${viewport.name} viewport: Header visible`);
          this.results.passed++;
        } else {
          console.log(`❌ ${viewport.name} viewport: Header not visible`);
          this.results.failed++;
        }
      } catch (error) {
        console.log(`❌ ${viewport.name} viewport test failed:`, error.message);
        this.results.failed++;
        this.results.errors.push(`${viewport.name} viewport test failed: ${error.message}`);
      }
    }
  }

  async testNavigation() {
    console.log('🧭 Testing navigation...');
    try {
      // Test navigation links
      const navLinks = await this.page.$$('nav a');
      if (navLinks.length > 0) {
        console.log('✅ Navigation links found');
        this.results.passed++;
      } else {
        console.log('❌ No navigation links found');
        this.results.failed++;
      }

      // Test search functionality
      const searchButton = await this.page.$('[data-testid="search-button"]');
      if (searchButton) {
        console.log('✅ Search button found');
        this.results.passed++;
      } else {
        console.log('❌ Search button not found');
        this.results.failed++;
      }

      // Test cart functionality
      const cartButton = await this.page.$('[data-testid="cart-button"]');
      if (cartButton) {
        console.log('✅ Cart button found');
        this.results.passed++;
      } else {
        console.log('❌ Cart button not found');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Navigation test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Navigation test failed: ${error.message}`);
    }
  }

  async testProductGrid() {
    console.log('🛍️ Testing product grid...');
    try {
      // Check if product cards exist
      const productCards = await this.page.$$('[data-testid="product-card"]');
      if (productCards.length > 0) {
        console.log(`✅ Found ${productCards.length} product cards`);
        this.results.passed++;
      } else {
        console.log('❌ No product cards found');
        this.results.failed++;
      }

      // Test add to cart buttons
      const addToCartButtons = await this.page.$$('[data-testid="add-to-cart"]');
      if (addToCartButtons.length > 0) {
        console.log(`✅ Found ${addToCartButtons.length} add to cart buttons`);
        this.results.passed++;
      } else {
        console.log('❌ No add to cart buttons found');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Product grid test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Product grid test failed: ${error.message}`);
    }
  }

  async testPerformance() {
    console.log('⚡ Testing performance...');
    try {
      // Get performance metrics
      const metrics = await this.page.metrics();
      
      // Check page load time
      if (metrics.LoadEventEnd - metrics.NavigationStart < 3000) {
        console.log('✅ Page load time is acceptable');
        this.results.passed++;
      } else {
        console.log('❌ Page load time is too slow');
        this.results.failed++;
      }

      // Check JavaScript heap used
      if (metrics.JSHeapUsedSize < 50 * 1024 * 1024) { // 50MB
        console.log('✅ JavaScript heap usage is acceptable');
        this.results.passed++;
      } else {
        console.log('❌ JavaScript heap usage is too high');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Performance test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Performance test failed: ${error.message}`);
    }
  }

  async testAccessibility() {
    console.log('♿ Testing accessibility...');
    try {
      // Check for alt text on images
      const images = await this.page.$$('img');
      let imagesWithAlt = 0;
      
      for (const img of images) {
        const alt = await img.evaluate(el => el.getAttribute('alt'));
        if (alt && alt.trim() !== '') {
          imagesWithAlt++;
        }
      }
      
      if (imagesWithAlt === images.length) {
        console.log('✅ All images have alt text');
        this.results.passed++;
      } else {
        console.log(`❌ ${images.length - imagesWithAlt} images missing alt text`);
        this.results.failed++;
      }

      // Check for proper heading hierarchy
      const headings = await this.page.$$('h1, h2, h3, h4, h5, h6');
      if (headings.length > 0) {
        console.log('✅ Heading elements found');
        this.results.passed++;
      } else {
        console.log('❌ No heading elements found');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ Accessibility test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`Accessibility test failed: ${error.message}`);
    }
  }

  async testRTLSupport() {
    console.log('🔄 Testing RTL support...');
    try {
      // Switch to Arabic
      await this.page.click('[data-testid="language-switcher-ar"]');
      await this.page.waitForTimeout(1000);
      
      // Check if dir attribute is set to rtl
      const htmlDir = await this.page.$eval('html', el => el.getAttribute('dir'));
      if (htmlDir === 'rtl') {
        console.log('✅ RTL direction set correctly');
        this.results.passed++;
      } else {
        console.log('❌ RTL direction not set');
        this.results.failed++;
      }

      // Check if text is right-aligned
      const bodyTextAlign = await this.page.$eval('body', el => 
        window.getComputedStyle(el).textAlign
      );
      if (bodyTextAlign === 'right') {
        console.log('✅ Text alignment is correct for RTL');
        this.results.passed++;
      } else {
        console.log('❌ Text alignment not correct for RTL');
        this.results.failed++;
      }
    } catch (error) {
      console.log('❌ RTL support test failed:', error.message);
      this.results.failed++;
      this.results.errors.push(`RTL support test failed: ${error.message}`);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating test report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.passed + this.results.failed,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: ((this.results.passed / (this.results.passed + this.results.failed)) * 100).toFixed(2) + '%'
      },
      errors: this.results.errors,
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('📄 Test report saved to:', reportPath);
    console.log('\n📈 Test Summary:');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Success Rate: ${report.summary.successRate}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n🚨 Errors Found:');
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.failed > 0) {
      recommendations.push('Fix failed tests before deployment');
    }
    
    if (this.results.errors.length > 0) {
      recommendations.push('Address console errors and network failures');
    }
    
    if (this.results.passed / (this.results.passed + this.results.failed) < 0.8) {
      recommendations.push('Consider additional testing before release');
    }
    
    return recommendations;
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async runAllTests() {
    try {
      await this.setup();
      await this.testPageLoad();
      await this.testLanguageSwitching();
      await this.testResponsiveDesign();
      await this.testNavigation();
      await this.testProductGrid();
      await this.testPerformance();
      await this.testAccessibility();
      await this.testRTLSupport();
      await this.generateReport();
    } catch (error) {
      console.log('❌ Test suite failed:', error.message);
      this.results.errors.push(`Test suite failed: ${error.message}`);
    } finally {
      await this.cleanup();
    }
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const tester = new HNLaptopStoreTester();
  tester.runAllTests().catch(console.error);
}

module.exports = HNLaptopStoreTester;
