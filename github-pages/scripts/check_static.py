from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT.parent / 'docs'
build = json.loads((OUTPUT / 'build-manifest.json').read_text())

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.references = []
        self.ids = set()
        self.scripts = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag in ('a', 'link') and attrs.get('href'):
            self.references.append(attrs['href'])
        if tag in ('img', 'script') and attrs.get('src'):
            self.references.append(attrs['src'])
        if tag == 'script':
            self.scripts.append(attrs)
        if tag == 'img':
            assert 'alt' in attrs, 'Image is missing alternative text'

cache = {}
for route in build['routes']:
    filename = OUTPUT / route['route'].lstrip('/') / 'index.html'
    text = filename.read_text()
    assert '<title>' in text and '<h1' in text, filename
    assert 'NbN_Bachelor_Project.pdf' not in text, 'Bachelor report link found'
    assert '__FLIGHT' not in text and '_vinext' not in text, 'Server runtime found'
    page = Page(text)
    assert len(page.scripts) == 1 and page.scripts[0].get('src') == build['assets']['script']
    cache[filename] = page

checked = 0
for filename, page in cache.items():
    for reference in page.references:
        url = urlsplit(reference)
        if url.scheme or url.netloc:
            if url.netloc == 'rotich4499.github.io':
                reference = url.path
            else:
                continue
        url = urlsplit(reference)
        target = OUTPUT / unquote(url.path).lstrip('/') if url.path else filename
        if target.is_dir():
            target = target / 'index.html'
        assert target.is_file(), f'Broken local link in {filename}: {reference}'
        if url.fragment:
            if target.suffix == '.html':
                destination = cache.get(target) or Page(target.read_text())
                assert unquote(url.fragment) in destination.ids, f'Broken section link: {reference}'
        checked += 1

manifest = json.loads((OUTPUT / 'learning/downloads/manifest.json').read_text())
for file in manifest['files']:
    content = (OUTPUT / 'learning/downloads/files' / file['path']).read_bytes()
    assert hashlib.sha256(content).hexdigest() == file['sha256'], file['path']
with zipfile.ZipFile(OUTPUT / 'learning/downloads/computational-materials-learning.zip') as archive:
    for file in manifest['files']:
        content = archive.read('computational-materials-learning/' + file['path'])
        assert hashlib.sha256(content).hexdigest() == file['sha256'], file['path']
assert (OUTPUT / '.nojekyll').is_file()
assert 'Page not found' in (OUTPUT / '404.html').read_text()
assert not (OUTPUT / 'research/Charles_Rotich_NbN_Bachelor_Project.pdf').exists()
assert not any('bachelor' in p.name.lower() and p.suffix == '.pdf' for p in OUTPUT.rglob('*'))
assert (OUTPUT / 'Charles_Rotich_Academic_CV.pdf').read_bytes() == (ROOT / 'src/public/Charles_Rotich_Academic_CV.pdf').read_bytes()
assert len(build['routes']) == 17
print(json.dumps({'staticPages': len(build['routes']), 'localLinksAndAssets': checked, 'verifiedDownloads': len(manifest['files']), 'zipVerified': True, 'bachelorReportExcluded': True}))
