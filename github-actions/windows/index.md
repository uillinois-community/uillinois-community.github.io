---
title: GitHub Actions for Windows
layout: layout.njk
---

## Some tips for Windows development and GitHub Actions

<ul>
<li>Be careful of calls that might end up needing user input!  For example, make sure to run installers in a quiet/no prompt mode. The runner will wait for user feedback that won't come.</li>
<li>I've had mixed luck with more windows-centric GitHub Actions. Feel free to explore the <a href="https://github.com/marketplace?category=&query=&type=actions&verification=">Marketplace</a>, but you may find it easier to just call out to shell or powershell.</li>
<li>By following some error messages, I figured out the "install path", at least at the moment, (see either the <a href="examples/create-release-zip.yml">create-release-zip</a> or <a href="examples/build-and-test.yml">build-and-test</a> examples for more info on where this goes in the workflow yaml file).

```yaml
  jobs:
    build:
      env:
        msbuild-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin
        vstest-path: C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\Common7\IDE\Extensions\TestPlatform
```
</li>
<li>It seems at some point the default shell for the "run" set command changed from cmd to powershell. If you're reading older examples, it may need a "shelL: cmd" added to the step if you're seeing syntax errors. For example:

```yaml
- name: Restore Nuget Packages
  run: "\"${{ env.msbuild-path }}\\MSBuild.exe\" -t:restore -p:RestorePackagesConfig=true -p:Configuration=Release ${{github.workspace }}\\exampleapp\\exampleapp.sln"
  shell: cmd
```

</li>
<li>A probably dangerous move, but if there's stuff you want to do to a github repository / team /etc based on triggers in github, you can install and use the <a href="https://github.com/microsoft/PowerShellForGitHub">PowerShellForGitHub Powershell</a> module and use a <a href="https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token">Personal Access Token</a> (and probably <a href="https://docs.github.com/en/github/authenticating-to-github/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on">SSO "signing" it</a>) and set it up as a <a href="https://docs.github.com/en/actions/reference/encrypted-secrets">GitHub Secret</a>. For more details, see the Powershll and Github section below</li>
</ul>

## PowerShellForGitHub

The PowerShellForGitHub pages are pretty brief, but you can get a lot of information by using the `Get-Help` cmdlet.  For example:

```powershell
Get-Help Set-GitHubAuthentication -ShowWindow </pre> or just examples like <pre> Get-Help Set-GitHubAuthentication -Examples
```
