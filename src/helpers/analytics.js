export function sendAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = 'https://example.com/analytics';
  // a url that holds or saves analytics 

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}
