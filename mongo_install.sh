# 安装mongodb环境：
echo "mongodb install"

cd /etc/yum.repos.d/
echo "[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc" > mongodb-org-6.0.repo
yum repolist
yum install mongodb-org -y