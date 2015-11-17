// Using the Jenkins Groovy Post build plugin to execute the following after every build
// https://wiki.jenkins-ci.org/display/JENKINS/Groovy+Postbuild+Plugin


// It would be nice not to have to specify these here... the repo name should be available within the hudson
// api somehow, but I didn't know how to get it. The access token should maybe be saved in a config file, and
// read in at runtime?
GITHUB_REPO_NAME = 'sapbuild/angular-sap-common-directives'
GITHUB_ACCESS_TOKEN = 'my_github_api_v3_access_token'
manager.listener.logger.println 'test 1'
env = manager.build.getEnvironment(manager.listener)
if(manager.build.result == hudson.model.Result.SUCCESS) {
    COMMENT = "This commit <a href=${env.BUILD_URL}>passes</a>"
} else {
   COMMENT = "This commit <a href=${env.BUILD_URL}>fails</a>"
}
manager.listener.logger.println 'test 2'
pb = new ProcessBuilder('python', '${WORKSPACE}/angular-sap-common-directives/github_comment_on_commit.py')
manager.listener.logger.println 'test 3'
pb.environment().put('GITHUB_ACCESS_TOKEN', GITHUB_ACCESS_TOKEN)
pb.environment().put('GITHUB_REPO_NAME', GITHUB_REPO_NAME)
pb.environment().put('GIT_COMMIT', env.GIT_COMMIT)
pb.environment().put('COMMENT', COMMENT)
manager.listener.logger.println 'test 4'
p = pb.start()
p.waitFor()
manager.listener.logger.println p.text