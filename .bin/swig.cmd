@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\swig\bin\swig.js" %*
) ELSE (
  node  "%~dp0\..\swig\bin\swig.js" %*
)