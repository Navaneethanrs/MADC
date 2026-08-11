Add-Type -AssemblyName PresentationCore
$heicSrc = Join-Path $PSScriptRoot '..\drive-download-20260810T133353Z-1-001\IMG_2439 - NAVIN M 24ITR084.HEIC'
$out = Join-Path $PSScriptRoot '..\public\team\24ITR084_full.jpg'
$uri = [Uri]::new($heicSrc)
$decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($uri, [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
Write-Output ("FrameCount=" + $decoder.Frames.Count)
$frame = $decoder.Frames[0]
Write-Output ("Size=" + $frame.PixelWidth.ToString() + " x " + $frame.PixelHeight.ToString())
$encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
$encoder.QualityLevel = 95
$encoder.Frames.Add($frame)
$stream = [IO.File]::Open($out, [IO.FileMode]::Create)
$encoder.Save($stream)
$stream.Close()
Write-Output ("Saved: " + $out)
