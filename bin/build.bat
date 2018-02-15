@echo off

setlocal

if exist build.bat goto ok

echo build.bat must be run from its folder
goto end

:ok
set TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%
set INDEX=..\src\index.html
set DIST=..\dist
set CSS=./static/style/style%TIMESTAMP%.css
set JS=./static/js/app%TIMESTAMP%.js

if exist %DIST% (
    rd /s /q %DIST%
)

md %DIST%\component
md %DIST%\static\image
md %DIST%\static\js
md %DIST%\static\style

for /f "tokens=*" %%a in (%INDEX%) do (
    echo "%%a" | findstr "<script" > nul && (
        echo "%%a" | findstr "./static/" > nul && (
            echo %%a>>%DIST%\index.html
        ) || (
            echo > nul
        )
    ) || (
        echo "%%a" | findstr "<link" > nul && (
            echo "%%a" | findstr "./static/" > nul && (
                echo %%a>>%DIST%\index.html
            ) || (
                echo > nul
            )
        ) || (
            if /i "%%a" == "</head>" (
                echo ^<link rel^=^"stylesheet^" type=^"text/css^" href^="%CSS%"^>>>%DIST%\index.html
                echo ^<script type^=^"text/javascript^" src^=^"%JS%^"^>^</script^>>>%DIST%\index.html
            )
            if not "%%a" == "" (
                echo %%a>>%DIST%\index.html
            )
        )
    )
)
echo finished

:end
echo > nul
