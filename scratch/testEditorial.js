async function testEditorial() {
  try {
    const res = await fetch('https://codeforces.com/contest/1900', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    const html = await res.text();
    console.log('HTML length:', html.length);
    const matIdx = html.indexOf('Contest materials');
    console.log('Contest materials index:', matIdx);
    if (matIdx !== -1) {
      const snippet = html.substring(matIdx, matIdx + 800);
      console.log('Snippet:\n', snippet);
    } else {
      console.log('Title:', html.substring(0, 500));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testEditorial();
