"""One-time image preparation; generated WebP files are committed for the web build."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).resolve().parents[1]
assets = root / 'public/assets/drafts'
originals = root / 'design/source-assets/drafts'
originals.mkdir(parents=True, exist_ok=True)
sheet = Image.new('RGB', (1000, 620), '#fff4e2')
draw = ImageDraw.Draw(sheet)
for index, path in enumerate(sorted(assets.glob('*.png'))):
    image = Image.open(path).convert('RGBA')
    if 'background' not in path.name and 'panorama' not in path.name:
        bounds = image.getchannel('A').point(lambda value: 255 if value > 100 else 0).getbbox()
        if bounds:
            image = image.crop(bounds)
    image.thumbnail((960, 1920) if 'background' in path.name else (1600, 640) if 'panorama' in path.name else (500, 600))
    output = path.with_suffix('.webp')
    image.save(output, quality=91, method=6)
    thumb = ImageOps.contain(image, (230, 260))
    x, y = (index % 4) * 250, (index // 4) * 310
    sheet.paste(thumb, (x + (230 - thumb.width)//2, y+25), thumb)
    draw.text((x+5, y+290), path.stem, fill='#30251b')
    print(output.name, image.size, output.stat().st_size)
    destination = originals / path.name
    if not destination.exists():
        path.rename(destination)
(root / 'qa').mkdir(exist_ok=True)
sheet.save(root / 'qa/draft-assets.png')

references = root / 'design/drafts'
references.mkdir(parents=True, exist_ok=True)
generated = Path(r'C:\Users\GarvitKhandelwal\.codex\generated_images\01a19193-e0b5-7f51-bea1-957ba2a178b2')
for number, filename in enumerate([
    'exec-bfd1bbdb-f42f-4b03-8ecb-24b78c38785c.png',
    'exec-6737f586-cc75-4ac1-a950-21e209a74bd4.png',
    'exec-057d2d33-309f-4dbd-89fe-bf9b087a4846.png',
], 1):
    Image.open(generated/filename).save(references/f'option-{number}.png')
