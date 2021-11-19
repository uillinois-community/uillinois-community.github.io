---
title: GitHub Actions
layout: layout.njk
---

<p><a href="https://docs.github.com/en/actions">GitHub Actions</a> allow you to run a series of actions on your code based on various triggers. This includes actions such as compiling the code or running unit tests. The actions are performed by a "<a href="https://github.com/actions/runner">runner</a>" system. This system can either on be a virtual environment on the GitHub infrastructure or a <a href="https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners">locally hosted server</a>.</p>

## Using a self-hosted runner

The common reasons to run a self-hosted runner is that you might want to use GitHub Actions, but are on a network that is firewalled off, you have software that might be easier to configure ahead of time, or have security concerns about information being used by the GitHub infrastructure.

## Some tips

<ul>
    <li>Workflows (series of jobs and steps/actions) go in .github/workflows</li>
    <li>When developing GitHub Actions, you can make the logging and what's shown more verbose via by <a href="https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging">enabling different types of logging</a></li>
    <li>You can find a lot of useful GitHub Actions at the <a href="https://github.com/marketplace?category=&query=&type=actions&verification=">GitHub Marketplace</a></li>
    <li>Some actions, triggers, and steps will only affect the default branch, which can make testing a bit hard. You might want to fork a project while you're experimenting with workflows</li>
    <li>Certain steps may not be directly possible as actions, but you may be able to  use a workflow step to run a web tool like curl to call the <a href="https://docs.github.com/en/rest">GitHub API</a>. If doing this, use a GitHub secret to store the Personal Access Token being used.</li>
    <li>Adding the trigger "workflow_dispatch" allows you to run the job on demand from the web interface. Useful when testing.</li>
    <li>Using Windows?  There's more tips on the  <a href="windows/index.html">Windows-specific page</a>.</li>
</ul>

## Some simple examples

### Uses github provided windows runner to build a .Net web application and run test cases

<a href="windows/examples/build-and-test.yml">Original file</a>
<!-- TODO: Figure out some sort of way to better style yaml, or run yaml through some sort of html generation -->
<pre>
name: build-and-test

on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    env:
      msbuild-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin
      vstest-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\Extensions\TestPlatform

    runs-on: [windows-latest]
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Restore Nuget Packages
        run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" -t:restore -p:RestorePackagesConfig=true ${{github.workspace }}\\exampleapp\\exampleapp.sln"
        shell: cmd

      - name: Build website
        run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" ${{github.workspace }}\\exampleapp\\exampleapp.sln"
        shell: cmd

      - name: Test
        run: "\"${{ env.vstest-path }}\\vstest.console.exe\" /Platform:x64 ${{github.workspace }}\\exampleapp\\exampleappTests\\bin\\Debug\\exampleappTests.dll"
        shell: cmd
    </pre>


### Uses github provided windows runner to build a .Net application and calls PowerShell GitHub API library to upload a release zip of the binaries

<a href="windows/examples/create-release-zip.yml">Original file</a>

<pre>

name: create-release-zip

on:
  workflow_dispatch:
  release:
    types: [created]

jobs:
  build:
    env:
      msbuild-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin
      vstest-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\Extensions\TestPlatform


    runs-on: [windows-latest]
    steps:
      - name: Checkout
        uses: actions/checkout@v1

      - name: Restore Nuget Packages
        run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" -t:restore -p:RestorePackagesConfig=true -p:Configuration=Release ${{github.workspace }}\\exampleapp\\exampleapp.sln"
        shell: cmd

      - name: Build website
        run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" -p:Configuration=Release ${{github.workspace }}\\exampleapp\\exampleapp.sln"
        shell: cmd

      - name: Test
        run: "\"${{ env.vstest-path }}\\vstest.console.exe\" /Platform:x64 ${{github.workspace }}\\exampleapp\\exampleappTests\\bin\\Release\\exampleappTests.dll"
        shell: cmd

      - name: Build and deploy to directory
        shell: cmd
        run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" -p:Configuration=Release -p:PublishProfile=PubForZip -p:DeployOnBuild=true ${{github.workspace }}\\exampleapp\\exampleapp\\exampleapp.csproj"


      - name: Debug file path issue
        run: |
          $exampleapps_dlls = (Get-ChildItem -Path ${{ github.workspace }} -Recurse -force -ErrorAction SilentlyContinue -Include 'exampleapp.dll' )
          foreach( $dll in $exampleapp_dlls) { Write-Output ("::debug::DLL found at" + $dll.FullName) }
          $web_configs = (Get-ChildItem -Path ${{ github.workspace }} -Recurse -force -ErrorAction SilentlyContinue -Include 'web.config' )
          foreach( $config in $web_configs) { Write-Output ("::debug::Web config found at " + $config.FullName) }

      - name: Compress Release directory
        run: Compress-Archive -Path ${{github.workspace }}\exampleapp\exampleapp\bin\app.publish\* -DestinationPath ${{ runner.temp }}\exampleapp.zip

      - name: Install PowerShellForGitHub
        run: Install-Module -Name PowerShellForGitHub -Scope CurrentUser  -Repository PSGallery -Force

      - name: Add zip to release download
        run: |
          Set-GitHubConfiguration -SessionOnly -DefaultOwnerName UIUCLibrary
          Set-GitHubConfiguration -SessionOnly -DefaultRepositoryName winshib-exampleapp
          $secureString = ("${{ secrets.IMS_GITHUB_PAT }}" | ConvertTo-SecureString -AsPlainText -Force)
          $cred = New-Object System.Management.Automation.PSCredential "username is ignored", $secureString
          Set-GitHubAuthentication -Credential $cred -SessionOnly
          $secureString = $null # clear this out now that it's no longer needed
          $cred = $null # clear this out now that it's no longer needed
          $tag = "${{github.ref}}".Substring(10)
          Write-Output "::debug::$tag"
          $release_id = (Get-GitHubRelease -Tag $tag).ID
          New-GitHubReleaseAsset -Release $release_id -Path ${{ runner.temp }}\exampleapp.zip
</pre>
