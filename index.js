const AWS = require('aws-sdk');

const core = require('@actions/core')

try {
  const signer = new AWS.CloudFront.Signer(
    core.getInput('cfDistId'),
    core.getInput('privateKey')
  )
  const signedUrl = signer.getSignedUrl({
    url: core.getInput('url'),
    expires: core.getInput('expires')
  })
  console.log(`Successfully signed URL: ${signedUrl}`)
  core.setOutput("url", signedUrl)
} catch (error) {
  core.setFailed(error.message)
}
