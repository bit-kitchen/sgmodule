#!/usr/bin/env node

// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

const url = new URL($request.url)
const searchParams = url.searchParams

const tbm = searchParams.get('tbm')
// q: query
const q = searchParams.get('q')
// udm: images/videos/news/books/etc.
const udm = searchParams.get('udm')

console.log(`tbm: ${tbm}, q: ${q}, udm: ${udm}`)

if (tbm === 'map') {
  // tbm=map
  $done({})
} else {
  // Remove all search params except q & udm
  url.search = ''
  url.searchParams.set('q', q)
  if (udm) {
    url.searchParams.set('udm', udm)
  }

  if (url.href === $request.url) {
    // No changes, keep the request untouched
    $done({})
  } else {
    // Redirect to the simplified URL
    $done({
      response: {
        status: 302,
        headers: {
          'Location': url.href,
        },
      },
    })
  }
}
