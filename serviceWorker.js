const moisy = "moisy-v1"


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(moisy).then(cache => {
      
    })
  )
})