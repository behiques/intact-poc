/**
 * Simple Node.js script to test the auth route
 */

async function testRoute() {
  console.log('🧪 Testing auth token route at http://localhost:3000/api/auth/token')
  console.log('📝 Note: Make sure the Next.js dev server is running on port 3000')
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('📊 Response status:', response.status)
    console.log('📊 Response status text:', response.statusText)
    
    if (response.ok) {
      const responseData = await response.json()
      console.log('✅ Route is working!')
      console.log('🎉 Token received:', responseData.token ? 'YES' : 'NO')
      console.log('📅 Expiration:', responseData.expiration)
    } else {
      const responseText = await response.text()
      console.log('❌ Route returned an error')
      console.log('📊 Response body:', responseText)
    }

  } catch (error) {
    console.error('🔥 Network error:', error.message)
    if (error.message.includes('ECONNREFUSED')) {
      console.log('📝 The Next.js development server is not running.')
      console.log('   Start it with: npm run dev')
    }
  }
}

testRoute()
