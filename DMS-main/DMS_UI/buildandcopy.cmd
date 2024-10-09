@REM npm run build
echo build done
xcopy .\build\index.html ..\DMS_API\DemandMgmt.Presentation\Views\Home\index.cshtml /Y

robocopy .\build\ ..\DMS_API\DemandMgmt.Presentation\wwwroot\ /E
echo copy done