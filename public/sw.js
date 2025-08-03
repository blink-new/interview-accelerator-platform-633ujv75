// Service Worker for offline support and background sync
const CACHE_NAME = 'interview-accelerator-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg'
]

// API endpoints that should be cached
const CACHEABLE_APIS = [
  '/api/job-applications',
  '/api/leaderboard'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return
  }

  // Handle different types of requests
  if (request.url.includes('/api/') || request.url.includes('supabase.co')) {
    // API requests - Network first, cache fallback
    event.respondWith(networkFirstStrategy(request))
  } else if (STATIC_FILES.some(file => request.url.endsWith(file))) {
    // Static files - Cache first
    event.respondWith(cacheFirstStrategy(request))
  } else {
    // Other requests - Stale while revalidate
    event.respondWith(staleWhileRevalidateStrategy(request))
  }
})

// Network first strategy for API calls
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // If successful, cache the response
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache:', error)
    
    // Network failed, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API calls
    if (request.url.includes('/api/')) {
      return new Response(
        JSON.stringify({
          error: 'Offline',
          message: 'You are currently offline. Please check your connection.',
          data: []
        }),
        {
          status: 503,
          statusText: 'Service Unavailable',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    throw error
  }
}

// Cache first strategy for static files
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    console.log('Failed to fetch static file:', error)
    throw error
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request)
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE)
      cache.then(c => c.put(request, networkResponse.clone()))
    }
    return networkResponse
  }).catch(() => {
    // Network failed, but we might have cache
    return cachedResponse
  })
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse
  }
  
  // Otherwise wait for network
  return fetchPromise
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag)
  
  if (event.tag === 'job-application-sync') {
    event.waitUntil(syncJobApplications())
  }
})

// Sync job applications when back online
async function syncJobApplications() {
  try {
    // Get pending sync data from IndexedDB or localStorage
    const pendingData = await getPendingSyncData()
    
    for (const item of pendingData) {
      try {
        await fetch(item.url, {
          method: item.method,
          headers: item.headers,
          body: item.body
        })
        
        // Remove from pending sync after successful upload
        await removePendingSyncData(item.id)
      } catch (error) {
        console.log('Failed to sync item:', error)
      }
    }
  } catch (error) {
    console.log('Background sync failed:', error)
  }
}

// Helper functions for sync data management
async function getPendingSyncData() {
  // In a real implementation, this would use IndexedDB
  // For now, return empty array
  return []
}

async function removePendingSyncData(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('Removing sync data:', id)
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event)
  
  const options = {
    body: 'You have new updates in your job tracker',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'job-tracker-update'
  }
  
  event.waitUntil(
    self.registration.showNotification('Interview Accelerator', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event)
  
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})