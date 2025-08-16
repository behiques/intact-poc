/**
 * External API Connectivity Test
 * Tests if the external microservices API is accessible
 */

async function testExternalAPI() {
  const authTokenApiUrl = 'https://microservices.dev.droot.dmn/security-api/api/security/Login'
  const userSystemId = 'IXDRAKE'

  console.log('🌐 Testing external API connectivity...')
  console.log('📍 URL:', authTokenApiUrl)
  console.log('🆔 User System ID:', userSystemId)

  try {
    console.log('\n🔄 Making request to external API...')
    
    const response = await fetch(authTokenApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'usersystemid': userSystemId,
      },
    })

    console.log('📊 Response Status:', response.status)
    console.log('📊 Response Status Text:', response.statusText)
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Could not read response body')
      console.log('❌ External API Error Response:', errorText)
      
      if (response.status === 404) {
        console.log('\n💡 Suggestions for 404 error:')
        console.log('   1. Check if the URL is correct')
        console.log('   2. Verify the API endpoint exists')
        console.log('   3. Check if the API path has changed')
        console.log('   4. Confirm the microservices are deployed')
      }
    } else {
      const responseData = await response.json().catch(() => 'Could not parse JSON')
      console.log('✅ External API Response:', responseData)
    }

  } catch (error) {
    console.error('🔥 Network Error:', error.message)
    console.log('\n💡 Possible causes:')
    console.log('   1. Network connectivity issues')
    console.log('   2. DNS resolution problems')
    console.log('   3. Firewall blocking the request')
    console.log('   4. SSL/TLS certificate issues')
    console.log('   5. API server is down')
  }
}

testExternalAPI()
