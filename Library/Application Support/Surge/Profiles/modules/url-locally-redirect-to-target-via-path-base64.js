#!/usr/bin/env node

// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// Allow debugging using Node.js
try {
  $request
} catch (e) {
  $request = {
    url: process.argv[2] || 'http://y84x.mjt.lu/lnk/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-XX/X/XXXXXXXXXXXXXXXXXXXXXX/aHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vZW4tdXMvYXBwY2VudGVyL2Rhc2hib2FyZC9lbWFpbC1ub3RpZmljYXRpb25zLyNlbWFpbC1ub3RpZmljYXRpb24tcHJlZmVyZW5jZXM#email-notification-preferences',
  }
  $done = console.error
}

const url = new URL($request.url)
if (url.pathname.startsWith('/lnk/')) {
  const segments = url.pathname.split('/')
  const targetUrl = atob(segments[segments.length - 1])
  $done({
    response: {
      status: 302,
      headers: {
        'Location': targetUrl,
      },
    },
  })
} else {
  // URL not in the expected format, keep the request untouched.
  $done({})
}
