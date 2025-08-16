/**
 * API Route Test Utility
 *
 * Simple test to verify the auth token route is working properly
 */

declare global {
  interface Window {
    testAuthRoute: () => Promise<void>
  }
}

async function testAuthRoute() {
  console.log('🧪 Testing auth token route...')

  try {
    // Test health endpoint first
    console.log('1. Testing health endpoint...')
    const healthResponse = await fetch('http://localhost:3000/api/health')

    if (healthResponse.ok) {
      const healthData = await healthResponse.json()
      console.log('✅ Health check passed:', healthData)
    } else {
      console.log('❌ Health check failed:', healthResponse.status)
    }

    // Test auth token endpoint
    console.log('2. Testing auth token endpoint...')
    const tokenResponse = await fetch('http://localhost:3000/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('📊 Token endpoint response:', {
      status: tokenResponse.status,
      statusText: tokenResponse.statusText,
      headers: Object.fromEntries(tokenResponse.headers.entries()),
    })

    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json()
      console.log('✅ Token endpoint working:', tokenData)
    } else {
      const errorText = await tokenResponse.text()
      console.log('❌ Token endpoint failed:', errorText)
    }
  } catch (error) {
    console.error('🔥 Test failed with error:', error)
  }
}

// Only run if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.testAuthRoute = testAuthRoute
  console.log('🎯 Auth route test available as window.testAuthRoute()')
} else {
  // Node environment
  testAuthRoute().catch(console.error)
}

export { testAuthRoute }
