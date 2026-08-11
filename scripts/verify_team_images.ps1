$dataFile = Join-Path $PSScriptRoot '..\src\data\teamData.js'
$teamDir = Join-Path $PSScriptRoot '..\public\team'
$missing = @()
$pattern = "image:\s*'/team/([^']+)'"
Get-Content $dataFile | ForEach-Object {
    if ($_ -match $pattern) {
        $filename = $matches[1]
        $path = Join-Path $teamDir $filename
        if (-not (Test-Path $path)) {
            $missing += $filename
        }
    }
}
if ($missing.Count -eq 0) {
    Write-Output "All team image files are present."
} else {
    Write-Output "Missing files:"
    $missing | ForEach-Object { Write-Output " - $_" }
}

# Convert the HEIC file if needed
$heicSrc = Join-Path $PSScriptRoot '..\drive-download-20260810T133353Z-1-001\IMG_1290 - NAVIN K 24ITR083.HEIC'
$heicDst = Join-Path $teamDir '24ITR083.jpg'
if (-not (Test-Path $heicDst) -and (Test-Path $heicSrc)) {
    try {
        Add-Type -AssemblyName PresentationCore
        $uri = [Uri]::new($heicSrc)
        $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($uri, [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
        $frame = $decoder.Frames[0]
        $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
        $encoder.Frames.Add($frame)
        $stream = [IO.File]::Open($heicDst, [IO.FileMode]::Create)
        $encoder.Save($stream)
        $stream.Close()
        Write-Output "Converted HEIC to JPG: 24ITR083.jpg"
    } catch {
        Write-Output "HEIC conversion failed: $_"
    }
} elseif (Test-Path $heicDst) {
    Write-Output "HEIC JPG already exists: 24ITR083.jpg"
} else {
    Write-Output "HEIC source file not found."
}
