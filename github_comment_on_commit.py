# /var/lib/jenkins/github_comment_on_commit.py

import sys, os
sys.stderr = sys.stdout # helpful for debugging groovy calling, so we dont have to check stderr

# using https://github.com/jacquev6/PyGithub, (pip install PyGithub)
from github import Github
access_token = os.environ['GITHUB_ACCESS_TOKEN']
repo_name = os.environ['GITHUB_REPO_NAME']
commit = os.environ['GIT_COMMIT']
comment = os.environ['COMMENT']                                                 

github_user, repo_short_name = repo_name.split('/')

g = Github(access_token)
user = g.get_user(github_user)
repo = user.get_repo(repo_short_name)
commit = repo.get_commit(commit)
commit.create_comment(comment)

print 'python github comment script finished successfully'