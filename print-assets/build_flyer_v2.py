from pathlib import Path
import sys, json
BASE=Path(__file__).resolve().parent
sys.path.insert(0,str(BASE/'tmp/pdfs/packages'))
from fontTools.ttLib import TTFont as FT
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.units import mm
from pypdf import PdfReader,PdfWriter
from pypdf.generic import RectangleObject
from PIL import Image
import qrcode, pypdfium2, zxingcpp

OUT=BASE/'output/pdf'; OUT.mkdir(parents=True,exist_ok=True)
TMP=BASE/'tmp/pdfs'; TMP.mkdir(parents=True,exist_ok=True)
PUB=BASE.parent
for name,src in [('Sans','Switzer-Regular'),('Bold','Switzer-Bold')]:
    font=FT(PUB/f'fonts/switzer/{src}.woff2'); font.flavor=None
    for rec in font['name'].names:
        if rec.nameID in [1,3,4,6]:
            rec.string=('Firmenflow'+name).encode(rec.getEncoding())
    font.save(TMP/f'{name}.ttf'); pdfmetrics.registerFont(TTFont(name,str(TMP/f'{name}.ttf')))
pdfmetrics.registerFont(TTFont('Italic','C:/Windows/Fonts/georgiaz.ttf'))
PAPER='#fcfaf7'; PURPLE='#653683'; INK='#17131a'; CORAL='#ff705d'; MUTED='#5b5560'; LINE='#e7e2dc'
W,H=108*mm,151*mm
c=canvas.Canvas(str(TMP/'raw.pdf'),pagesize=(W,H),pageCompression=1)
c.setTitle('Firmenflow | DIN A6 Flyer | Vorder- und Rückseite')
c.setAuthor('Firmenflow - Manuel Landeck')
checks=[]
def rect(x,y,w,h,color,r=0):
    c.setFillColor(HexColor(color))
    if r:c.roundRect(x*mm,H-(y+h)*mm,w*mm,h*mm,r*mm,fill=1,stroke=0)
    else:c.rect(x*mm,H-(y+h)*mm,w*mm,h*mm,fill=1,stroke=0)
def txt(x,y,s,size=9,font='Sans',color=INK):
    c.setFillColor(HexColor(color)); c.setFont(font,size); c.drawString(x*mm,H-y*mm,s)
    width=pdfmetrics.stringWidth(s,font,size)/mm
    assert x>=3 and x+width<=105,(s,x+width)
    assert y<=148 and y-size/mm>=3,(s,y)
    checks.append({'text':s,'x':x,'baseline':y,'right':x+width})
def lines(x,y,ss,size=9,leading=4.4,font='Sans',color=INK):
    for i,s in enumerate(ss):txt(x,y+i*leading,s,size,font,color)
def img(path,x,y,w,h):
    c.drawImage(str(path),x*mm,H-(y+h)*mm,w*mm,h*mm,mask='auto')
def flow():
    c.setStrokeColor(HexColor(CORAL)); c.setLineWidth(1.1*mm)
    p=c.beginPath(); p.moveTo(87*mm,H+4*mm);p.curveTo(113*mm,H-15*mm,73*mm,H-22*mm,99*mm,H-32*mm);p.curveTo(110*mm,H-36*mm,122*mm,H-18*mm,115*mm,H-5*mm);c.drawPath(p)
def logo(x,y,w):
    path=PUB/'brand/firmenflow-wordmark-standalone.png'
    im=Image.open(path); img(path,x,y,w,w*im.height/im.width)
def photo(x,y,w,h):
    path=Path('D:/KI Projekte/01_Marke_und_Websites/CI - Logos - Markenkit/Shared_Assets/Founder_Photos/manuel-portrait.jpg')
    im=Image.open(path); iw,ih=im.size
    # Clip original photograph in a portrait frame without retouching.
    c.saveState();p=c.beginPath();p.roundRect(x*mm,H-(y+h)*mm,w*mm,h*mm,3*mm);c.clipPath(p,stroke=0,fill=0)
    dw=w;dh=w*ih/iw
    img(path,x,y-10,dw,dh)
    c.restoreState()
def qr(x,y,size):
    q=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,border=0)
    q.add_data('https://firmenflow.de');q.make(fit=True);m=q.get_matrix();n=len(m);u=size/(n+8)
    rect(x,y,size,size,PAPER,3)
    def finder(r,col):return (r<7 and col<7) or (r<7 and col>=n-7) or (r>=n-7 and col<7)
    c.setFillColor(HexColor(PURPLE))
    for r,row in enumerate(m):
        for col,on in enumerate(row):
            if on and not finder(r,col):c.circle((x+(col+4.5)*u)*mm,H-(y+(r+4.5)*u)*mm,u*.48*mm,fill=1,stroke=0)
    for r,col in [(0,0),(0,n-7),(n-7,0)]:
        for k,clr in [(0,PURPLE),(1,PAPER),(2,PURPLE)]:
            rect(x+(col+4+k)*u,y+(r+4+k)*u,(7-2*k)*u,(7-2*k)*u,clr,1.35*u if k<2 else .8*u)
    c.linkURL('https://firmenflow.de',(x*mm,H-(y+size)*mm,(x+size)*mm,H-y*mm),relative=0)

# FRONT: one memorable headline and the real person behind the service.
rect(0,0,108,151,PAPER);flow();logo(9,9,52)
txt(9,25,'FÜR DEINE LOKALPRÄSENZ.',7.4,'Bold',PURPLE)
txt(9,41,'Dein Betrieb',26,'Bold')
txt(9,51.5,'ist stark.',26,'Bold')
txt(9,65,'Sieht man das',20,'Bold',PURPLE)
txt(9,75,'auch online?',24,'Italic',PURPLE)
rect(9,81,18,1.2,CORAL)
lines(9,89,['Websites, Google-Präsenz und Bilder,','die zeigen, was deinen Betrieb ausmacht.'],9.3,4.5)
photo(64,99,35,42)
txt(9,107,'Gute Arbeit verdient',11,'Bold')
txt(9,112,'einen guten Auftritt.',11,'Bold')
lines(9,121,['Ich helfe dir dabei.','Persönlich. Verständlich.','Direkt mit mir.'],9.2,4.6)
txt(9,139,'Manu',16,'Italic',PURPLE)
rect(0,144,108,7,INK)
txt(9,148,'WESEL · NIEDERRHEIN · NRW',7.3,'Bold',PAPER)
c.showPage()

# BACK: three benefits, one primary next step and visible contact alternatives.
rect(0,0,108,151,PAPER)
txt(9,13,'MEHR LOKALPRÄSENZ. WENIGER THEATER.',7.1,'Bold',PURPLE)
txt(9,26,'Damit aus Suchen',21,'Bold')
txt(9,35.5,'Anfragen werden.',21,'Bold',PURPLE)
services=[
    ('01','Website & Relaunch',['Ein Auftritt, der zu dir passt. Auf dem Handy','einfach bedienbar, mit klaren Kontaktwegen.']),
    ('02','Google Business 360°',['Ein gepflegtes Unternehmensprofil, damit','Kunden vor Ort deinen Betrieb finden.']),
    ('03','Foto & Video vor Ort',['Dein Team, deine Räume, deine Arbeit.','Echte Einblicke, die Vertrauen schaffen.'])]
for i,(num,title,body) in enumerate(services):
    y=44+i*18
    rect(9,y,7,7,CORAL if i==0 else '#eee6f2',1.8)
    txt(10.3,y+4.8,num,8,'Bold',INK if i==0 else PURPLE)
    txt(19,y+4.5,title,11.5,'Bold')
    lines(19,y+10,body,8.4,4)
    if i<2:rect(19,y+15.5,80,.22,LINE)
rect(0,99,108,52,PURPLE)
txt(9,109,'Lass uns deinen',16,'Bold',PAPER)
txt(9,116,'Auftritt anpacken.',16,'Bold',PAPER)
lines(9,123,['Scannen & kennenlernen.','Oder schreib mir direkt.'],8.6,4.2,color=PAPER)
qr(72,105,29)
txt(75,138,'firmenflow.de',8,'Bold',PAPER)
txt(9,135,'0155 67277155',12,'Bold',PAPER)
txt(9,140,'Telefon & WhatsApp',7.4,'Sans',PAPER)
txt(9,146,'manu@firmenflow.de',9.5,'Bold',PAPER)
c.showPage();c.save()
reader=PdfReader(TMP/'raw.pdf');writer=PdfWriter()
for p in reader.pages:
    p.trimbox=RectangleObject([1.5*mm,1.5*mm,106.5*mm,149.5*mm])
    p.bleedbox=RectangleObject([0,0,W,H]);writer.add_page(p)
writer.add_metadata({'/Title':'Firmenflow - DIN A6 Flyer - 108 x 151 mm mit Beschnitt','/Author':'Firmenflow'})
dest=OUT/'Firmenflow-Flyer-A6-Vistaprint.pdf'
with open(dest,'wb') as f:writer.write(f)
doc=pypdfium2.PdfDocument(dest)
previews=[];decoded=[]
for i in range(len(doc)):
    bitmap=doc[i].render(scale=300/72).to_pil();bitmap.save(OUT/f'Firmenflow-Flyer-Seite-{i+1}.png')
    decoded.extend([r.text for r in zxingcpp.read_barcodes(bitmap)])
    # Show the actual trimmed print, without guide lines.
    b=round(1.5*300/25.4); preview=bitmap.crop((b,b,bitmap.width-b,bitmap.height-b));preview.thumbnail((630,900));previews.append(preview)
assert 'https://firmenflow.de' in decoded,decoded
spread=Image.new('RGB',(previews[0].width*2+66,max(p.height for p in previews)+44),'#e8e2dc')
for i,p in enumerate(previews):spread.paste(p,(22+i*(p.width+22),22))
spread.save(OUT/'Firmenflow-Flyer-Vorschau.png')
report={'pages':len(doc),'media_mm':[108,151],'trim_mm':[105,148],'safe_mm':[102,145],'bleed_each_edge_mm':1.5,'text_bounds_checked':len(checks),'qr_decoded':decoded,'color_space':'RGB, no printer-specific CMYK profile supplied','photo_effective_dpi':round(682/(35/25.4))}
(OUT/'Pruefbericht.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False))
