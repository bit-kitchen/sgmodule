// https://manual.nssurge.com/scripting/common.html
// https://manual.nssurge.com/scripting/http-request.html

// https://www.o365atp.com/
// https://github.com/newhouse/url-tracking-stripper/blob/master/assets/js/redirects.js

let param = 'url'
try {
  param = $argument
} catch (e) {
  // Ignore ReferenceError if argument not provided in sgmodule.
}

const url = new URL($request.url)
const paramUrl = url.searchParams.get(param)
if (paramUrl) {
  // Redirect to the target URL directly without going through ATP safelinks.
  const targetUrl = decodeURIComponent(paramUrl)
  $done({
    response: {
      status: 302,
      headers: {
        'Location': targetUrl,
      },
    },
  })
} else if (url.pathname.startsWith('/lnk/')) {
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
  // No url parameter found, keep the request untouched.
  $done({})
}
