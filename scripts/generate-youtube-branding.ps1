$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$outputDirectory = Join-Path (Get-Location) 'public/brand/youtube'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$navy = [System.Drawing.Color]::FromArgb(255, 23, 54, 93)
$deepNavy = [System.Drawing.Color]::FromArgb(255, 13, 31, 56)
$blue = [System.Drawing.Color]::FromArgb(255, 33, 79, 128)
$mint = [System.Drawing.Color]::FromArgb(255, 101, 214, 160)
$white = [System.Drawing.Color]::White

function New-BrandFont([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  [System.Drawing.Font]::new('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Draw-RoundedRect($graphics, [System.Drawing.RectangleF]$rectangle, [float]$radius, $brush) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc($rectangle.X, $rectangle.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($rectangle.Right - $diameter, $rectangle.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($rectangle.Right - $diameter, $rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($rectangle.X, $rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

function Set-BrandRendering($graphics) {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
}

$bannerPath = Join-Path $outputDirectory 'daftar-cpns-youtube-banner.png'
$banner = [System.Drawing.Bitmap]::new(2048, 1152, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$banner.SetResolution(96, 96)
$graphics = [System.Drawing.Graphics]::FromImage($banner)
Set-BrandRendering $graphics
$background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, 2048, 1152), $deepNavy, $blue, 20
)
$graphics.FillRectangle($background, 0, 0, 2048, 1152)
$background.Dispose()
$gridPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(18, 220, 240, 255), 1)
for ($x = 0; $x -le 2048; $x += 64) { $graphics.DrawLine($gridPen, $x, 0, $x, 1152) }
for ($y = 0; $y -le 1152; $y += 64) { $graphics.DrawLine($gridPen, 0, $y, 2048, $y) }
$gridPen.Dispose()
$orbBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(24, 101, 214, 160))
$graphics.FillEllipse($orbBrush, -210, 80, 620, 620)
$graphics.FillEllipse($orbBrush, 1640, 620, 560, 560)
$orbBrush.Dispose()
$accentPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(70, 101, 214, 160), 3)
$graphics.DrawArc($accentPen, 1600, 160, 420, 420, 205, 210)
$graphics.DrawArc($accentPen, 70, 700, 320, 320, 20, 190)
$accentPen.Dispose()

$logoBrush = [System.Drawing.SolidBrush]::new($navy)
Draw-RoundedRect $graphics ([System.Drawing.RectangleF]::new(550, 428, 190, 190)) 36 $logoBrush
$logoBrush.Dispose()
$logoPen = [System.Drawing.Pen]::new($mint, 7)
$graphics.DrawRectangle($logoPen, 550, 428, 190, 190)
$logoPen.Dispose()
$center = [System.Drawing.StringFormat]::new()
$center.Alignment = [System.Drawing.StringAlignment]::Center
$center.LineAlignment = [System.Drawing.StringAlignment]::Center
$whiteBrush = [System.Drawing.SolidBrush]::new($white)
$mintBrush = [System.Drawing.SolidBrush]::new($mint)
$mutedBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(235, 224, 237, 248))
$logoFont = New-BrandFont 72 ([System.Drawing.FontStyle]::Bold)
$graphics.DrawString('DC', $logoFont, $whiteBrush, [System.Drawing.RectangleF]::new(550, 430, 190, 180), $center)
$logoFont.Dispose()
$titleFont = New-BrandFont 86 ([System.Drawing.FontStyle]::Bold)
$subtitleFont = New-BrandFont 39 ([System.Drawing.FontStyle]::Bold)
$supportFont = New-BrandFont 27
$graphics.DrawString('DAFTAR CPNS', $titleFont, $whiteBrush, 795, 438)
$graphics.DrawString('Belajar TWK | TIU | TKP', $subtitleFont, $mintBrush, 800, 558)
$graphics.DrawString('Pembahasan soal dan simulasi CAT yang mudah diikuti', $supportFont, $mutedBrush, 802, 620)
$titleFont.Dispose()
$subtitleFont.Dispose()
$supportFont.Dispose()

$chipFont = New-BrandFont 24 ([System.Drawing.FontStyle]::Bold)
$chipBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(48, 255, 255, 255))
$chipPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(110, 255, 255, 255), 2)
$chipX = 800
foreach ($label in @('TWK', 'TIU', 'TKP')) {
  $chip = [System.Drawing.RectangleF]::new($chipX, 692, 116, 56)
  Draw-RoundedRect $graphics $chip 20 $chipBrush
  $graphics.DrawRectangle($chipPen, [int]$chip.X, [int]$chip.Y, [int]$chip.Width, [int]$chip.Height)
  $graphics.DrawString($label, $chipFont, $whiteBrush, [System.Drawing.RectangleF]::new($chipX, 694, 116, 52), $center)
  $chipX += 136
}
$chipFont.Dispose()
$chipBrush.Dispose()
$chipPen.Dispose()
$whiteBrush.Dispose()
$mintBrush.Dispose()
$mutedBrush.Dispose()
$center.Dispose()
$graphics.Dispose()
$banner.Save($bannerPath, [System.Drawing.Imaging.ImageFormat]::Png)
$banner.Dispose()

$profilePath = Join-Path $outputDirectory 'daftar-cpns-youtube-profile.png'
$profile = [System.Drawing.Bitmap]::new(800, 800, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$profile.SetResolution(96, 96)
$profileGraphics = [System.Drawing.Graphics]::FromImage($profile)
Set-BrandRendering $profileGraphics
$profileBackground = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
  [System.Drawing.Rectangle]::new(0, 0, 800, 800), $deepNavy, $navy, 35
)
$profileGraphics.FillRectangle($profileBackground, 0, 0, 800, 800)
$profileBackground.Dispose()
$profileRing = [System.Drawing.Pen]::new($mint, 18)
$profileGraphics.DrawEllipse($profileRing, 52, 52, 696, 696)
$profileRing.Dispose()
$profileFont = New-BrandFont 265 ([System.Drawing.FontStyle]::Bold)
$profileCenter = [System.Drawing.StringFormat]::new()
$profileCenter.Alignment = [System.Drawing.StringAlignment]::Center
$profileCenter.LineAlignment = [System.Drawing.StringAlignment]::Center
$profileWhite = [System.Drawing.SolidBrush]::new($white)
$profileGraphics.DrawString('DC', $profileFont, $profileWhite, [System.Drawing.RectangleF]::new(80, 90, 640, 610), $profileCenter)
$profileFont.Dispose()
$profileCenter.Dispose()
$profileWhite.Dispose()
$profileGraphics.Dispose()
$profile.Save($profilePath, [System.Drawing.Imaging.ImageFormat]::Png)
$profile.Dispose()

$watermarkPath = Join-Path $outputDirectory 'daftar-cpns-youtube-watermark.png'
$watermark = [System.Drawing.Bitmap]::new(150, 150, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$watermark.SetResolution(96, 96)
$watermarkGraphics = [System.Drawing.Graphics]::FromImage($watermark)
Set-BrandRendering $watermarkGraphics
$watermarkFill = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(220, 23, 54, 93))
$watermarkGraphics.FillEllipse($watermarkFill, 3, 3, 144, 144)
$watermarkFill.Dispose()
$watermarkRing = [System.Drawing.Pen]::new($mint, 6)
$watermarkGraphics.DrawEllipse($watermarkRing, 5, 5, 140, 140)
$watermarkRing.Dispose()
$watermarkFont = New-BrandFont 55 ([System.Drawing.FontStyle]::Bold)
$watermarkCenter = [System.Drawing.StringFormat]::new()
$watermarkCenter.Alignment = [System.Drawing.StringAlignment]::Center
$watermarkCenter.LineAlignment = [System.Drawing.StringAlignment]::Center
$watermarkWhite = [System.Drawing.SolidBrush]::new($white)
$watermarkGraphics.DrawString('DC', $watermarkFont, $watermarkWhite, [System.Drawing.RectangleF]::new(10, 12, 130, 126), $watermarkCenter)
$watermarkFont.Dispose()
$watermarkCenter.Dispose()
$watermarkWhite.Dispose()
$watermarkGraphics.Dispose()
$watermark.Save($watermarkPath, [System.Drawing.Imaging.ImageFormat]::Png)
$watermark.Dispose()

Get-ChildItem $outputDirectory -Filter '*.png' | ForEach-Object {
  $image = [System.Drawing.Image]::FromFile($_.FullName)
  [pscustomobject]@{ Name = $_.Name; Width = $image.Width; Height = $image.Height; SizeKB = [math]::Round($_.Length / 1KB, 1) }
  $image.Dispose()
} | Format-Table -AutoSize
