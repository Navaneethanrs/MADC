Get-ChildItem -Path public\achievements, public\team -File | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    if ($sizeMB -gt 0.3) {
        Write-Output "$($_.Name) : $sizeMB MB"
    }
}
