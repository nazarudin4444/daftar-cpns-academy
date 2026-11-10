$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$out = Join-Path (Get-Location) 'public/brand/youtube'
New-Item -ItemType Directory -Path $out -Force | Out-Null
$navy = [Drawing.Color]::FromArgb(255, 23, 54, 93)
$deep = [Drawing.Color]::FromArgb(255, 13, 31, 56)
$blue = [Drawing.Color]::FromArgb(255, 33, 79, 128)
$mint = [Drawing.Color]::FromArgb(255, 101, 214, 160)
$white = [Drawing.Color]::White

function Font([float]$size, [Drawing.FontStyle]$style = [Drawing.FontStyle]::Regular) {
  [Drawing.Font]::new('Segoe UI', $size, $style, [Drawing.GraphicsUnit]::Pixel)
}

function Rounded($g, [Drawing.RectangleF]$r, [float]$radius, $brush) {
  $path = [Drawing.Drawing2D.GraphicsPath]::new()
  $d = $radius * 2
  $path.AddArc($r.X, $r.Y, $d, $d, 180, 90)
  $path.AddArc($r.Right - $d, $r.Y, $d, $d, 270, 90)
  $path.AddArc($r.Right - $d, $r.Bottom - $d, $d, $d, 0, 90)
  $path.AddArc($r.X, $r.Bottom - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $g.FillPath($brush, $path)
  $path.Dispose()
}

function RenderSettings($g) {
  $g.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [Drawing.Text.TextRenderingHint]::AntiAliasGridFit
}

$banner = [Drawing.Bitmap]::new(2048, 1152, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
$banner.SetResolution(96, 96)
$g = [Drawing.Graphics]::FromImage($banner)
RenderSettings $g
$gradient = [Drawing.Drawing2D.LinearGradientBrush]::new([Drawing.Rectangle]::new(0, 0, 2048, 1152), $deep, $blue, 20)
$g.FillRectangle($gradient, 0, 0, 2048, 1152)
$gradient.Dispose()
$grid = [Drawing.Pen]::new([Drawing.Color]::FromArgb(18, 220, 240, 255), 1)
for ($x = 0; $x -le 2048; $x += 64) { $g.DrawLine($grid, $x, 0, $x, 1152) }
for ($y = 0; $y -le 1152; $y += 64) { $g.DrawLine($grid, 0, $y, 2048, $y) }
$grid.Dispose()
$orb = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(24, 101, 214, 160))
$g.FillEllipse($orb, -210, 80, 620, 620)
$g.FillEllipse($orb, 1640, 620, 560, 560)
$orb.Dispose()
$arc = [Drawing.Pen]::new([Drawing.Color]::FromArgb(70, 101, 214, 160), 3)
$g.DrawArc($arc, 1600, 160, 420, 420, 205, 210)
$g.DrawArc($arc, 70, 700, 320, 320, 20, 190)
$arc.Dispose()
$logoBrush = [Drawing.SolidBrush]::new($navy)
Rounded $g ([Drawing.RectangleF]::new(550, 428, 190, 190)) 36 $logoBrush
$logoBrush.Dispose()
$logoPen = [Drawing.Pen]::new($mint, 7)
$g.DrawRectangle($logoPen, 550, 428, 190, 190)
$logoPen.Dispose()
$center = [Drawing.StringFormat]::new()
$center.Alignment = [Drawing.StringAlignment]::Center
$center.LineAlignment = [Drawing.StringAlignment]::Center
$w = [Drawing.SolidBrush]::new($white)
$m = [Drawing.SolidBrush]::new($mint)
$muted = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(235, 224, 237, 248))
$f = Font 72 ([Drawing.FontStyle]::Bold)
$g.DrawString('DC', $f, $w, [Drawing.RectangleF]::new(550, 430, 190, 180), $center)
$f.Dispose()
$f = Font 86 ([Drawing.FontStyle]::Bold)
$g.DrawString('DAFTAR CPNS', $f, $w, 795, 438)
$f.Dispose()
$f = Font 39 ([Drawing.FontStyle]::Bold)
$g.DrawString('Belajar TWK | TIU | TKP', $f, $m, 800, 558)
$f.Dispose()
$f = Font 27
$g.DrawString('Pembahasan soal dan simulasi CAT yang mudah diikuti', $f, $muted, 802, 620)
$f.Dispose()
$f = Font 24 ([Drawing.FontStyle]::Bold)
$chip = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(48, 255, 255, 255))
$chipPen = [Drawing.Pen]::new([Drawing.Color]::FromArgb(110, 255, 255, 255), 2)
$chipX = 800
foreach ($label in @('TWK', 'TIU', 'TKP')) {
  $r = [Drawing.RectangleF]::new($chipX, 692, 116, 56)
  Rounded $g $r 20 $chip
  $g.DrawRectangle($chipPen, [int]$r.X, [int]$r.Y, [int]$r.Width, [int]$r.Height)
  $g.DrawString($label, $f, $w, [Drawing.RectangleF]::new($chipX, 694, 116, 52), $center)
  $chipX += 136
}
$f.Dispose(); $chip.Dispose(); $chipPen.Dispose(); $w.Dispose(); $m.Dispose(); $muted.Dispose(); $center.Dispose(); $g.Dispose()
$banner.Save((Join-Path $out 'daftar-cpns-youtube-banner.png'), [Drawing.Imaging.ImageFormat]::Png)
$banner.Dispose()

$profile = [Drawing.Bitmap]::new(800, 800, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
$profile.SetResolution(96, 96)
$pg = [Drawing.Graphics]::FromImage($profile)
RenderSettings $pg
$gradient = [Drawing.Drawing2D.LinearGradientBrush]::new([Drawing.Rectangle]::new(0, 0, 800, 800), $deep, $navy, 35)
$pg.FillRectangle($gradient, 0, 0, 800, 800)
$gradient.Dispose()
$ring = [Drawing.Pen]::new($mint, 18)
$pg.DrawEllipse($ring, 52, 52, 696, 696)
$ring.Dispose()
$center = [Drawing.StringFormat]::new(); $center.Alignment = [Drawing.StringAlignment]::Center; $center.LineAlignment = [Drawing.StringAlignment]::Center
$w = [Drawing.SolidBrush]::new($white); $f = Font 265 ([Drawing.FontStyle]::Bold)
$pg.DrawString('DC', $f, $w, [Drawing.RectangleF]::new(80, 90, 640, 610), $center)
$f.Dispose(); $w.Dispose(); $center.Dispose(); $pg.Dispose()
$profile.Save((Join-Path $out 'daftar-cpns-youtube-profile.png'), [Drawing.Imaging.ImageFormat]::Png)
$profile.Dispose()

$watermark = [Drawing.Bitmap]::new(150, 150, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
$watermark.SetResolution(96, 96)
$wg = [Drawing.Graphics]::FromImage($watermark)
RenderSettings $wg
$fill = [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(220, 23, 54, 93))
$wg.FillEllipse($fill, 3, 3, 144, 144)
$fill.Dispose()
$ring = [Drawing.Pen]::new($mint, 6); $wg.DrawEllipse($ring, 5, 5, 140, 140); $ring.Dispose()
$center = [Drawing.StringFormat]::new(); $center.Alignment = [Drawing.StringAlignment]::Center; $center.LineAlignment = [Drawing.StringAlignment]::Center
$w = [Drawing.SolidBrush]::new($white); $f = Font 55 ([Drawing.FontStyle]::Bold)
$wg.DrawString('DC', $f, $w, [Drawing.RectangleF]::new(10, 12, 130, 126), $center)
$f.Dispose(); $w.Dispose(); $center.Dispose(); $wg.Dispose()
$watermark.Save((Join-Path $out 'daftar-cpns-youtube-watermark.png'), [Drawing.Imaging.ImageFormat]::Png)
$watermark.Dispose()
