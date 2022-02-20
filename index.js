const AWS = require('aws-sdk');

const core = require('@actions/core')
const github = require('@actions/github')

try {
  const signer = new AWS.CloudFront.Signer(
    core.getInput('cfDistId'),
    core.getInput('privateKey')
  )
  const signedUrl = signer.getSignedURL({
    url: core.getInput('url'),
    expires: core.getInput('expires')
  })
  console.log(`Successfully signed URL: ${signedUrl}`)
  core.setOutput("url", signedUrl)
} catch (error) {
  core.setFailed(error.message)
}
