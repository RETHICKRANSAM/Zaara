import re
import urllib.request
from urllib.error import URLError, HTTPError
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('app.py', 'r') as f:
    content = f.read()

urls = re.findall(r"(?P<url>https?://[^\s'\"]+)", content)
urls = list(set(urls)) # unique

broken = []
for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        response = urllib.request.urlopen(req, context=ctx, timeout=5)
        if response.getcode() >= 400:
            broken.append((url, response.getcode()))
    except HTTPError as e:
        broken.append((url, e.code))
    except URLError as e:
        broken.append((url, str(e.reason)))
    except Exception as e:
        broken.append((url, str(e)))

print("Broken URLs found:")
for b in broken:
    print(f"URL: {b[0]} -> Error: {b[1]}")
if not broken:
    print("All URLs seem fine!")
