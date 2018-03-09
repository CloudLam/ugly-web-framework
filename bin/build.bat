@echo off

if exist build.bat goto ok

echo build.bat must be run from its folder
goto end

:ok
set TIMESTAMP=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%
set INDEX=..\src\index.html
set COMPONENT=..\src\component
set STATIC=..\src\static
set DIST=..\dist
set CSS=static/style/style.%TIMESTAMP: =0%.min.css
set JS=static/js/app.%TIMESTAMP: =0%.min.js
set CSS_CMD=uglifycss
set JS_CMD=uglifyjs

if exist %DIST% (
    rd /s /q %DIST%
)

md %DIST%\static\js
md %DIST%\static\style

echo ^<^!DOCTYPE html^>>>%DIST%\index.html

setlocal enabledelayedexpansion

for /R %COMPONENT% %%c in (*.css) do (
    >>%CSS_CMD% set /p=%%c < nul
)
>>%CSS_CMD% set /p="--output %DIST%\%CSS%" < nul
for /f "tokens=*" %%c in (%CSS_CMD%) do (
    start %CSS_CMD% %%c
)

for /R %COMPONENT% %%j in (*.js) do (
    >>%JS_CMD% set /p=%%j < nul
)
>>%JS_CMD% set /p="-c -m -o %DIST%\%JS%" < nul
for /f "tokens=*" %%c in (%JS_CMD%) do (
    start %JS_CMD% %%c
)

for /R %COMPONENT% %%h in (*.html) do (
    set source=%%h
    echo f | xcopy /e /i /y !source! !source:src=dist!
)

for /R %STATIC% %%h in (*.*) do (
    set source=%%h
    echo f | xcopy /e /i /y !source! !source:src=dist!
)

for /f "tokens=*" %%l in (%INDEX%) do (
    set line=%%l
    if not "!line:~0,3!" == "<!--" (
        if "!line:~0,7!" == "<script" (
            echo "!line!" | findstr "https://" > nul && (
                echo %%l>>%DIST%\index.html
            ) || (
                echo > nul
            )
            echo "!line!" | findstr "./static" > nul && (
                echo %%l>>%DIST%\index.html
            ) || (
                echo > nul
            )
        ) else (
            if "!line:~0,5!" == "<link" (
                echo "!line!" | findstr "https://" > nul && (
                    echo %%l>>%DIST%\index.html
                ) || (
                    echo > nul
                )
                echo "!line!" | findstr "./static" > nul && (
                    echo %%l>>%DIST%\index.html
                ) || (
                    echo > nul
                )
                echo "!line!" | findstr "image/x-icon" > nul && (
                    echo %%l>>%DIST%\index.html
                ) || (
                    echo > nul
                )
            ) else (
                if "!line:~0,7!" == "</head>" (
                    echo ^<link rel^=^"stylesheet^" type=^"text/css^" href^=^"^.^/%CSS%^"^>>>%DIST%\index.html
                    echo ^<script type^=^"text/javascript^" src^=^"^.^/%JS%^"^>^</script^>>>%DIST%\index.html
                )
                if not "!line:~0,8!" == "<DOCTYPE" (
                    echo %%l>>%DIST%\index.html
                )
            )
        )
    )
)

if exist %CSS_CMD% (
    del %CSS_CMD%
)

if exist %JS_CMD% (
    del %JS_CMD%
)

echo finished

:end
echo > nul
