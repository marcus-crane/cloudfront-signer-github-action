const AWS = require('aws-sdk');

const core = require('@actions/core')

try {
  const signer = new AWS.CloudFront.Signer(
    core.getInput('cfDistId'),
    core.getInput('privateKey').replace(/\\n/gm, '\n') // https://github.com/auth0/node-jsonwebtoken/issues/642#issuecomment-601720769
  )
  const signedUrl = signer.getSignedUrl({
    url: core.getInput('url'),
    expires: parseInt(core.getInput('expires'), 10)
  })
  console.log(`Successfully signed URL: ${signedUrl}`)
  core.setOutput("url", signedUrl)
} catch (error) {
  core.setFailed(error.message)
}
